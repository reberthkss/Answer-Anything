import React, {useEffect, useState} from "react";
import "./ReadResearchCarousel.css"
import Card from "@material-ui/core/Card";
import { useParams } from "react-router-dom";
import {generateFakeData} from "../../utils/Data/FakeResearchData";
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import firebase from "firebase";
import {ReduxState} from "../../redux/reducer";
import {useSelector} from "react-redux";
import {FirestoreManager} from "../../utils/Services/FirebaseManager/FirestoreManager";
import {AnswerResearchManager} from "../../utils/Services/AnswerResearchManager/AnswerResearchManager";
import { CircularProgress } from "@material-ui/core";

export const ReadResearchCarousel = () => {

    const {id} = useParams();
    const [loading, setLoading] = useState(true);
    const research = useSelector((state: ReduxState) => state.researchs).find((research) => research.id === id) || null;
    const [questionId, setQuestion] = useState(0);
    const answers = useSelector((state: ReduxState) => state.answersOfResearch);
    const _renderTitle = () => {
        if (!research) return null;

        return (
            <div className={"header"}>
               {research.research.title}
            </div>
        )
    }

    const _renderQuestion = () => {
        if (!research) return null;
        return (
            <div className={"question"}>
                {research.research.questions[questionId].question}
            </div>
        )
    }

    const _renderOptions = () => {
        if (research === null) return;
        return Array
            .from(research!!.research.questions[questionId].options!!.entries())
            .map((option) => {
                return (
                    <div className={"option"}>
                        <div>
                            {option[1][option[0]]}
                        </div>
                        <div>
                            67% {/*TODO - Handle*/}
                        </div>
                    </div>
                )
            })
    }

    const _renderLeftArrow = () => {
        if (questionId !== 0 ) {
            return (
                <div className={"arrow"}>
                    <ChevronLeftIcon
                        className={"arrowIcon"}
                        fontSize={"large"}
                        onClick={() => setQuestion(questionId - 1)}
                    />
                </div>
            )
        }
    }

    const _renderRightArrow = () => {
        if (!research) return null;
        if (questionId !== research.research.questions.length-1) {
            return (
                <div className={"arrow"}>
                    <ChevronRightIcon
                        className={"arrowIcon"}
                        fontSize={"large"}
                        onClick={() => setQuestion(questionId + 1)}
                    />
                </div>
            )
        }
    }

    const _renderDots = () => {
        if (!research) return null;

        return (
            <div className={"dotsContainer"}>
                {
                    research
                        .research
                        .questions
                        .map((question) =>
                            (<FiberManualRecordIcon
                                fontSize={question.id === questionId.toString() ? "default" : "small"}
                                style={
                                    {color: question.id === questionId.toString() ? "grey" : "black"}
                                }/>))
                }
            </div>
        )
    }


    const _loadAnswers = async (researchId: string) => {
        const answerResearchManager = new AnswerResearchManager();
        const response = await answerResearchManager.loadAnswersByResearch(researchId);
        if (response.result) {
            console.log("Successfull loaded answers");
        } else {
            /*TODO - Error*/
            console.log("Error")
        }
        setLoading(false);
    }

    useEffect(() => {
        _loadAnswers(id);
    }, [])

    const renderLoading = () => {
        return (
            <div className={"loading"}>
                <CircularProgress/>
            </div>
        )
    }

    const renderContent = () => {
        return (
            <div className={"researchDetailContainer"}>
                <div className={"researchCarouselContainer"}>
                    <Card className={"researchCardContainer"} elevation={5}>
                        {_renderTitle()}
                        <div className={"questionContainer"}>
                            {_renderLeftArrow()}
                            <div className={"rootViewContainerResearchCarousel"}>
                                {_renderQuestion()}
                                <div className={"optionsContainer"}>
                                    {_renderOptions()}
                                </div>
                            </div>
                            {_renderRightArrow()}
                        </div>
                        {_renderDots()}
                    </Card>
                </div>
            </div>
        )
    }

    if (loading) {
        return renderLoading();
    } else {
        return renderContent();
    }
}
