import React, {MutableRefObject, useEffect, useRef, useState} from "react";
import {IconButton} from "@material-ui/core";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import DeleteIcon from "@material-ui/icons/Delete";
import TextField from "@material-ui/core/TextField";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import PostAddIcon from "@material-ui/icons/PostAdd";
import "./StepTwo.css"
import Tooltip from "@material-ui/core/Tooltip";
import {NewOption} from "../NewOption/NewOption";
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Scrollbar from "react-scrollbars-custom";
import {FormTextField} from "../../Form/TextField/FormTextField";
import {useTranslation} from "react-i18next";

interface StepTwoProps {
    error: boolean,
    onGetQuestions: (questions: QuestionsState[] | null) => void,
    nextButtonRef: MutableRefObject<HTMLDivElement | null>
    readonly savedQuestions: QuestionsState[]
}

export interface OptionState {id: string, index: number, payload: string | null}
export interface QuestionsState {
    index: number,
    question: string | null,
    options: OptionState[]
}
export const generateInitialOptions = (question: number) => Array.from({length: 4}, (_, index) => ({id: `question-${question}-option-${index}`, index, payload: null}));

/* Considerações:
*
*   As questões que estão sendo passadas para o StepTwo podem ser armazenadas no redux
*   Possivelmente muitos métodos aqui podem virar hooks
*
* */


