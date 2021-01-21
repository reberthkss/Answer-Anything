export interface AnswersSnapshotData {
    "researchId": number,
    "questions": {
        "option": [
            {
                [key: string]: number
            }[]
        ],
        "questionId": number
    }[]
}

export interface AnswersQuestionsOptionsProps {
    [key: string]: number
}
export interface AnswersQuestionsProps {
    option: AnswersQuestionsOptionsProps[],
    questionId: number
}
export interface AnswersProps {
    researchId: number,
    questions: AnswersQuestionsProps[]
}

export class Answers {
    constructor(researchId: number, questions: AnswersQuestionsProps[]) {
        this.researchId = researchId;
        this.questions = questions;
    }

    researchId: number;
    questions: AnswersQuestionsProps[];

    static parseFirebase() {

    }

    static from(answerSnapshot: AnswersSnapshotData): Answers {
        console.log(answerSnapshot);
        const questions: AnswersQuestionsProps[] = answerSnapshot.questions
            .map((question, index): AnswersQuestionsProps => {
                return {
                    questionId: question.questionId,
                    option: question.option.map((option, index) => ({
                        [index.toString()]: option[index] as unknown as number
                    }))
                }
            })
        return new Answers(answerSnapshot.researchId, questions);
    }
}
