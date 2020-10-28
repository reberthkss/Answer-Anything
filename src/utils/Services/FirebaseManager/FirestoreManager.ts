import firebase from "firebase";
import {Research} from "../../Data/ResearchData";
import {ReduxAction, ReduxState} from "../../../redux/reducer";
import {PersistPartial} from "redux-persist/lib/persistReducer";
import {Store} from "redux";
import {store} from "../../../redux/ConfigureStore";
import {saveResearch, saveResearchs} from "../../../redux/Actions";
import {AnswerData} from "../../Data/AnswerData";

interface FirestoreManagerResponse {
    result: boolean,
    error: string | null
}

export class FirestoreManager {
    static COLLECTIONS = {
        RESEARCH: "researchs",
        ANSWERED_QUESTIONS: "answeredQuestions"
    }
    private TAG = "[FIRESTOREMANAGER]";

    constructor() {
        this.firestore = firebase.firestore();
        this.store = store;
    }

    private firestore: firebase.firestore.Firestore
    private store: Store<ReduxState & PersistPartial, ReduxAction>

    /*TODO - UPDATE THIS TO CHOOSE COLLECTION*/
    async read(): Promise<FirestoreManagerResponse> {
        try {
            const research: Research[] = [];
            const res = (await this.firestore
                .collection(FirestoreManager.COLLECTIONS.RESEARCH)
                .get())
            res.forEach((querySnapShot) => research.push(Research.from(querySnapShot.data())));
            this.store.dispatch(saveResearchs(research));
            return {result: true, error: null}
        } catch (e) {
            console.log("error => ", e);
            /* TODO - SHOW ERROR */
            return {result: false, error: e.message};
        }
    }

    async write(research: Research): Promise<FirestoreManagerResponse> {
        /* TODO - Look ways to block updated from here */
        try {
            const userId = this.store.getState().user?.user.id;
            (await this.firestore
                .collection(FirestoreManager.COLLECTIONS.RESEARCH)
                .doc(`${userId}-${research.id}`)
                .set(research.parseFirebase()))
            console.log(this.TAG, "Successful saved research!");
            return {result: true, error: null};
        } catch (e) {
            /* TODO - SHOW ERROR */
            return {result: false, error: e.message};
        }
    }

    async update(research: Research): Promise<FirestoreManagerResponse> {
        try {
            await this.firestore
                .collection(FirestoreManager.COLLECTIONS.RESEARCH)
                .doc(research.documentID())
                .update(research.parseFirebase());
            console.log(this.TAG, "Updated research")
            return {result: true, error: null};
        } catch (e) {
            console.log(this.TAG, "[FIRESTOREMANAGER] error => ", e);
            /* TODO - SHOW ERROR */
            return {result: false, error: e.message};
        }
    }

    async delete(research: Research): Promise<FirestoreManagerResponse> {
        try {
            await this.firestore
                .collection(FirestoreManager.COLLECTIONS.RESEARCH)
                .doc(research.documentID())
                .delete();
            console.log(this.TAG, "Document removed! ");
            return {result: true, error: null};
        } catch (e) {
            console.log(this.TAG, "Error => ", e);
            /* TODO - SHOW ERROR */
            return {result: false, error: e.message};
        }
    }

    async find(researchId: string): Promise<FirestoreManagerResponse> {
        try {
            const research = await this
                .firestore
                .collection(FirestoreManager.COLLECTIONS.RESEARCH)
                .doc(researchId)
                .get()
            if (research === undefined) {
                return {result: false, error: "Research not found"};
            } else {
                this.store.dispatch(saveResearch(Research.from(research.data()!!)))
                return {result: true, error: null};
            }
        } catch (e) {
            console.log(this.TAG, e.message);
            return {result: false, error: e.message};
        }
    }

}
