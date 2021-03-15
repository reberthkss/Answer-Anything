import {ReduxState} from "../../redux/reducer";
import {useEffect} from "react";
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
interface ResearchCardProps {
    researchId: string,
    title: string,
    height: number
}

const ResearchCard = ({researchId, title, height}: ResearchCardProps) => {
    const researchCardManager = new ResearchCardManager(researchId);
    const computedResearchManager = new ComputedAnswersManager(researchId);
    const research = useSelector((state: ReduxState) => state.researchs.find((research) => research.researchId == researchId));
    if (!research) throw  Error("Research not found!");
    useEffect(() => {
        researchCardManager.subscribe();
        computedResearchManager.subscribe();
        return () => {
            researchCardManager.unsubscribe();
            computedResearchManager.unsubscribe();
        }
    }, []);

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
                    <Button color={"primary"} size={"large"}>
                        Ver mais
                    </Button>
                </CardActions>
            </Card>
        </div>
    )
}

export default ResearchCard;
