import React, {useState} from "react";
import "./AnswerQuestion.css";
import {ResearchQuestionData} from "../../utils/Data/ResearchQuestionData";
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import {IconButton} from "@material-ui/core";
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Scrollbar from "react-scrollbars-custom";
import {UserData} from "./AnswerResearchCarousel";

interface AnswerQuestionProps {
    questions: ResearchQuestionData[],
    onFinishAnswerQuestion: () => Promise<void>,
    onAnswerQuestion: (question: ResearchQuestionData, selectedOption: number) => Promise<void>,
    userData: UserData
}

export const AnswerQuestion = ({questions, onFinishAnswerQuestion, onAnswerQuestion, userData}: AnswerQuestionProps) => {
    const [currentQuestion, setCurrentQuestion] = useState<number>(0);

    if (questions[currentQuestion].id === null) throw new Error("Question is null");
    if (questions[currentQuestion].options === null) throw new Error("None options are available");

    const goBackClick = async () => {
        console.log("go back clicked!");
        if (currentQuestion === 0) {
            throw new Error("Already in the first question")
        } else {

            setCurrentQuestion(currentQuestion-1);
        }
    }

    const goBackIsDisabled = () => {
        return currentQuestion === 0;
    }

    const goNextClick = () => {
        if (currentQuestion === questions.length-1) {
            throw new Error("Already in the last question");
        } else {
            setCurrentQuestion(currentQuestion+1);
        }
    }

    const goNextIsDisabled = () => {
        return currentQuestion === questions.length-1;
    }

    const handleOptionSelect = async (selectedOptionIndex: number) => {
        if (selectedOptionIndex < 0 || selectedOptionIndex > questions[currentQuestion].options!!.size + 1) {
            throw new Error("Selected options doesn't exists");
        } else {
            /*Save locally on component, then save globally (onAnswerQuestion) and make async call
            * to save on firebase
            * */
            questions[currentQuestion].selectedOption = selectedOptionIndex;
            await onAnswerQuestion(questions[currentQuestion], selectedOptionIndex);
            if (currentQuestion === questions.length - 1) {
                await onFinishAnswerQuestion();
            } else {
                setCurrentQuestion(currentQuestion + 1);
            }
        }
    }

    const GetOptions = () => {
       return Array.from(questions[currentQuestion].options!!).map((item, index) => {
           return (
               <div className={"answerQuestionOption"} style={{borderRadius: 5}} onClick={() => handleOptionSelect(index)}>
                    {item[index]}
                </div>
            )
        })

    }
    return (
        <div className={"questionRootContainer"}>
            <div className={"headerContainer"}>
                Pergunta {parseInt(questions[currentQuestion].id!!) + 1}
            </div>
            <div className={"questionsContainer"}>
                <div className={"answerQuestionGoBackContainer"}>
                    <IconButton
                        onClick={goBackClick}
                        disabled={goBackIsDisabled()}
                    >
                        <ChevronLeftIcon fontSize={"large"}/>
                    </IconButton>
                </div>
                <div className={"answerQuestionContentContainer"}>
                    <div className={"answerQuestionTitleContainer"}>
                        {userData.name + ', ' + questions[currentQuestion].question}
                    </div>
                    <div className={"answerQuestionOptionsContainer"}>
                        <Scrollbar className={"scrollBar"}>
                            {GetOptions()}
                        </Scrollbar>
                    </div>
                </div>
                <div className={"answerQuestionGoNextContainer"}>
                   <IconButton
                       onClick={goNextClick}
                       disabled={goNextIsDisabled()}
                   >
                       <ChevronRightIcon fontSize={"large"}/>
                   </IconButton>
                </div>
            </div>
        </div>
    )
}
