import {AnswerData} from "../../Data/AnswerData";
import firebase from "firebase";
import {FirestoreManager} from "../FirebaseManager/FirestoreManager";
import {getStore} from "../../../redux/ConfigureStore";
import {saveAnswerResearchPayload, saveAnswersOfResearch} from "../../../redux/Actions";
import {app} from "../../../index";
import {Answers, AnswersSnapshotData} from "../../Data/Answers";



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
            console.log("Error => ", e.message);
            return {result: false, error: e.message};
        }
    }

    async loadAnswersByResearch(researchId: string): Promise<AnswerResearchManagerResponse> {
        try {
            const answersRef = (await this
                .firestore
                .collection(FirestoreManager.COLLECTIONS.ANSWERS)
                .where("researchId", "==", researchId)
                .get());
            const answersDoc:  firebase.firestore.DocumentReference<firebase.firestore.DocumentData> | null = answersRef.docs.length > 0 ? answersRef.docs[0].ref : null;
            if (answersDoc == null) return {result: false, error: "Answer Not Found!"};
            const answers: Answers = Answers.from((await answersDoc.get()).data() as AnswersSnapshotData);
            const answersOfResearch: {
                researchId: string,
                answers: Answers
            } = {
                researchId: researchId,
                answers: answers
            };
            this.unsubscribeToUpdatedAnswers = answersDoc.onSnapshot((data) => {
                getStore().dispatch(saveAnswersOfResearch({
                    researchId,
                    answers: Answers.from(data.data() as AnswersSnapshotData)
                }))
            });
            getStore().dispatch(saveAnswersOfResearch(answersOfResearch));
            return {result: true, error: null};
        } catch (e) {
            return {result: false, error: e}
        }
    }

}
