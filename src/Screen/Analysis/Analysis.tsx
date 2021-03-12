import React, {useEffect, useRef, useState} from "react";
import "./Analysis.css";
import { useParams } from "react-router-dom";
import {useSelector} from "react-redux";
import {AnswerResearchProps, ReduxState, ResearchProps} from "../../redux/reducer";
import {AnswerResearchManager} from "../../utils/Services/AnswerResearchManager/AnswerResearchManager";
import {ChartWrapper} from "../../Components/Chart/ChartWrapper";
import { CircularProgress } from "@material-ui/core";
import {ComputedAnswers} from "../../utils/Data/ComputedAnswers";
import {useTranslation} from "react-i18next";
import Scrollbar from "react-scrollbars-custom";
const randomColor = require('randomcolor');

interface DatasetProps {
    questionId: number,
    data: {option: number, count: number}[]
}

export const Analysis = () => {
    const TAG = "Analysis";
    const {researchId} = useParams() as {researchId: string};
    const [dataSet, setDataset] = useState<{researchId: string, dataSet: DatasetProps[]} | null>(null);
    const [research, answers]: (ResearchProps | null | ComputedAnswers)[] = useSelector((state: ReduxState) => {
        const research = state.researchs.find((research) => research.researchId === researchId);
        return [
            research || null,
            research?.computedAnswers || null
        ]
        }
    );
    const answerResearchManager = new AnswerResearchManager();
    const [loading, setLoading] = useState(true);
    const {t} = useTranslation();
    function computeAnswers(answerResearchProps: AnswerResearchProps) {
        const dataSetProps: DatasetProps[] = [];
        answerResearchProps.answers.questions
            .forEach((question) => {
                dataSetProps.push({
                    questionId: question.questionId,
                    data: question.option.map((option, index) => {
                        return {
                            option: index,
                            count: option[index]
                        }
                    }),
                });
            });
        return dataSetProps;
    }

    async function loadAnswer(researchId: string) {
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
        /* todo  change below*/
        if (research == null || answers == null) {
            return renderNoDataAvailable();
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
                    <div className={"chart"}>
                        <ChartWrapper data={optionsData} backgroundColors={backgroundColors} labels={labels}
                                      title={title} type={"bar"}/>
                    </div>
                )
            })
        }
    }

    function renderCharts(dataSet: { researchId: string, dataSet: DatasetProps[] }) {
        return (
            renderOptionsChart(research as ResearchProps, dataSet)
        )
    }

    function renderLoading() {
        return (
            <CircularProgress/>
        )
    }

    function renderNoDataAvailable() {
        return (<div className={"noDataAvailableContainer"}>
            <div className={"noDataAvailableText"}>
                {t("no_data_available")}
            </div>
        </div>);
    }

    function renderContent(content: {researchId: string, dataSet: DatasetProps[]} | null) {
        if (loading) {
            return (<div className={"loadingContainer"}>
                {renderLoading()}
            </div>)
        } else if (content != null && content.dataSet.length > 0) {
            return (
                <div className={"chartContainer"}>
                    {renderCharts(content)}
                </div>
            )
        } else {
            return renderNoDataAvailable();
        }
    }

    useEffect(() => {
        // @ts-ignore
        if (answers == null) return;
        /* todo change below */
        const researchId: string | null = (research as ResearchProps)?.researchId || null
        if (researchId != researchId) return;
        /* todo change below */
        setDataset({researchId: researchId || "", dataSet: computeAnswers({researchId: (research as ResearchProps)?.researchId || "", answers: answers as ComputedAnswers})});
    }, [answers]);

    useEffect(() => {
        answerResearchManager.unsubscribeToUpdatedAnswers();
        loadAnswer(researchId)
            .then(() => {
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
            })
    }, [researchId])

    return (
        <div className={"analysisRoot"}>
            {renderContent(dataSet)}
        </div>
    )
}
