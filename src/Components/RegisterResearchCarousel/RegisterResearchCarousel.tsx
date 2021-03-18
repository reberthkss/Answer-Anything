import React, {useEffect, useRef, useState} from "react";
import "./RegisterResearchCarousel.css"
import {STEPS} from "../../utils/Steps";
import {Card, Step, StepLabel, Stepper} from "@material-ui/core";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import {Research} from "../../utils/Data/ResearchData";
import {ResearchQuestionData} from "../../utils/Data/ResearchQuestionData";
import {store} from "../../redux/ConfigureStore";
import {ResearchStatus} from "../../utils/Data/ResearchStatus";
import {FirestoreManager} from "../../utils/Services/FirebaseManager/FirestoreManager";
import {ShareResearch} from "./ShareResearch";
import {Loading} from "../AnimatedComponents/Loading/Loading";
import {FormTextField} from "../../Form/TextField/FormTextField";
import {useTranslation} from "react-i18next";
import {useLocation, useParams} from "react-router-dom";
import RegisterQuestions, {OptionState, QuestionsState} from "./RegisterQuestions";

interface LoadingState {
    loading: boolean,
    result: boolean
}

export const generateInitialOptions = (question: number) => Array.from({length: 4}, (_, index) => ({id: `question-${question}-option-${index}`, index, payload: "", isValid: true}));

function getInitialQuestionState(questionIndex: number): QuestionsState[] {
    return  [{index: questionIndex, question: {value: "", isValid: true}, options: generateInitialOptions(questionIndex)}];
}

const mapOptions = (options: OptionState[]): Map<number, string> => {
    const optionsMap = new Map<number, string>();
    options
        .forEach((option) => optionsMap.set(option.index, option.payload!!));
    return optionsMap;
}

const getRoles = () => {
    const owner = store.getState().user?.user.id;
    const rolesMap = new Map<string, string>();
    rolesMap.set(`${owner}`, "owner");
    return rolesMap;
}


