import React from "react";
import "./SelectResearch.css"
import {useTranslation} from "react-i18next";
import {ReduxState} from "../../redux/reducer";
import {useSelector} from "react-redux";
import ResearchCard from "../ResearchCard/ResearchCard";
import Masonry from "react-masonry-css";

export const SelectResearch = () => {
    const {t} = useTranslation();
    const researchs = useSelector((state:ReduxState) => state.researchs);
    const renderContent = () => {
        if (researchs.length == 0) {
            return (<div className={"select-research-span-container"}>
                <span className={"select-research-span"}>{t("go_on_and_create_your_first_research")}</span>
            </div>);
        } else {
            return (
                <div className={"root"}>
                    <Masonry
                        breakpointCols={{
                            default: 3,
                            375: 1,
                            414: 1,
                            768: 2,
                            800: 2
                        }}
                        className="masonry-grid-container"
                        columnClassName="masonry-grid-column-container">
                        {researchs.map((research, index) => (
                            <ResearchCard researchId={research.researchId}/>
                        ))}
                    </Masonry>
                </div>
            )
        }
    }
    return renderContent();
}
