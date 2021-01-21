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
}

exports.researchOnWrite = functions
    .firestore
    .document("researchs/{research}/answeredQuestions/{answeredQuestion}")
    .onUpdate(async (snap: Change<QueryDocumentSnapshot>, context: EventContext) => {
        const identifiers = {
            research: context.params.research,
            answeredQuestion: context.params.answeredQuestion
        }
        console.log("snap => ", snap.after.data());
        const afterAnswerData = AnswerData.from(snap.after.id, snap.after.data());
        const beforeAnswerData = AnswerData.from(snap.before.id, snap.before.data());
        if (afterAnswerData.status == "done" || beforeAnswerData.status == "done") {
            return snap.after.data();
        }

        console.log(`researchs id => ${identifiers.research} - answeredQuestion id => ${identifiers.answeredQuestion}`);

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
            console.log("entrou null");
            research.questions.forEach((question) => {
                console.log("id => ", question.id);
            })
            const questionsData = Array.from({length: research.questions.length})
                .map((_, index) => {
                    const question = research.questions.find((question: ResearchQuestionData) => question.id == index.toString());
                    console.log("question is null => ", question == null);
                    if (question == null) return null;
                    const optionsArray = Array.from(question.options!!.entries());
                    const data = {
                        'questionId': index,
                        'option': Array.from({length: optionsArray.length}).map((_, index) => {
                            if (afterAnswerData.answeredQuestions.find((answeredQuestion) => answeredQuestion.selectedOption == index)) {
                                console.log("entrou");
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
                    console.log("index => ", index);
                    console.log("selected option => ", question.selectedOption);

                    return data;
                })
                .filter((question) => question != null);
            console.log("questions data => ", questionsData);
            await admin
                .firestore()
                .collection("answers")
                .add({
                    'researchId': identifiers.research,
                    'questions': questionsData
                });
        } else {
            console.log("entrou non null");

            afterAnswerData.answeredQuestions.map((question, index) => {
                console.log("answer.data()[\"questions\"] size  => ", answer.data()["questions"].length);
                console.log("questions == question ? ", answer.data()["questions"][0].questionId == question.question);
                const indexOfQuestionAnswered = (answer.data()["questions"] as any[]).findIndex((questionAnswered: QuestionAnswered) => questionAnswered.questionId == question.question);
                const questionAnswered: QuestionAnswered = answer.data()["questions"][indexOfQuestionAnswered];
                console.log("indexOfQuestionAnswered => ", indexOfQuestionAnswered);
                console.log("questionAnswered => ", questionAnswered);
                if (indexOfQuestionAnswered != -1) {
                    console.log("entrou");
                    console.log("snap => ", snap.after.data());
                    const prevSelectedOption = afterAnswerData.answeredQuestions.find((answeredQuestion) => answeredQuestion.question == questionAnswered.questionId)?.prevSelectedOption;
                    console.log("prevSelectedOption => ", prevSelectedOption);
                    const newArrayOfQuestionsAnswered = answer
                        .data()["questions"]
                        .filter((question: QuestionAnswered) => question.questionId != questionAnswered.questionId);
                    console.log("prevSelectedOption != null", prevSelectedOption != null);
                    console.log("prevSelectedOption != question.selectedOption", prevSelectedOption != question.selectedOption);
                    if (prevSelectedOption != null && prevSelectedOption != question.selectedOption) {
                        console.log("entrou");
                        console.log("options => ", questionAnswered.option);
                        console.log("before => questionAnswered.option[prevSelectedOption][prevSelectedOption]", questionAnswered.option[prevSelectedOption][prevSelectedOption]);
                        questionAnswered.option[prevSelectedOption][prevSelectedOption]--;
                        console.log("after => questionAnswered.option[prevSelectedOption][prevSelectedOption]", questionAnswered.option[prevSelectedOption][prevSelectedOption]);
                    }
                    console.log("selected option => ", question.selectedOption);
                    questionAnswered.option[question.selectedOption][question.selectedOption]++;
                    answer.ref.update({
                        "questions": [
                            ...newArrayOfQuestionsAnswered,
                            questionAnswered
                        ]
                    });
                    console.log("updated!");
                }
            })
        }

        // research.questions.find((question) => question.id == index.toString()).
        return snap.after.data();
    });
