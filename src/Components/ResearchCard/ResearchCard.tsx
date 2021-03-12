import {ReduxState, ResearchProps} from "../../redux/reducer";
import {useEffect} from "react";
import ResearchCardManager from "../../utils/Managers/ResearchCardManager/ResearchCardManager";
import React from "react";
import "./ResearchCard.css"
import {useSelector} from "react-redux";
import {Card, CardContent, CardHeader, IconButton, Typography} from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import ComputedAnswersManager from "../../utils/Managers/ComputedAnswersManager/ComputedAnswersManager";
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

    const renderChart = () => {
        if (research.computedAnswers) {
            const chartData = computedResearchManager.parseDataToChart({researchId: research.researchId, computedAnswers: research.computedAnswers});

        } else {
            return (
                <div className={"research-card-no-available-data-container"}>
                    <Typography>
                        No available data!
                    </Typography>
                </div>
            )
        }
    }

    return (
        <div className={"research-card-root-container"} style={{height: height}}>
            <Card>
                <CardHeader
                    title={research.research.title}
                    subheader={research.research.subtitle}
                    action={
                        <IconButton aria-label="settings">
                            <MoreVertIcon />
                        </IconButton>
                    }
                />
                <CardContent>
                    {renderChart()}
                </CardContent>
                <CardContent>
                    <Typography>
                        {research.research.description}
                    </Typography>
                </CardContent>

            </Card>
        </div>
    )
}

export default ResearchCard;
