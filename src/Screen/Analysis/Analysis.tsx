import React, {useEffect, useRef, useState} from "react";
import "./Analysis.css";
import { useParams } from "react-router-dom";
import {useSelector} from "react-redux";
import {AnswerResearchProps, ReduxState, ResearchProps} from "../../redux/reducer";
import {AnswerResearchManager} from "../../utils/Services/AnswerResearchManager/AnswerResearchManager";
import {ChartWrapper} from "../../Components/Chart/ChartWrapper";
import { CircularProgress } from "@material-ui/core";
const randomColor = require('randomcolor');

interface DatasetProps {
    questionId: number,
    data: {option: number, count: number}[]
}

export const Analysis = () => {
    const TAG = "Analysis";
    const {id} = useParams() as {id: string};
    const [dataSet, setDataset] = useState<{researchId: string, dataSet: DatasetProps[]} | null>(null);
    const [research, answers]: (ResearchProps | null | AnswerResearchProps)[] = useSelector((state: ReduxState) =>
    [
        state.researchs.find((research) => research.id === id) || null,
        state.answersOfResearch as AnswerResearchProps
    ]);
    const [loading, setLoading] = useState(true);


    function computeAnswers(answers: AnswerResearchProps) {
        const dataSetProps: DatasetProps[] = [];

        answers.answers.forEach((answer) => {
            answer.answeredQuestions.forEach((question) => {
                const questionData = dataSetProps.find((questionDataset) => questionDataset.questionId === question["question"]);
                if (questionData) {
                    const questionIndex = dataSetProps.indexOf(questionData);
                    const optionData = dataSetProps[questionIndex].data.find((currentQuestion) => currentQuestion.option === question["selectedOption"] );
                    if (optionData) {
                        const optionIndex = dataSetProps[questionIndex].data.indexOf(optionData);
                        dataSetProps[questionIndex].data[optionIndex].count++;
                    } else {
                        dataSetProps[questionIndex].data.push({
                            option: question["selectedOption"],
                            count: 1
                        })
                    }
                } else {
                    dataSetProps.push(
                        {
                            questionId: question["question"],
                            data: [
                                {
                                    option: question["selectedOption"],
                                    count: 1
                                }
                            ]
                        }
                    )
                }
            })
        })
        return dataSetProps;
    }

    async function loadAnswer(researchId: string) {
        const answerResearchManager = new AnswerResearchManager();
        const response = await answerResearchManager.loadAnswersByResearch(researchId);

        if (response.result) {
            console.log(TAG, "Successful loaded answers of research.");
        } else {
            console.log(TAG, "Failure on load answer of research. Error: ", response.error);
        }
    }

    function getLabels(options: Map<number, string>) {
        const optionsArray = Array.from(options);
        return optionsArray.map((option, index) => option[index]);
    }

    function renderOptionsChart(research: ResearchProps, dataSet: {researchId: string, dataSet: DatasetProps[]}) {
        if ((answers as AnswerResearchProps).researchId !== research.id || research.id !== dataSet.researchId) {
            return [];
        } else {
            return dataSet.dataSet.map(({data, questionId}) => {
                const questionFromResearch = research.research.questions.find((question) => question.id === questionId.toString());
                if (!questionFromResearch) throw new Error("Unknown question!");
                const optionsData = Array.from({length: data.length}).map(() => 0);
                data.forEach((option) => optionsData[option.option] = option.count)
                const backgroundColors = data.map(() => randomColor({
                    count: 1,
                    format: "rgba",
                    alpha: 0.2
                }));
                // @ts-ignore
                const labels: string[] = getLabels(questionFromResearch.options);
                const title = questionFromResearch.question
                if (!title) throw new Error("Title is empty!");
                return (
                    <ChartWrapper data={optionsData} backgroundColors={backgroundColors} labels={labels}
                                  title={title} type={"bar"}/>
                )
            })
        }
    }

    function renderCharts(dataSet: {researchId: string, dataSet: DatasetProps[]} | null) {
        if (dataSet != null && dataSet.dataSet.length !== 0) {
            return (
                <div className={"chart"}>
                    {renderOptionsChart(research as ResearchProps, dataSet)}
                </div>
            )
        } else {
            return (<div className={"noDataAvailableContainer"}>
                <div className={"noDataAvailableText"}>
                    No data available
                </div>
            </div>)
        }
    }

    function renderLoading() {
        return (
            <CircularProgress/>
        )
    }

    function renderContent(content: {researchId: string, dataSet: DatasetProps[]} | null) {
        if (loading) {
            return (<div className={"loadingContainer"}>
                {renderLoading()}
            </div>)
        } else {
            return (
                <div className={"chartContainer"}>
                    {renderCharts(content)}
                </div>
            )
        }
    }

    useEffect(() => {
        setDataset({researchId: id, dataSet: computeAnswers(answers as AnswerResearchProps)});
    }, [answers])

    useEffect(() => {
        loadAnswer(id)
            .then(() => {
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
            })
    }, [id])



    return (
        <div className={"analysisRoot"}>
            {renderContent(dataSet)}
        </div>
    )
}
