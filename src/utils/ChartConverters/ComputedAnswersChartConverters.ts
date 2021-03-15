import {ComputedAnswersPayload, ResearchProps} from "../../redux/reducer";
import {Research} from "../Data/ResearchData";
import {ResearchQuestionData} from "../Data/ResearchQuestionData";
import {AnswersQuestionsProps, ComputedAnswers} from "../Data/ComputedAnswers";
import {ChartWrapper} from "../../Components/Chart/ChartWrapper";
import React from "react";
const randomColor = require('randomcolor');

export interface ResearchComputedAnswers {
    questionId: number,
    data: {option: number, count: number}[]
}

interface ComputedAnswersChartData {
    data: number[],
    title: string,
    labels: string[],
    backgroundColors: any
}
class ComputedAnswersChartConverters {
    constructor(computedAnswersPayload: ComputedAnswers, targetResearch: Research) {
        this.researchComputedAnswers = [];
        this.targetResearch = targetResearch;
        this.chartData = [];
        this.parseDataToChart = computedAnswersPayload;
    }

    private getLabels(options: Map<number, string>) {
        const optionsArray = Array.from(options);
        return optionsArray.map((option, index) => option[index]);
    }

    private set parseComputedAnswers(questions:  AnswersQuestionsProps[]) {
        const dataSetProps: ResearchComputedAnswers[] = [];
        questions
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
        this.researchComputedAnswers = dataSetProps;
    }

    private set generateChartData(researchComputedAnswers: ResearchComputedAnswers[]) {
        this.chartData = researchComputedAnswers.map(({data, questionId}): ComputedAnswersChartData => {
            const questionFromResearch = this.targetResearch.questions.find((question) => question.id === questionId.toString());
            if (!questionFromResearch) throw new Error("Unknown question!");
            const optionsData = Array.from({length: data.length}).map(() => 0);
            data.forEach((option) => optionsData[option.option] = option.count)
            const backgroundColors = data.map(() => randomColor({
                count: 1,
                format: "rgba",
                alpha: 0.2
            }));
            // @ts-ignore
            const labels: string[] = this.getLabels(questionFromResearch.options);
            const title = questionFromResearch.question
            if (!title) throw new Error("Title is empty!");
            return {
                data: optionsData,
                title,
                labels,
                backgroundColors
            }
        })
    }

    private set parseDataToChart(computedAnswers: ComputedAnswers) {
        this.parseComputedAnswers = computedAnswers.questions;
        this.generateChartData = this.researchComputedAnswers;
    }

    private targetResearch: Research;
    private researchComputedAnswers: ResearchComputedAnswers[];
    public chartData: ComputedAnswersChartData[];
}

export default ComputedAnswersChartConverters;