export const StepTwo = ({error, onGetQuestions, savedQuestions, nextButtonRef}: StepTwoProps) => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [hasErrorInQuestionTitle, setErrorInQuestionTitle] = useState(false);
    const [questionOptionsId, setQuestionOptionsId] = useState<string[]>([]);
    const [question, setQuestion] = useState<QuestionsState | null>(null);
    const [goBackButtonIsDisabled, setGoBackButtonVisibility] = useState<boolean>(true);
    const [deleteQuestionButtonIsDisabled, setDeleteButtonVisibility] = useState<boolean>(true);
    const [questionOptions, setQuestionOptions] = useState<OptionState[]>([]);
    const textFieldRef = useRef<HTMLDivElement | null>(null);
    const {t} = useTranslation();

    useEffect(() => {
        setQuestion(savedQuestions[currentQuestion]);
        setErrorInQuestionTitle(false);
        if (currentQuestion == 0) {
            setGoBackButtonVisibility(true);
            setDeleteButtonVisibility(true);
        } else {
            setGoBackButtonVisibility(false);
            setDeleteButtonVisibility(false);
        }
    }, [currentQuestion]);

    useEffect(() => {
        if (question != null) {
            setQuestionOptions(question.options);
        }
    }, [question])

    const _goBackToPreviousQuestion = () => {
        setCurrentQuestion(currentQuestion - 1);
    }

    const _renderGoBackToPreviousQuestionButton = () => {
        return (
            <div>
                <IconButton aria-label="goBack"  onClick={_goBackToPreviousQuestion} disabled={goBackButtonIsDisabled}>
                    <ChevronLeftIcon fontSize={"large"}/>
                </IconButton>
            </div>
        )
    }

    const _renderErrorSpanByEmptyField = (message: string, field: string | null) => {
        if (error && (field == null || field === "")) {
            return (
                <div className={"spanErrorDiv"}>
                    <span className={"spanError"}>
                        Erro: O campo referente a {message} deve estar preenchido! {/*TODO - i18n*/}
                    </span>
                </div>
            )
        } else {
            return (
                <div/>
            )
        }
    }

    const _removeQuestion = (cQuestion: number) => {
        if (cQuestion !== 0) {
            const newQuestions = [...savedQuestions];
            newQuestions.splice(currentQuestion, 1);
            setCurrentQuestion(cQuestion-1);
            onGetQuestions(newQuestions);
        }
    }

    const _renderDeleteQuestionButton = () => {
        return (
            <div>
                <IconButton
                    aria-label={"delete"}
                    onClick={() => _removeQuestion(currentQuestion)}
                    disabled={deleteQuestionButtonIsDisabled}>
                    <DeleteIcon fontSize={"default"}/>
                </IconButton>
            </div>
        )
    }

    const _registerNewQuestionIsDisabled = (): boolean => {
        /* TODO - Add a limit to new questions.
        *   Freemium users => max 3 questions
        *   Premium users => unlimited questions
        * */
        return false;
    }

    const _updateOptionValue = (questionIndex: number, value: string, index: number) => {
       questionOptions[index].payload = value;
    }

    const _deleteOption = (id: string) => {
        setQuestionOptions(questionOptions.filter((option) => option.id != id));
    }

    const renderQuestionOptions = () => {
        if (questionOptions.length > 0) {
            return (
                questionOptions.map((option) => {
                        return (
                            <div>
                                <NewOption
                                    id={option.id}
                                    value={option.payload}
                                    onDeleteOption={() => _deleteOption(option.id)}
                                    onUpdateValue={(value) => _updateOptionValue(currentQuestion, value, option.index)}
                                    onKeyPressed={(id, key) => {
                                        if (key == "Enter") {
                                            const indexOfCurrentField = questionOptions.findIndex((option) => option.id == id);
                                            if (indexOfCurrentField != -1) {
                                                const indexOfNextField = indexOfCurrentField+1;
                                                if (indexOfNextField < questionOptions.length) {
                                                    const nodeReference = document.getElementById(questionOptions[indexOfNextField].id);
                                                    if(nodeReference != null) {
                                                        nodeReference.focus();
                                                    }
                                                } else {
                                                    const indexOfTargetQuestion = savedQuestions.findIndex((savedQuestion) => savedQuestion.index == question?.index);
                                                    if (indexOfTargetQuestion != -1) {
                                                        savedQuestions[indexOfTargetQuestion].options = question!!.options;
                                                        savedQuestions[indexOfTargetQuestion].question = question!!.question;
                                                    }
                                                    // nextButtonRef.current?.focus();
                                                    onGetQuestions(savedQuestions);
                                                }
                                            }
                                        }
                                    }}
                                />
                                {_renderErrorSpanByEmptyField("opção", option.payload)}
                            </div>
                        )
                    }
                )
            )
        } else {
            return null;
        }
    }

    const _renderOptions = () => {
        return (
            <div className={"questionOptionsDiv"}>
                <Scrollbar id={"scrollbar-options"} className={"scrollBar"}>
                    {renderQuestionOptions()}
                </Scrollbar>
            </div>
        )
    }

    const _addNewOption = (question: QuestionsState) => {
        const lastQuestion = question.options.reduce((optionA, optionB) => optionA.index > optionB.index ? optionA : optionB);
        const index = lastQuestion.index + 1;
        const newOption = {id: `question-${question.index}-option-${index}`, index , payload: null};
        setQuestionOptions([...questionOptions, newOption]);
    }

    const _renderAddNewOption = (currentQuestion: number) => {
        const question: QuestionsState = savedQuestions[currentQuestion];
        return (
            <div className={"addNewOptionDiv"}>
                <div className={"addNewOption"} onClick={() => _addNewOption(question)}>
                    <AddCircleOutlineIcon/>
                    {t("new_option")}
                </div>
            </div>
        )
    }

    const _renderNewQuestionContent = () => {
        return (
            <div className={"questionDiv"}>
                <div className={"questionDetailDiv"}>
                    <div className={"questionNumber"}>
                        Questão {currentQuestion+1} {/*TODO - i18n*/}
                    </div>
                    <div className={"questionTitle"}>
                        <FormTextField
                            field={t("the_question")}
                            title={t("which_question")}
                            onChangeCallback={(text) => {
                                if (question != null) {
                                    question.question = text;

                                }
                                if (text.length > 0) {
                                    setErrorInQuestionTitle(false);
                                } else {
                                    setErrorInQuestionTitle(true);
                                }
                            }}
                            onKeyPressCallback={(keyPressed) => {
                                if (keyPressed == "Enter") {
                                    const optionNodeReference = document.getElementById(questionOptions[0].id);
                                    if (optionNodeReference != null) {
                                        optionNodeReference.focus();
                                    }
                                }
                            }}
                            isTextValidCallback={(text) => text != null && text.length > 0}
                            getRef={() => textFieldRef}
                            errorInField={hasErrorInQuestionTitle}
                            initialValue={question?.question || ""}
                            autofocus={true}
                        />
                    </div>
                    <div className={"questionOptions"}>
                        {_renderOptions()}
                    </div>
                    <div>
                        {_renderAddNewOption(currentQuestion)}
                    </div>
                </div>
            </div>
        )
    }

    const _renderNextQuestionButton = () => {
        return (
            <div>
                <IconButton aria-label={"next"} onClick={_showNextQuestion} disabled={_nextButtonIsDisabled()} >
                    <ChevronRightIcon fontSize={"large"}/>
                </IconButton>
            </div>
        )
    }

    const _showNextQuestion = () => {
        const indexOfQuestion = savedQuestions.findIndex((savedQuestion) => savedQuestion.index == question?.index);
        if (indexOfQuestion != -1) {
            savedQuestions[indexOfQuestion].question = question!!.question;
            savedQuestions[indexOfQuestion].options = question!!.options;
        }
        setCurrentQuestion(currentQuestion + 1);
    }

    const _nextButtonIsDisabled = (): boolean => {
        if (currentQuestion === (savedQuestions.length-1)) {
            return true;
        } else {
            return false;
        }
    }

    const _generateNewQuestion = () => {
        if (textFieldRef.current != null) {
            const length = savedQuestions.length;
            const targetQuestion = savedQuestions.findIndex((savedQuestion) => savedQuestion.index == question?.index);

            if(targetQuestion != -1) {
                savedQuestions[targetQuestion].question = question!!.question;
                savedQuestions[targetQuestion].options = question!!.options;
            }
            onGetQuestions([...savedQuestions,
                {
                    index: length,
                    question: null,
                    options: generateInitialOptions(length)
                }
            ]);
            setCurrentQuestion(length);
        } else {
            /* Show error */
        }
    }

    const _renderNewQuestion = () => {
        return (
            <div>
                <Tooltip title={t("new_question").toString()}>
                    <IconButton
                        aria-label={"newQuestions"}
                        onClick={_generateNewQuestion}
                        disabled={_registerNewQuestionIsDisabled()}
                    >
                        <PostAddIcon fontSize={"default"}/>
                    </IconButton>
                </Tooltip>
            </div>
        )
    }


    return (
        <div className={"stepTwoDiv"}>
            <div className={"columnOptions"}>
                {_renderGoBackToPreviousQuestionButton()}
                {_renderDeleteQuestionButton()}
            </div>
            <div className={"contentDiv"}>
                {_renderNewQuestionContent()}
            </div>
            <div className={"columnOptions"}>
                {_renderNextQuestionButton()}
                {_renderNewQuestion()}
            </div>
        </div>
    )
}


StepTwo.defaultProps = {
    savedQuestions: null,
    error: false,
    onGetQuestions: () => null
}