export const RegisterCarousel = () => {
    const [loading, setLoading] = useState<LoadingState>({loading: false, result: true});
    const [actualStep, setStep] = useState(STEPS.ONE);
    const [questions, setQuestions] = useState<QuestionsState[]>(getInitialQuestionState(0));
    const titleRef = useRef<HTMLDivElement | null>(null);
    const [titleError, setTitleError] = useState(false);
    const subTitleRef = useRef<HTMLDivElement | null>(null);
    const [subTitleError, setSubtitleError] = useState(false);
    const desRef = useRef<HTMLDivElement | null>(null);
    const [desError, setDesError] = useState(false);
    const nextRef = useRef<HTMLDivElement | null>(null);
    const [research, setResearch] = useState(new Research());
    const firestoreManager = new FirestoreManager();
    const {id}: any = useParams();
    const {t} = useTranslation();
    const location = useLocation();

    useEffect(() => {
        setStep(STEPS.ONE);
        setResearch(new Research());
        setQuestions(getInitialQuestionState(0));
    }, [location]);

    useEffect(() => {

    }, [questions])

    const _decreaseStep = () => setStep(actualStep - 1);

    const _renderBackStep = () => {
        if (actualStep === STEPS.ONE || loading.loading) {
            return (
                <div/>
            )
        } else {
            return (
                <div className={"previousStep"} onClick={_decreaseStep}>
                    <ChevronLeftIcon fontSize={"large"}/>
                    {t("go_back")}
                </div>
            )
        }
    }

    const researchInfoIsValid = (): boolean => {
        if (research.title?.length == 0 || research.subtitle == null) {
            setTitleError(true);
        }
        if (research.subtitle?.length == 0 || research.subtitle == null) {
            setSubtitleError(true)
        }
        if (research.description?.length == 0 || research.description == null) {
            setDesError(true);
        }
        if (research.title?.length == 0 || research.title == null) {
            return false;
        }
        if (research.subtitle?.length == 0) {
            return false;
        }
        if (research.description?.length == 0 || research.description == null) {
            return false;
        }
        return true;
    }

    const _renderNextStep = () => {
        if (actualStep === STEPS.THREE) {
            return (
                <div/>
            )
        } else {
            return (
                <div ref={nextRef} onKeyPress={() => {
                    _increaseStep()
                }} tabIndex={0} className={"nextStep"} onClick={_increaseStep}>
                   <span className={"nextStepText"}> {t("go_next")}</span>
                    <ChevronRightIcon fontSize={"large"}/>
                </div>
            )
        }
    }

    const _renderStepOne = () => {
        return (<div className={"stepOneDiv"}>
            <FormTextField
                getRef={() => titleRef}
                errorInField={titleError}
                field={"titulo"}
                title={"Titulo"}
                onChangeCallback={(title) => {
                    research.title = title;
                }}
                onKeyPressCallback={(keyPressed) => {
                    if (keyPressed == "Enter") {
                        if (subTitleRef != null) {
                            subTitleRef.current?.focus()
                        }
                    }
                }}
                isTextValidCallback={(text) => text != null && text.length >= 0}
                initialValue={research.title || ""}
                autofocus={true}
            />
            <FormTextField
                getRef={() => subTitleRef}
                errorInField={subTitleError}
                field={"sub-titulo"}
                title={"Sub-titulo"}
                onChangeCallback={(title) => {
                    research.subtitle = title;
                }}
                onKeyPressCallback={(keyPressed) => {
                    if (keyPressed == "Enter") {
                        desRef.current?.focus()
                    }
                }}
                isTextValidCallback={(text) => text != null && text.length != 0}
                initialValue={research.subtitle || ""}
            />
            <FormTextField
                getRef={() => desRef}
                errorInField={desError}
                field={"descrição"}
                title={"Descrição"}
                onChangeCallback={(title) => {
                    research.description = title;
                }}
                onKeyPressCallback={(keyPressed) => {
                    if (keyPressed == "Enter") {
                        nextRef.current?.focus();
                    }
                }}
                isTextValidCallback={(text) => text != null && text.length != 0}
                initialValue={research.description || ""}
            />
        </div>)
    }

    const _renderStepThree = () => {
        return (
            <ShareResearch/>
        )
    }

    const _saveQuestions = async (research: Research): Promise<boolean> => {
        research.questions = questions!!
            .map(
                (question) => new ResearchQuestionData(
                    question.index.toString(),
                    question.question.value,
                    mapOptions(question.options),
                    null
                )
            );
        research.roles = getRoles();
        research.status = ResearchStatus.OPEN;
        const response = await firestoreManager.write(research, id);
        return response.result;
    }




    const onQuestionOptionUpdate = (questionIndex: number,  optionIndex: number, newValue: string) => {
        const targetQuestion = questions.find((question) => question.index == questionIndex);
        const newQuestions = questions.filter((question) => question.index != questionIndex);
        if (targetQuestion) {
            targetQuestion.options[optionIndex].payload = newValue;
            targetQuestion.options[optionIndex].isValid = newValue != "";
            newQuestions.push(targetQuestion);
            newQuestions.sort((questionA, questionB) => questionA.index - questionB.index);
            setQuestions(newQuestions);
        }
    }

    const addNewOption = (questionIndex: number, optionId: number) => {
        const targetQuestion = questions.find((question) => question.index == questionIndex);
        const newQuestions = questions.filter((question) => question.index != questionIndex);
        if (targetQuestion) {
            const options = [...targetQuestion.options];
            options.push({id: `question-${questionIndex}-option-${options.length}`, index: options.length, payload: "", isValid: true});
            for (let i = options.length - 1 ; i > optionId + 1 ; i--) {
                options[i] = options[i-1];
                options[i].index = i;
                options[i].id = `question-${questionIndex}-option-${i}`;
            }
            options[optionId+1] = {id: `question-${questionIndex}-option-${optionId+1}`, index: optionId + 1, payload: "", isValid: true};
            targetQuestion.options = options;
            newQuestions[questionIndex] = targetQuestion;
            setQuestions(newQuestions);
        }
    }

    const removeOption = (questionIndex: number, optionIndex: number) => {
        const targetQuestion = questions.find((question) => question.index == questionIndex);
        const newQuestions = questions.filter((question) => question.index != questionIndex);
        if (targetQuestion) {
            const options = targetQuestion.options;
            const newOptions = options.filter((option) => option.index != optionIndex);
            newOptions.forEach((option, index) =>{
                option.id = `question-${questionIndex}-option-${index}`;
                option.index = index;
            })
            targetQuestion.options = newOptions;
            // newQuestions[questionIndex] = targetQuestion;
            newQuestions.push(targetQuestion);
            newQuestions.sort((questionA, questionB) => questionA.index - questionB.index);
            setQuestions(newQuestions)
        }
    }

    const addNewQuestion = (questionIndex: number) => {
        const newQuestions = [...questions];
        newQuestions.push(getInitialQuestionState(newQuestions.length)[0]);
        for (let questionId = newQuestions.length - 1 ; questionId > (questionIndex + 1); questionId--) {
            newQuestions[questionId] = newQuestions[questionId-1];
            newQuestions[questionId].index++;
            newQuestions[questionId].options.forEach((option, index) => {
                option.id = `question-${questionId}-option-${index}`;
            })
        }
        newQuestions[questionIndex+1] = getInitialQuestionState(questionIndex+1)[0];
        setQuestions(newQuestions);
    }

    const removeQuestion = (questionIndex: number) => {
        const targetQuestion = questions.find((question) => question.index == questionIndex);
        const newQuestions = questions.filter((question) => question.index != questionIndex);
        if (targetQuestion) {
            for (let questionId = 0 ; questionId < newQuestions.length ; questionId++) {
                newQuestions[questionId].index = questionId;
                newQuestions[questionId].options.forEach((option, index) => {
                    option.id = `question-${questionId}-option-${index}`;
                })
            }
            setQuestions(newQuestions);
        }
    }

    const onQuestionTitleUpdate = (questionIndex: number, newValue: string) => {
        const newQuestions = [...questions];
        newQuestions[questionIndex].question.value = newValue;
        newQuestions[questionIndex].question.isValid = newValue != "";
        setQuestions(newQuestions);
    }

    const questionsAreValid = (questions: QuestionsState[]) => {
        let isValid = true;
        questions.forEach((question) => {
            if (!question.question.isValid || question.question.value == "") {
                isValid = false;
                return false;
            }
            question.options.forEach((option) => {
                if (!option.isValid || option.payload == "") {
                    isValid = false;
                    return false;
                }
            })
        });
        return isValid;
    }

    const triggerAlertError = (questions: QuestionsState[]) => {
        const newQuestions = [...questions];
        newQuestions.forEach((question) => {
            if (question.question.value == "") question.question.isValid = false;
            question.options.forEach((option) => {
                if (option.payload == "") option.isValid = false;
            })
        })
        setQuestions(newQuestions);
    }

    const _renderAsFromStep = () => {
        switch (actualStep) {
            case STEPS.ONE:
                return _renderStepOne();
            case STEPS.TWO:
                return (<RegisterQuestions
                    addNewQuestion={addNewQuestion}
                    removeQuestion={removeQuestion}
                    addNewOption={addNewOption}
                    removeOption={removeOption}
                    questions={questions}
                    onQuestionOptionUpdate={onQuestionOptionUpdate}
                    onQuestionTitleUpdate={onQuestionTitleUpdate}
                    />)
            case STEPS.THREE:
                if (loading.loading) {
                    return <Loading/>
                } else {
                    return _renderStepThree();
                }
            default:
                break;
        }
    }

    const _increaseStep = () => {
        switch (actualStep) {
            case STEPS.ONE:
                if (researchInfoIsValid()) {
                    setStep(actualStep + 1);
                }
                break;
            case STEPS.TWO:
                if (questionsAreValid(questions)) {
                    _handleSavingQuestion(research).then((res) => {
                        if (res) {
                            setStep(actualStep + 1);
                        }
                    })
                } else {
                    triggerAlertError(questions);
                }
                break;
            case STEPS.THREE:
                break;
            default:
                break;
        }
    }

    const _handleSavingQuestion = async (research: Research) => {
        /* todo - check if that questions is already saved */
        setLoading({loading: true, result: false});
        /* Start saving animation */
        const success = await _saveQuestions(research);
        /* Stop saving animation */
        if (success) {
            /* Start finish animation */
            /* On end animation show share component */
            setLoading({loading: false, result: true});
        } else {
            /* Start end animation*/
            /* On end animation show try again  component */
            setLoading({loading: false, result: false});
        }
        return success;
    }

    return (
        <div className={"register-carousel-container"}>
            <div className={"stepper-container"}>
                <Stepper activeStep={actualStep} alternativeLabel className={"stepper"} >
                    <Step>
                        <StepLabel>
                            Dê um nome e uma descrição a sua pesquisa 🤔
                        </StepLabel>
                    </Step>
                    <Step>
                        <StepLabel >
                            Liste as perguntas que você tenha em mente 📝
                        </StepLabel>
                    </Step>
                    <Step>
                        <StepLabel>
                            Pesquisa criada! Go survey! 🤩
                        </StepLabel>
                    </Step>
                </Stepper>
            </div>
            <div className={"registerCarouselCard"}>
                <Card className={"card"} elevation={5} raised={true}>
                    <div className={"header"}>
                        {t("information")}
                    </div>
                    <div className={"contentDiv"}>
                        {_renderAsFromStep()}
                    </div>
                    <div className={"optionsDiv"}>
                        {_renderBackStep()}
                        {_renderNextStep()}
                    </div>
                </Card>
            </div>
        </div>
    )
}
