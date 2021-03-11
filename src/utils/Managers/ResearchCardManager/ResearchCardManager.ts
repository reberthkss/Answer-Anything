import {app} from "../../../index";
import {FirestoreManager} from "../../Services/FirebaseManager/FirestoreManager";
import {AnswerData} from "../../Data/AnswerData";
import {useDispatch} from "react-redux";
import {saveAnswersOfResearch} from "../../../redux/Actions";

interface ResearchCardManagerResponse {
    response: boolean,
    error: null | string
}

export class ResearchCardManager {
    private onChangeListener: any;
    private firestore = app.firestore;

    async setListener(researchId: string): Promise<ResearchCardManagerResponse> {
        const dispatch = useDispatch();
        try {
            this.onChangeListener = (await  this.firestore()
                .collection(FirestoreManager.COLLECTIONS.RESEARCH)
                .where("researchId.researchId", "==", researchId)
                .get())
                .docs[0]
                .ref
                .collection(FirestoreManager.COLLECTIONS.ANSWERED_QUESTIONS)
                .onSnapshot((data) => {
                    const answerData = AnswerData.from(researchId, data.docs[0]);
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
