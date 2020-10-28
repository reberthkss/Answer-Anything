import React, {useState} from "react";
import "./ReadResearchCarousel.css"
import Card from "@material-ui/core/Card";
import { useParams } from "react-router-dom";
import {generateFakeData} from "../../utils/Data/FakeResearchData";
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import firebase from "firebase";

export const ReadResearchCarousel = () => {

    /* TODO - Get research from redux */
    const {id} = useParams();
    const fakeData = generateFakeData(firebase.auth().currentUser?.uid);
    const research = fakeData.filter((item: any) => item.id === id);
    const [questionId, setQuestion] = useState(0);
    const _renderTitle = () => {
        return (
            <div className={"header"}>
                {research[0].id} - {research[0].title}
            </div>
        )
    }

    const _renderQuestion = () => {
        return (
            <div className={"question"}>
                {research[0].questions[questionId].question}
            </div>
        )
    }

    const _renderOptions = () => {
        /*TODO - Refactor this*/
       const optionsMap: any = research[0]
           .questions[questionId]
           .options;
       const optionsArray: string[] = [];
       for (const option in optionsMap) {
           const value = optionsMap[option];
           optionsArray.push(value);
       }
       return <div className={"optionsContainer"}>
           {optionsArray.map((option) => (
               <div className={"option"}>
                   <div>
                       {option}
                   </div>
                   <div>
                       67% {/* TODO  -  GET REAL DATA*/}
                   </div>
               </div>
           ))}
       </div>
    }

    const _renderLeftArrow = () => {
        if (questionId != 0 ) {
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
        if (questionId != research[0].questions.length-1) {
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
        return (
            <div className={"dotsContainer"}>
                {
                    research[0]
                        .questions
                        .map((question) =>
                            (<FiberManualRecordIcon
                                fontSize={question.id == questionId.toString() ? "default" : "small"}
                                style={
                                    {color: question.id == questionId.toString() ? "grey" : "black"}
                                }/>))
                }
            </div>
        )
    }
    return (
        <div className={"researchDetailContainer"}>
            <div className={"researchCarouselContainer"}>
                <Card className={"researchCardContainer"} elevation={5}>
                    {_renderTitle()}
                    <div className={"questionContainer"}>
                        {_renderLeftArrow()}
                        <div className={"rootViewContainerResearchCarousel"}>
                            {_renderQuestion()}
                            {_renderOptions()}
                        </div>
                        {_renderRightArrow()}
                    </div>
                    {_renderDots()}
                </Card>
            </div>
        </div>
    )
}
