import React, {useState} from "react";
import "./RegisterQuestions.css"
import {IconButton, Input, Tooltip} from "@material-ui/core";
import {ArrowBackIos, Delete, NavigateNext, Remove} from "@material-ui/icons";
import QuestionOptions from "./QuestionOptions";
import ColumnCommands from "./ColumnCommands";
import PostAddIcon from "@material-ui/icons/PostAdd";
import QuestionTitle from "./QuestionTitle";
import {useTranslation} from "react-i18next";

export interface OptionState {id: string, index: number, payload: string, isValid: boolean}

interface RegisterQuestionsProps {
    questions: QuestionsState[],
    onQuestionTitleUpdate: (questionId: number, newValue: string) => void,
    onQuestionOptionUpdate: (questionId: number, optionId: number, value: string) => void,
    addNewQuestion: (questionIndex: number) => void,
    removeQuestion: (questionIndex: number) => void,
    addNewOption: (questionId: number, optionId: number) => void,
    removeOption: (questionId: number, optionId: number) => void
}

export interface QuestionValue {
    value: string,
    isValid: boolean
}
export interface QuestionsState {
    index: number,
    question: QuestionValue,
    options: OptionState[]
}

const INITIAL_INDEX_QUESTION = 0;
const RegisterQuestions = ({questions, onQuestionOptionUpdate, onQuestionTitleUpdate, addNewOption, removeOption, addNewQuestion, removeQuestion}: RegisterQuestionsProps) => {
    const [currentQuestion, setCurrentQuestion] = useState<number>(INITIAL_INDEX_QUESTION);
    const {t} = useTranslation();
    const selectedQuestion = questions[currentQuestion];

    const goToNextQuestion = (currentQuestion: number) => {
        setCurrentQuestion(currentQuestion+1);
    }

    const goToPreviousQuestion = (currentQuestion: number) => {
        setCurrentQuestion(currentQuestion-1);
    }


    const goToPreviousQuestionsIsDisabled = (currentQuestion: number) => currentQuestion <= 0;
    const goToNextQuestionIsDisabled = (currentQuestion: number, totalQuestions: number) => currentQuestion+1 >= totalQuestions;
    const removeQuestionIsDisabled = (currentQuestion: number) => currentQuestion <= 0;
    const addNewQuestionIsDisabled = (currentQuestion: number) => currentQuestion >= 3;

    return (
       <div className={"register-questions-container"}>
           <ColumnCommands>
               <div>
                   <Tooltip title={() => t("previous_question")}>
                       <IconButton onClick={() => goToPreviousQuestion(currentQuestion)} disabled={goToPreviousQuestionsIsDisabled(currentQuestion)}>
                           <ArrowBackIos fontSize={"large"}/>
                       </IconButton>
                   </Tooltip>
                   <Tooltip title={() => t("remove_question")}>
                       <IconButton onClick={() => {
                           removeQuestion(currentQuestion);
                           setCurrentQuestion(currentQuestion-1);
                       }} disabled={removeQuestionIsDisabled(currentQuestion)}>
                           <Delete fontSize={"large"}/>
                       </IconButton>
                   </Tooltip>
               </div>
           </ColumnCommands>
           <div className={"question-content-container"}>
               <div className={"question-label-container"}>
                   <h2>{t("question_number", {questionNumber: currentQuestion+1})}</h2>
               </div>
               <div className={"question-title-container"}>
                   <QuestionTitle
                       questionId={selectedQuestion.index}
                       title={selectedQuestion.question.value}
                       hasError={!selectedQuestion.question.isValid}
                       onQuestionTitleUpdate={onQuestionTitleUpdate}/>
               </div>
               <div className={"question-options-container"}>
                   <QuestionOptions
                       questionId={selectedQuestion.index}
                       options={selectedQuestion.options}
                       onQuestionOptionUpdate={onQuestionOptionUpdate}
                       addNewOption={addNewOption}
                       removeOption={removeOption}/>
               </div>
           </div>
           <ColumnCommands>
               <div>
                   <Tooltip title={() => t("next_question")}>
                       <IconButton onClick={() => goToNextQuestion(currentQuestion)} disabled={goToNextQuestionIsDisabled(currentQuestion, questions.length)}>
                           <NavigateNext fontSize={"large"}/>
                       </IconButton>
                   </Tooltip>
                   <Tooltip title={() => t("add_question")}>
                       <IconButton onClick={() => {
                           addNewQuestion(currentQuestion);
                           setCurrentQuestion(currentQuestion+1);
                       }} disabled={addNewQuestionIsDisabled(currentQuestion)}>
                           <PostAddIcon fontSize={"large"}/>
                       </IconButton>
                   </Tooltip>
               </div>
           </ColumnCommands>
       </div>
    )
}

export default RegisterQuestions;
