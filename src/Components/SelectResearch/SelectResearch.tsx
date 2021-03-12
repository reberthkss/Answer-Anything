import React, {useEffect} from "react";
import "./SelectResearch.css"
import { useTranslation, initReactI18next } from "react-i18next";
import {ReduxState} from "../../redux/reducer";
import {useSelector} from "react-redux";
import ResearchCard from "../ResearchCard/ResearchCard";

export const SelectResearch = () => {
    /* Create carroussel to questions */
    /* Like: step 1, step 2, step 3*/
    const {t} = useTranslation();
    const researchs = useSelector((state:ReduxState) => state.researchs);

    const renderContent = () => {
        if (researchs.length == 0) {
            return (<div className={"select-research-span-container"}>
                <span className={"select-research-span"}>t("select_research")</span>
            </div>);
        } else {
            return (
                <div className={"root"}>
                    {researchs.map((research) => (
                        <ResearchCard researchId={research.researchId}
                                      title={research.research.title || "Name not found"}/>
                    ))}
                </div>
            )
        }
    }
    return renderContent();
}
