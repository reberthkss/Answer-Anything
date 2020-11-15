import React, {useEffect, useRef} from "react";
import "./Analysis.css";
import Chart from 'chart.js';
import { useParams } from "react-router-dom";
import {useSelector} from "react-redux";
import {AnswerResearchProps, ReduxState, ResearchProps} from "../../redux/reducer";
import {AnswerResearchManager} from "../../utils/Services/AnswerResearchManager/AnswerResearchManager";
import {Research} from "../../utils/Data/ResearchData";
import {AnswerData} from "../../utils/Data/AnswerData";
const randomColor = require('randomcolor');

export const Analysis = () => {
    const TAG = "Analysis";
    const {id} = useParams() as {id: string};
    const [research, answers]: (ResearchProps | null | AnswerResearchProps)[] = useSelector((state: ReduxState) =>
    [
        state.researchs.find((research) => research.id === id) || null,
        state.answersOfResearch as AnswerResearchProps
    ])
    const chartRef = useRef<HTMLCanvasElement | null>(null);
    const backgroundColors = research!= null ? getColor((research as ResearchProps) && (research as ResearchProps).research) : [];


    function getColor(research: Research) {
        return Array.from(research.questions[0].options!!).map(() => randomColor({count: 1, format: "rgba", alpha: 0.2}))
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
    useEffect(() => {
        loadAnswer(id);
        if (chartRef.current) {
            const myChart = new Chart(chartRef.current, {
                type: 'bar',
                data: {
                    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
                    datasets: [{
                        label: '# of Votes',
                        data: [12, 19, 3, 5, 2, 3],
                        backgroundColor: backgroundColors,
                        borderColor: [
                            "rgba(0, 0, 0, 1)",
                            "rgba(0, 0, 0, 1)",
                            "rgba(0, 0, 0, 1)",
                            "rgba(0, 0, 0, 1)",
                            "rgba(0, 0, 0, 1)",
                            "rgba(0, 0, 0, 1)"
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true
                            }
                        }]
                    }
                }
            });
        }
    }, []);

    return (
        <div className={"analysisRoot"}>
            <div className={"chartContainer"}>
                <div className={"chart"}>
                    <canvas ref={chartRef}></canvas>
                </div>
            </div>
        </div>
    )
}
