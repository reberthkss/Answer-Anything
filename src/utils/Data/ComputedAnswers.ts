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
    options: AnswersQuestionsOptionsProps[],
    questionId: number
}
export interface AnswersProps {
    researchId: number,
    questions: AnswersQuestionsProps[]
}

export class ComputedAnswers {
    constructor(researchId: number, questions: AnswersQuestionsProps[]) {
        this.researchId = researchId;
        this.questions = questions;
    }

    researchId: number;
    questions: AnswersQuestionsProps[];

    static parseFirebase() {

    }

    static from(answerSnapshot: AnswersSnapshotData): ComputedAnswers {
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
        return new ComputedAnswers(answerSnapshot.researchId, questions);
    }
}
