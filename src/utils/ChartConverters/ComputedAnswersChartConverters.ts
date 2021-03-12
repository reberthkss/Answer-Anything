import {ComputedAnswersPayload, ResearchProps} from "../../redux/reducer";
import {Research} from "../Data/ResearchData";

export interface DatasetChartProps {
    questionId: number,
    data: {option: number, count: number}[]
}

class ComputedAnswersChartConverters {
    constructor(computedAnswersPayload: ComputedAnswersPayload, targetResearch: Research) {
        this.parseDataToChart = computedAnswersPayload;
        this.chartData = [];
        this.questionLabels = [];
    }

    private set parseDataToChart(answerResearchProps: ComputedAnswersPayload) {
        const dataSetProps: DatasetChartProps[] = [];
        answerResearchProps.computedAnswers.questions
            .forEach((question) => {
                dataSetProps.push({
                    questionId: question.questionId,
                    data: question.options.map((option, index) => {
                        return {
                            option: index,
                            count: option[index]
                        }
                    }),
                });
            });
        this.chartData = dataSetProps;
    }

    private set parseQuestionLabels(research: Research) {

    }
    public chartData: DatasetChartProps[];
    public questionLabels: string[]
}
