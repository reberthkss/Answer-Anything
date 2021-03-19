import React, {useEffect, useState} from "react";
import ComputedAnswersChartConverters from "../../../utils/ChartConverters/ComputedAnswersChartConverters";
import {useHistory, useParams, useRouteMatch} from "react-router-dom";
import {useSelector} from "react-redux";
import {ReduxState} from "../../../redux/reducer";
import {ChartWrapper} from "../../../Components/Chart/ChartWrapper";
import {Typography} from "@material-ui/core";
import ResearchCard from "../../../Components/ResearchCard/ResearchCard";
import Masonry from "react-masonry-css";
import "./Analysis.css"
import ResearchCardManager from "../../../utils/Managers/ResearchCardManager/ResearchCardManager";
import ComputedAnswersManager from "../../../utils/Managers/ComputedAnswersManager/ComputedAnswersManager";
import {useTranslation} from "react-i18next";
const Analysis = () => {
    const {t} = useTranslation();
    const routeProps = useParams();
    const history = useHistory();
    // @ts-ignore
    if (!routeProps.id) history.replace("/404-not-found");
    // @ts-ignore
    const research = useSelector((state: ReduxState) => state.researchs.find((research) => research.researchId == routeProps.id));
    if (!research) history.replace("/404-not-found");
    const [researchCardManager] = useState(new ResearchCardManager(research!!.researchId));
    const [computedResearchManager] = useState(new ComputedAnswersManager(research!!.researchId));
    useEffect(() => {
        researchCardManager.subscribe();
        computedResearchManager.subscribe();
        return () => {
            researchCardManager.unsubscribe();
            computedResearchManager.unsubscribe();
        }
    }, [researchCardManager, computedResearchManager]);
    const renderNoDataAvailable = () => {
        return (
            <div className={"research-card-no-available-data-container"}>
                <Typography align={"center"} variant={"h2"}>
                    {t("no_available_data")}
                </Typography>
            </div>
        )
    }

    if (research?.computedAnswers) {
    const chartManager = new ComputedAnswersChartConverters(research!!.computedAnswers!!, research!!.research);
        return (
            <Masonry
                breakpointCols={{
                    default: 3,
                    375: 1,
                    414: 1,
                    768: 2,
                    800: 2
                }}
                className="analysis-masonry-grid-container"
                columnClassName="analysis-masonry-grid-column-container">
                {chartManager.chartData.map((data) => {
                    return (
                        <ChartWrapper data={data.data} backgroundColors={data.backgroundColors} labels={data.labels} title={data.title} type={"bar"}/>
                    )
                })}
            </Masonry>
        )
    } else {
        return renderNoDataAvailable();
    }
}

export default Analysis;
