import firebase from "firebase";
import {Research} from "../../Data/ResearchData";
import {ReduxAction, ReduxState} from "../../../redux/reducer";
import {PersistPartial} from "redux-persist/lib/persistReducer";
import {Store} from "redux";
import {store} from "../../../redux/ConfigureStore";
import {saveAnswerResearchPayload, saveResearch, saveResearchs} from "../../../redux/Actions";
import {app} from "../../../index";
import {isDevEnv} from "../../utils";

interface FirestoreManagerResponse {
    result: boolean,
    error: string | null
}

export class FirestoreManager {
    static COLLECTIONS = {
        RESEARCH: "researchs",
        ANSWERED_QUESTIONS: "answeredQuestions",
        ANSWERS: "answers",
    }
    private TAG = "[FIRESTOREMANAGER]";

    constructor() {
        this.firestore = app.firestore();
        this.store = store;
    }

    private firestore: firebase.firestore.Firestore;
    private store: Store<ReduxState & PersistPartial, ReduxAction>;

    /*TODO - UPDATE THIS TO CHOOSE COLLECTION*/
    async read(): Promise<FirestoreManagerResponse> {
        try {
            const user = this.store.getState().user;
            const collection = this.firestore
                .collection(FirestoreManager.COLLECTIONS.RESEARCH)
                .where(`roles.${user?.user.id}`, "==", "owner");

            /*
            ---------DEPRECATED - 11/02/2021---------
            const researchs = (await this.firestore
                .collection(FirestoreManager.COLLECTIONS.RESEARCH)
                .where(`roles.${user?.user.id}`, "==", "owner")
                .get())
                .docs
                .map((doc) => {
                    return {
                        id: doc.id,
                        research: Research.from(doc.data())
                    }
                });

            this.store.dispatch(saveResearchs(researchs));
            */
            collection.onSnapshot((data) => {
                const researchs = data.docs.map((doc) => {
                    return {
                        id: doc.id,
                        research: Research.from(doc.data())
                    }
                });
                this.store.dispatch(saveResearchs(researchs));
            });
            return {result: true, error: null}
        } catch (e) {
            isDevEnv() && console.log("error => ", e);
            /* TODO - SHOW ERROR */
            return {result: false, error: e.message};
        }
    }

    async write(research: Research, id: string): Promise<FirestoreManagerResponse> {
        /* TODO - Look ways to block updated from here */
        try {
            await this.firestore
                .collection(FirestoreManager.COLLECTIONS.RESEARCH)
                .doc(id)
                .set(research.parseFirebase());
            this.store.dispatch(saveAnswerResearchPayload({
                answerResearchId: "",
                researchId: id
            }));
            isDevEnv() && console.log(this.TAG, "Successful saved research!");
            return {result: true, error: null};
        } catch (e) {
            /* TODO - SHOW ERROR */
            isDevEnv() && console.log(`error => ${e.message}`);
            return {result: false, error: e.message};
        }
    }

    async update(research: Research, researchId: string): Promise<FirestoreManagerResponse> {
        try {
            await this.firestore
                .collection(FirestoreManager.COLLECTIONS.RESEARCH)
                .doc(researchId)
                .update(research.parseFirebase());
            console.log(this.TAG, "Updated research")
            return {result: true, error: null};
        } catch (e) {
            isDevEnv() && console.log(this.TAG, "[FIRESTOREMANAGER] error => ", e);
            /* TODO - SHOW ERROR */
            return {result: false, error: e.message};
        }
    }

    async delete(research: Research, researchId: string): Promise<FirestoreManagerResponse> {
        try {
            await this.firestore
                .collection(FirestoreManager.COLLECTIONS.RESEARCH)
                .doc(researchId)
                .delete();
            console.log(this.TAG, "Document removed! ");
            return {result: true, error: null};
        } catch (e) {
            isDevEnv() && console.log(this.TAG, "Error => ", e);
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
            isDevEnv() && console.log(this.TAG, e.message);
            return {result: false, error: e.message};
        }
    }
}
