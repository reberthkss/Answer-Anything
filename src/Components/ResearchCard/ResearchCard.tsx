import {ResearchProps} from "../../redux/reducer";
import {useEffect} from "react";
import ResearchCardManager from "../../utils/Managers/ResearchCardManager/ResearchCardManager";
import React from "react";
import "./ResearchCard.css"
interface ResearchCardProps {
    researchId: string,
    title: string
}

const ResearchCard = ({researchId, title}: ResearchCardProps) => {
    const researchCardManager = new ResearchCardManager(researchId);
    useEffect(() => {
        researchCardManager.setListener();
        return () => {
            researchCardManager.removeListener()
        }
    }, []);
    return (
        <div className={"research-card-root-container"}>

        </div>
    )
}

export default ResearchCard;
