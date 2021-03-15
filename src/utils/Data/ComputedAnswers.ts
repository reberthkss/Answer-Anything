export interface AnswersSnapshotData {
    "researchId": string,
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
    constructor(researchId: string, questions: AnswersQuestionsProps[]) {
        this.researchId = researchId;
        this.questions = questions;
    }

    public researchId: string;
    public questions: AnswersQuestionsProps[];

    static parseFirebase() {

    }

    static from(answerSnapshot: AnswersSnapshotData): ComputedAnswers {
        const questions: AnswersQuestionsProps[] = answerSnapshot.questions
            .map((question, index): AnswersQuestionsProps => {
                return {
                    questionId: question.questionId,
                    options: question.option.map((option, index) => ({
                        [index.toString()]: option[index] as unknown as number
                    }))
                }
            })
        return new ComputedAnswers(answerSnapshot.researchId, questions);
    }
}
