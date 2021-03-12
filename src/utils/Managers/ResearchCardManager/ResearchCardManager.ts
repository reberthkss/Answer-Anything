import {app} from "../../../index";
import {FirestoreManager} from "../../Services/FirebaseManager/FirestoreManager";
import {Answers} from "../../Data/Answers";
import {useDispatch} from "react-redux";
import {saveAnswersOfResearch} from "../../../redux/Actions";
import {store} from "../../../redux/ConfigureStore";

interface ResearchCardManagerResponse {
    response: boolean,
    error: null | string
}

export class ResearchCardManager {
    private onChangeListener: any;
    private firestore = app.firestore;
    private researchId;
    constructor(researchId: string) {
        this.researchId = researchId;
    }

    async setListener(): Promise<ResearchCardManagerResponse> {
        const dispatch = store.dispatch;
        try {
            this.onChangeListener = (await  this.firestore()
                .collection(FirestoreManager.COLLECTIONS.RESEARCH)
                .where("researchId.researchId", "==", this.researchId)
                .get())
                .docs[0]
                .ref
                .collection(FirestoreManager.COLLECTIONS.ANSWERED_QUESTIONS)
                .onSnapshot((data) => {
                    const answerData = Answers.from(this.researchId, data.docs[0]);
                    console.log(`Answer Data => ${answerData}`);
                })
            return {response: true, error: null}
        } catch (e) {
            return {response: false, error: e.message}
        }
    }

    async removeListener(): Promise<ResearchCardManagerResponse> {
        try {
            this.onChangeListener();
            return {response: true, error: null}
        } catch (e) {
            return {response: false, error: e.message}
        }
    }
}


export default ResearchCardManager;
