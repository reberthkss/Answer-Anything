import {FirestoreTimestamp} from "./ResearchData";

export interface AnswersSnapshotData {
    "researchId": string,
    "questions": {
        "option": [
            {
                [key: string]: number
            }[]
        ],
        "questionId": number
    }[],
    "timestamp": FirestoreTimestamp
}

export interface AnswersQuestionsOptionsProps {
    [key: string]: number
}
export interface AnswersQuestionsProps {
    options: AnswersQuestionsOptionsProps[],
    questionId: number
}
export interface AnswersProps {
    researchId: number,
    questions: AnswersQuestionsProps[]
}

export class ComputedAnswers {
    constructor(researchId: string, questions: AnswersQuestionsProps[], timestamp: FirestoreTimestamp = {seconds: Date.now()}) {
        this.researchId = researchId;
        this.questions = questions;
        this.timestamp = timestamp;
    }

    public researchId: string;
    public questions: AnswersQuestionsProps[];
    public timestamp: FirestoreTimestamp;

    static parseFirebase() {

    }

    static from(answerSnapshot: AnswersSnapshotData): ComputedAnswers {
        const questions: AnswersQuestionsProps[] = answerSnapshot.questions
            .map((question, index): AnswersQuestionsProps => {
                return {
                    questionId: question.questionId,
                    options: question.option.map((option, index) => ({
                        [index.toString()]: option[index] as unknown as number
                    })),
                }
            })
        return new ComputedAnswers(answerSnapshot.researchId, questions, answerSnapshot.timestamp);
    }
}
