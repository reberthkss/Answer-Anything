import {AnswerData} from "../../Data/AnswerData";
import firebase from "firebase";
import {FirestoreManager} from "../FirebaseManager/FirestoreManager";
import {getStore} from "../../../redux/ConfigureStore";
import {saveAnswerResearchPayload, saveAnswersOfResearch} from "../../../redux/Actions";


interface AnswerResearchManagerResponse {
    result: boolean,
    error: any
}

export interface EndAnswerResearchPayload {
    researchId: string | null,
    answerResearchId: string | null
}

export interface SaveAnsweredQuestionPayload {
    researchId: string | null,
    answerResearchId: string | null,
    answeredQuestionId: string | null,
    selectedOption: number
}

export class AnswerResearchManager {
    constructor() {
        this.firestore = firebase.firestore();
    }

    private firestore: firebase.firestore.Firestore;

    async startQuestionnaire(researchId: string, answerData: AnswerData): Promise<AnswerResearchManagerResponse> {
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
        /* TODO - Check if already have a answer data question with the same id of */
        /* TODO - Try check if already have same selectedQuestionData on firestore*/
        if (payload.researchId == null || payload.answeredQuestionId == null || payload.answerResearchId == null) return {result: false, error: "Research payload is null"}
        try {
            await this
                .firestore
                .collection(FirestoreManager.COLLECTIONS.RESEARCH)
                .doc(payload.researchId)
                .collection(FirestoreManager.COLLECTIONS.ANSWERED_QUESTIONS)
                .doc(payload.answerResearchId)
                .update({
                    answeredQuestion: firebase.firestore.FieldValue.arrayUnion({
                        "questionId": payload.answeredQuestionId,
                        "selectedOption": payload.selectedOption
                    })
                });
            return {result: true, error: null};
        } catch (e) {
            return {result: false, error: e};
        }

        return {result: true, error: null}
    }

    async endQuestionnaire(payload: EndAnswerResearchPayload): Promise<AnswerResearchManagerResponse> {
        if (payload.researchId == null || payload.answerResearchId == null) return {result: false, error: "Payload is null"};
        try {
            /*TODO - Success*/
            await this
                .firestore
                .collection(FirestoreManager.COLLECTIONS.RESEARCH)
                .doc(payload.researchId)
                .collection(FirestoreManager.COLLECTIONS.ANSWERED_QUESTIONS)
                .doc(payload.answerResearchId)
                .update({
                    status: "done"
                })
            return {result: true, error: null};
        } catch (e) {
            /*TODO - Error*/
            return {result: false, error: e}
        }
    }

    async loadAnswersByResearch(researchId: string): Promise<AnswerResearchManagerResponse> {
        try {
            const answers = (await this
                .firestore
                .collection(FirestoreManager.COLLECTIONS.RESEARCH)
                .doc(researchId)
                .collection(FirestoreManager.COLLECTIONS.ANSWERED_QUESTIONS)
                .get())
                .docs
                .map(
                    (querySnapshot) =>
                        AnswerData.from(querySnapshot.id, querySnapshot.data())
                );


            const answersOfResearch = {
                id: researchId,
                answers: answers
            }
            getStore().dispatch(saveAnswersOfResearch(answersOfResearch));
            return {result: true, error: null};
        } catch (e) {
            return {result: false, error: e}
        }
    }

}
