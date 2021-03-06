import firebase from "firebase";

export class ResearchQuestionData {
    constructor(id: string | null = null,
                question: string | null = null,
                options: Map<number, string> | null = null,
                selectedOption: number | null = null,
                prevSelectedOption: number | null = null
                ) {
        this.id = id;
        this.question = question;
        this.options = options;
        this.selectedOption = selectedOption;
        this.prevSelectedOption = prevSelectedOption;
    }
    id: string | null;
    question: string | null;
    options: Map<number, string> | null;
    selectedOption: number | null;
    prevSelectedOption: number | null

    static from(data:  firebase.firestore.DocumentData): ResearchQuestionData {
        return new ResearchQuestionData(
            data["id"],
            data["question"],
            data["options"],
            data["selectedOption"],
            data["prevSelectedOption"]
        );
    }

    parseFirebase() {
        const newOptions: any = [];
        this.options?.forEach((value, key) => newOptions.push({[key]: value}))
        return {
            "id": this.id,
            "question": this.question,
            "options": newOptions,
            "selectedOption": this.selectedOption,
            "prevSelectedOption": this.prevSelectedOption
        }
    }
}
