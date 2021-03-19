import {ReduxState} from "../../redux/reducer";
import {useEffect, useState} from "react";
import ResearchCardManager from "../../utils/Managers/ResearchCardManager/ResearchCardManager";
import React from "react";
import "./ResearchCard.css"
import {useSelector} from "react-redux";
import {
    Button,
    Card,
    CardActions,
    CardContent,
    Typography
} from "@material-ui/core";
import ComputedAnswersManager from "../../utils/Managers/ComputedAnswersManager/ComputedAnswersManager";
import ResearchCardChart from "./ResearchCardChart/ResearchCardChart";
import ResearchCardHeader from "./ResearchCardHeader/ResearchCardHeader";
import {useHistory, useRouteMatch} from "react-router-dom";
import {useTranslation} from "react-i18next";
interface ResearchCardProps {
    researchId: string
}

const ResearchCard = ({researchId}: ResearchCardProps) => {
    const [researchCardManager] = useState(new ResearchCardManager(researchId));
    const [computedResearchManager] = useState(new ComputedAnswersManager(researchId));
    const {t} = useTranslation();
    const research = useSelector((state: ReduxState) => state.researchs.find((research) => research.researchId == researchId));
    const history = useHistory();
    const match = useRouteMatch();
    if (!research) throw  Error("Research not found!");
    useEffect(() => {
        researchCardManager.subscribe();
        computedResearchManager.subscribe();
        return () => {
            researchCardManager.unsubscribe();
            computedResearchManager.unsubscribe();
        }
    }, [researchCardManager, computedResearchManager]);

    return (
        <div className={"research-card-root-container"}>
            <Card>
                <CardContent>
                    <ResearchCardChart research={research.research} computedAnswers={research.computedAnswers}/>
                </CardContent>
                <ResearchCardHeader title={research.research.title || ""} subtitle={research.research.subtitle || ""} researchId={research.researchId}/>
                <CardContent>
                    <Typography>
                        {research.research.description}
                    </Typography>
                </CardContent>
                <CardActions className={"card-actions-container"}>
                    <Button color={"primary"} size={"large"} onClick={() => history.push(`${match.url}/research/${researchId}`)}>
                        {t("research_card_see_more")}
                    </Button>
                </CardActions>
            </Card>
        </div>
    )
}

export default ResearchCard;
