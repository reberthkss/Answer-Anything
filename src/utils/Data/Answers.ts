import firebase from "firebase";
import {UserData} from "../../Components/AnswerResearchCarousel/AnswerResearchCarousel";

interface AnsweredQuestions {
    question: number,
    selectedOption: number,
    prevSelectedOption: number | null,
}

export class Answers {
    constructor( userData: UserData, answeredQuestions: AnsweredQuestions[] = [], status: "progress" | "done" = "progress") {
        this.answeredQuestions = answeredQuestions;
        this.userData = userData;
        this.status = status;
    }

    private static TAG = "AnswerData";

    userData: UserData;
    answeredQuestions: AnsweredQuestions[];
    status: "progress" | "done" ;

    parseFirebase() {
        const answeredQuestions: { "questionId": number, "selectedOption": number }[] = this.answeredQuestions
            .map((answeredQuestion, index) => ({
                "questionId": answeredQuestion.question,
                "selectedOption": answeredQuestion.selectedOption,
                "prevSelectedOption": answeredQuestion.prevSelectedOption
            }));

        return {
            "answeredQuestions": answeredQuestions,
            "userData": {
                "email": this.userData.email,
                "name": this.userData.name
            },
            "status": this.status
        }
    }

    static from(id: string, data:  firebase.firestore.DocumentData): Answers {
        return new Answers(
            {email: data["userData"].email, name: data["userData"].name},
            data["answeredQuestions"].map((answeredQuestion: any) => (
                {
                    question: parseInt(answeredQuestion["questionId"]),
                    selectedOption: answeredQuestion["selectedOption"],
                    prevSelectedOption: answeredQuestion["prevSelectedOption"],
                }
                )),
            data["status"]
        )
    }

}
