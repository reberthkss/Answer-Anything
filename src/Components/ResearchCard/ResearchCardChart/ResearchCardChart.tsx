import {ComputedAnswers} from "../../../utils/Data/ComputedAnswers";
import {Card, Typography} from "@material-ui/core";
import React from "react";
import ComputedAnswersChartConverters from "../../../utils/ChartConverters/ComputedAnswersChartConverters";
import {ChartWrapper} from "../../Chart/ChartWrapper";
import {Research} from "../../../utils/Data/ResearchData";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import "./ResearchCardChart.css"
import {useTranslation} from "react-i18next";
interface ResearchCardChartProps {
    research: Research,
    computedAnswers: ComputedAnswers | null
}

const ResearchCardChart = ({research, computedAnswers}: ResearchCardChartProps) => {
    const {t} = useTranslation();
    const renderNoDataAvailable = () => {
        return (
            <div className={"research-card-no-available-data-container"}>
                <Typography  variant={"h5"} align={"center"}>
                    {t("no_available_data")}
                </Typography>
            </div>
        )
    }

    if (computedAnswers) {
        const chartConverter = new ComputedAnswersChartConverters(computedAnswers, research);
        if (chartConverter.chartData) {
            return <Carousel
                showThumbs={false}
                renderIndicator={((clickHandler, isSelected, index, label) => {
                    return (
                        <span
                            onClick={clickHandler}
                            style={{padding: 5,
                                margin: 5,
                                fontSize: 1,
                                borderRadius: 50,
                                color: "transparent",
                                backgroundColor: isSelected ? "#3F51B5" : "#000",
                                boxShadow: ""
                            }}>{index}</span>
                    )
                })}
                statusFormatter={((currentItem, total) => t("question_status_formatter", {currentItem, total}))}
                emulateTouch={true}
            >
                {chartConverter.chartData.map((data) => (
                    <div style={{paddingBottom: 25, backgroundColor: "white"}}>
                        <ChartWrapper data={data.data} backgroundColors={data.backgroundColors} labels={data.labels}
                                      title={data.title} type={"bar"}/>
                    </div>
                ))}
            </Carousel>
        } else {
            return renderNoDataAvailable();
        }
    } else {
        return renderNoDataAvailable();
    }
}

export default ResearchCardChart;
