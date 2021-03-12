import {FirestoreManager} from "../../Services/FirebaseManager/FirestoreManager";
import firebase from "firebase";
import {getStore} from "../../../redux/ConfigureStore";
import {saveComputedAnswer} from "../../../redux/Actions";
import {AnswersSnapshotData, ComputedAnswers} from "../../Data/ComputedAnswers";
import {app} from "../../../index";
interface ComputedAnswersManagerResponse {
    result: boolean,
    error: string | null
}

class ComputedAnswersManager {
    constructor(researchId: string) {
        this.researchId = researchId;
    }
    private readonly researchId: string
    private firestore = app.firestore();
    private unsubscribeToUpdatedAnswers: any;

    async subscribe(): Promise<ComputedAnswersManagerResponse> {
        try {
            const answersRef = (await this
                .firestore
                .collection(FirestoreManager.COLLECTIONS.ANSWERS)
                .where("researchId", "==", this.researchId)
                .get());
            const answersDoc:  firebase.firestore.DocumentReference<firebase.firestore.DocumentData> | null = answersRef.docs.length > 0 ? answersRef.docs[0].ref : null;
            if (answersDoc == null) return {result: false, error: "Answer Not Found!"};
            this.unsubscribeToUpdatedAnswers = answersDoc.onSnapshot((data) => {
                const answersOfResearch = {
                    researchId: this.researchId,
                    computedAnswers: ComputedAnswers.from(data.data() as AnswersSnapshotData)
                };
                getStore().dispatch(saveComputedAnswer(answersOfResearch));
            });
            return {result: true, error: null};
        } catch (e) {
            return {result: false, error: e}
        }
    }

    async unsubscribe(): Promise<ComputedAnswersManagerResponse> {
        try {
            this.unsubscribeToUpdatedAnswers();
            return {result: true, error: null};
        } catch (e) {
            return {result: false, error: e.message};
        }
    }

}

export default ComputedAnswersManager;
