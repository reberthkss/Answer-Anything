import {Change, EventContext} from "firebase-functions";

const functions = require('firebase-functions');

import firebase from "firebase";
import QueryDocumentSnapshot = firebase.firestore.QueryDocumentSnapshot;
import {Research} from "./Data/ResearchData";
import {ResearchQuestionData} from "./Data/ResearchQuestionData";
import {AnswerData} from "./Data/AnswerData";

const admin = require("firebase-admin");
admin.initializeApp();

interface QuestionAnswered {
    'questionId': number,
    'option': { [key: string]: number }[],
    'prevSelectedOption': number | null,
    'timestamp': {seconds: number, nanoseconds: number}
}

exports.researchOnWrite = functions
    .firestore
    .document("researchs/{research}/answeredQuestions/{answeredQuestion}")
    .onUpdate(async (snap: Change<QueryDocumentSnapshot>, context: EventContext) => {
        const identifiers = {
            research: context.params.research,
            answeredQuestion: context.params.answeredQuestion
        }
        const afterAnswerData = AnswerData.from(snap.after.id, snap.after.data());
        const beforeAnswerData = AnswerData.from(snap.before.id, snap.before.data());
        if (afterAnswerData.status == "done" || beforeAnswerData.status == "done") {
            return snap.after.data();
        }
        const research = Research.from((await admin
            .firestore()
            .doc(`researchs/${identifiers.research}`)
            .get()).data());
        const answer = (await admin
            .firestore()
            .collection("answers")
            .where("researchId", "==", identifiers.research)
            .get()).docs[0];
        if (answer == null) {
            const questionsData = Array.from({length: research.questions.length})
                .map((_, index) => {
                    const question = research.questions.find((question: ResearchQuestionData) => question.id == index.toString());
                    if (question == null) return null;
                    const optionsArray = Array.from(question.options!!.entries());
                    const data = {
                        'questionId': index,
                        'option': Array.from({length: optionsArray.length}).map((_, index) => {
                            if (afterAnswerData.answeredQuestions.find((answeredQuestion) => answeredQuestion.selectedOption == index)) {
                                return {
                                    [index.toString()]: 1
                                }
                            } else {
                                return {
                                    [index.toString()]: 0
                                }
                            }
                        })
                    };
                    return data;
                })
                .filter((question) => question != null);
            await admin
                .firestore()
                .collection("answers")
                .add({
                    'researchId': identifiers.research,
                    'questions': questionsData,
                    'timestamp': admin.firestore.FieldValue.serverTimestamp()
                });
        } else {
            afterAnswerData.answeredQuestions.map((question, index) => {
                const indexOfQuestionAnswered = (answer.data()["questions"] as any[]).findIndex((questionAnswered: QuestionAnswered) => questionAnswered.questionId == question.question);
                const questionAnswered: QuestionAnswered = answer.data()["questions"][indexOfQuestionAnswered];
                if (indexOfQuestionAnswered != -1) {
                    const prevSelectedOption = afterAnswerData.answeredQuestions.find((answeredQuestion) => answeredQuestion.question == questionAnswered.questionId)?.prevSelectedOption;
                    const newArrayOfQuestionsAnswered = answer
                        .data()["questions"]
                        .filter((question: QuestionAnswered) => question.questionId != questionAnswered.questionId);
                    if (prevSelectedOption != null && prevSelectedOption != question.selectedOption) {
                        questionAnswered.option[prevSelectedOption][prevSelectedOption]--;
                    }
                    questionAnswered.option[question.selectedOption][question.selectedOption]++;
                    answer.ref.update({
                        "questions": [
                            ...newArrayOfQuestionsAnswered,
                            questionAnswered
                        ]
                    });
                }
            })
        }

        return snap.after.data();
    });
