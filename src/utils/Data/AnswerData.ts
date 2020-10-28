import {UserData} from "../../Components/AnswerResearchCarousel/AnswerResearchCarousel";
import firebase from "firebase";

interface AnsweredQuestions {
    questionId: number,
    selectedOption: number
}

export class AnswerData {
    constructor(userData: UserData, answeredQuestions: AnsweredQuestions[] = []) {
        this.answeredQuestions = answeredQuestions;
        this.userData = userData;
    }

    userData: UserData;
    answeredQuestions: AnsweredQuestions[];


    parseFirebase() {
        const answeredQuestions = new Map<number, AnsweredQuestions>();
        this.answeredQuestions
            .forEach((answeredQuestion, index) => answeredQuestions.set(index, answeredQuestion));
        return {
            "answeredQuestions": answeredQuestions,
            "userData": {
                "email": this.userData.email,
                "name": this.userData.name
            }
        }
    }

    static from(data:  firebase.firestore.DocumentData): AnswerData {
        return new AnswerData(
            {email: data["userData"].email, name: data["userData"].name},
            data["answeredQuestions"].map((answeredQuestion: any) => ({question: answeredQuestion["questionId"], selectedOption: answeredQuestion["selectedOption"]}))
        )
    }

}
