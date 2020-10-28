import React, {useEffect, useRef, useState} from "react";
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

interface StepTwoProps {
    error: boolean,
    onGetQuestions: (questions: QuestionsState[] | null) => void,
    savedQuestions: QuestionsState[] | null
}

export interface OptionState {index: number, payload: string | null}
export interface QuestionsState {
    index: number,
    question: string | null,
    options: OptionState[]
}
const generateInitialOptions = () => Array.from({length: 4}, (_, index) => ({index, payload: null}));

const initialQuestionsState = [
    {index: 0, question: null, options: generateInitialOptions()}
]

/* Considerações:
*
*   As questões que estão sendo passadas para o StepTwo podem ser armazenadas no redux
*   Possivelmente muitos métodos aqui podem virar hooks
*
* */


export const StepTwo = ({error, onGetQuestions, savedQuestions}: StepTwoProps) => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [questions, setQuestions] = useState<QuestionsState[]>(savedQuestions ?? initialQuestionsState);

    const textFieldRef = useRef(null);
    const _goBackButtonIsDisabled = (): boolean => {
        if (currentQuestion === 0) {
            return true;
        } else {
            return false;
        }
    }

    const _goBackToPreviousQuestion = () => {
        setCurrentQuestion(currentQuestion - 1);
    }

    const _renderGoBackToPreviousQuestionButton = () => {
        return (
            <div>
                <IconButton aria-label="goBack"  onClick={_goBackToPreviousQuestion} disabled={_goBackButtonIsDisabled()}>
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

    const _deleteButtonIsDisabled = (): boolean => {
        if (questions.length === 1 || currentQuestion === 0) {
            return true;
        } else {
            return false;
        }
    }

    const _removeQuestion = (cQuestion: number) => {
        if (cQuestion !== 0) {
            questions.splice(cQuestion, 1);
            setCurrentQuestion(cQuestion-1);
            setQuestions(questions);
        }
    }

    const _renderDeleteQuestionButton = () => {
        return (
            <div>
                <IconButton
                    aria-label={"delete"}
                    onClick={() => _removeQuestion(currentQuestion)}
                    disabled={_deleteButtonIsDisabled()}>
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
        questions[questionIndex].options[index].payload = value;
        setQuestions(questions);
    }

    const _deleteOption = (currentQuestion: number, currentOption: number) => {
        const newQuestions = [...questions];
        const question = newQuestions.splice(currentQuestion, 1);
        question[0].options.splice(currentOption, 1);
        setQuestions([...newQuestions, question[0]]);
    }

    const _renderOptions = (currentQuestion: number) => {
        const question = questions[currentQuestion];
        return (
            <div className={"questionOptionsDiv"}>
                <Scrollbar className={"scrollBar"}>
                    {question.options.map((option, index) =>
                        <div>
                            <NewOption
                                key={`question-${currentQuestion}-option-${option.index}`}
                                value={questions[currentQuestion].options[index].payload}
                                onDeleteOption={() => _deleteOption(currentQuestion, index)}
                                onUpdateValue={(value) => _updateOptionValue(currentQuestion, value, index)}/>
                            {_renderErrorSpanByEmptyField("opção", questions[currentQuestion].options[index].payload)}
                        </div>)}
                </Scrollbar>
            </div>
        )
    }

    const _addNewOption = (question: QuestionsState) => {
        const lastQuestion = question.options.reduce((optionA, optionB) => optionA.index > optionB.index ? optionA : optionB);
        const newQuestionState: QuestionsState[] = questions.filter((question) => question.index !== currentQuestion);
        const newOption = {index: lastQuestion.index + 1, payload: null};
        setQuestions([...newQuestionState, {...question, options: [...question.options, newOption]}]);
    }

    const _renderAddNewOption = (currentQuestion: number) => {
        const question: QuestionsState = questions[currentQuestion];
        return (
            <div className={"addNewOptionDiv"}>
                <div className={"addNewOption"} onClick={() => _addNewOption(question)}>
                    <AddCircleOutlineIcon/>
                    Nova opção {/*TODO - i18n*/}
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
                        <TextField
                            fullWidth
                            inputRef={textFieldRef}
                            defaultValue={questions[currentQuestion].question}
                            onChange={(event) => questions[currentQuestion].question = event.target.value}
                            label={"Qual a pergunta?"}  />
                        {_renderErrorSpanByEmptyField("pergunta", questions[currentQuestion].question)}
                    </div>
                    <div className={"questionOptions"}>
                        {_renderOptions(currentQuestion)}
                        <div>
                            {_renderAddNewOption(currentQuestion)}
                        </div>
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
        setCurrentQuestion(currentQuestion + 1);
    }

    const _nextButtonIsDisabled = (): boolean => {
        if (currentQuestion === (questions.length-1)) {
            return true;
        } else {
            return false;
        }
    }

    const _generateNewQuestion = () => {
        // @ts-ignore
        textFieldRef.current != null && (textFieldRef.current!!.value = null);
        setCurrentQuestion(questions.length);
        setQuestions([...questions,
            {
                index:questions.length,
                question: "",
                options: generateInitialOptions()
            }
        ]);
    }

    const _renderNewQuestion = () => {
        return (
            <div>
                {/*I18N*/}
                <Tooltip title={"Nova questão"}>
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

    useEffect(() => {
        onGetQuestions(questions);
    }, [onGetQuestions, questions])
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
