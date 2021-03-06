import {Answers} from "../../Data/Answers";
import firebase from "firebase";
import {FirestoreManager} from "../FirebaseManager/FirestoreManager";
import {getStore} from "../../../redux/ConfigureStore";
import {saveAnswerResearchPayload, saveComputedAnswer} from "../../../redux/Actions";
import {app} from "../../../index";
import {ComputedAnswers, AnswersSnapshotData} from "../../Data/ComputedAnswers";
import {isDevEnv} from "../../utils";



interface AnswerResearchManagerResponse {
    result: boolean,
    error: any
}

export interface AnswerQuestionIdentifiersPayload {
    researchId: string | null,
    answerResearchId: string | null
}
export interface EndAnswerResearchPayload {
    identifiers: AnswerQuestionIdentifiersPayload
}

export interface GoBackQuestionPayload {
    identifiers: AnswerQuestionIdentifiersPayload
}

export interface SaveAnsweredQuestionPayload {
    researchId: string | null,
    answerResearchId: string | null,
    answeredQuestionId: string | null,
    selectedOption: number,
    prevSelectedOption: number | null
}

export class AnswerResearchManager {
    constructor() {
        this.firestore = app.firestore();
        this.unsubscribeToUpdatedAnswers = () => null;
    }

    private firestore: firebase.firestore.Firestore;
    public unsubscribeToUpdatedAnswers: () => void;

    async startQuestionnaire(researchId: string, answerData: Answers): Promise<AnswerResearchManagerResponse> {
        try {
            const res = await this
                .firestore
                .collection(FirestoreManager.COLLECTIONS.RESEARCH)
                .doc(researchId)
                .collection(FirestoreManager.COLLECTIONS.ANSWERED_QUESTIONS)
                .add(answerData.parseFirebase());
            getStore().dispatch(saveAnswerResearchPayload({researchId, answerResearchId: res.id}));
            return {result: true, error: null};
        } catch (e) {
            return {result: false, error: e.message};
        }
    }

    async saveAnsweredQuestion(payload: SaveAnsweredQuestionPayload): Promise<AnswerResearchManagerResponse> {
        if (payload.researchId == null || payload.answeredQuestionId == null || payload.answerResearchId == null) return {result: false, error: "Research payload is null"}
        try {
            const answerQuestionDoc = await this
                .firestore
                .collection(FirestoreManager.COLLECTIONS.RESEARCH)
                .doc(payload.researchId)
                .collection(FirestoreManager.COLLECTIONS.ANSWERED_QUESTIONS)
                .doc(payload.answerResearchId)
                .get();

            const answeredQuestions = (answerQuestionDoc.data()!!)["answeredQuestions"] as any[];
            const arrayOfQuestionsWithSameId = answeredQuestions.filter((answeredQuestion: any) => answeredQuestion["questionId"] == payload.answeredQuestionId);
            const questionIdCount: number = arrayOfQuestionsWithSameId.length;
            if (questionIdCount >= 1) {
                const arrayWithOutThatQuestion = answeredQuestions.filter((answeredQuestion: any) => answeredQuestion["questionId"] != payload.answeredQuestionId);
                const currentQuestion = arrayOfQuestionsWithSameId[0];
                currentQuestion["prevSelectedOption"] = currentQuestion["selectedOption"];
                currentQuestion["selectedOption"] = payload.selectedOption;
                await answerQuestionDoc
                    .ref
                    .update({
                        answeredQuestions: [
                            ...arrayWithOutThatQuestion,
                            currentQuestion
                        ]
                    });
            } else {
                await answerQuestionDoc.ref.update({
                    answeredQuestions: firebase.firestore.FieldValue.arrayUnion({
                        "questionId": payload.answeredQuestionId,
                        "selectedOption": payload.selectedOption
                    })
                })
            }
            return {result: true, error: null};
        } catch (e) {
            return {result: false, error: e};
        }
    }

    async endQuestionnaire(payload: EndAnswerResearchPayload): Promise<AnswerResearchManagerResponse> {
        if (payload.identifiers.researchId == null || payload.identifiers.answerResearchId == null) return {result: false, error: "Payload is null"};
        try {
            /*TODO - Success*/
            await this
                .firestore
                .collection(FirestoreManager.COLLECTIONS.RESEARCH)
                .doc(payload.identifiers.researchId)
                .collection(FirestoreManager.COLLECTIONS.ANSWERED_QUESTIONS)
                .doc(payload.identifiers.answerResearchId)
                .update({
                    status: "done"
                })
            return {result: true, error: null};
        } catch (e) {
            /*TODO - Error*/
            return {result: false, error: e}
        }
    }

    async setAsInProgress(goBackPayload: GoBackQuestionPayload):Promise<AnswerResearchManagerResponse> {
        if (goBackPayload.identifiers.researchId == null || goBackPayload.identifiers.answerResearchId == null) return {result: false, error: "Payload is null"};
        try {
            await this
                .firestore
                .collection(FirestoreManager.COLLECTIONS.RESEARCH)
                .doc(goBackPayload.identifiers.researchId)
                .collection(FirestoreManager.COLLECTIONS.ANSWERED_QUESTIONS)
                .doc(goBackPayload.identifiers.answerResearchId)
                .update({
                    "status": "progress"
                });
            return {result: false, error: null};
        } catch (e) {
            isDevEnv() && console.log("Error => ", e.message);
            return {result: false, error: e.message};
        }
    }

}
