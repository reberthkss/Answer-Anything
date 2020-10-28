import React, {createRef, useRef, useState} from "react";
import "./RegisterResearchCarousel.css"
import {STEPS} from "../../utils/Steps";
import {Card} from "@material-ui/core";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import TextField from "@material-ui/core/TextField";
import {Research} from "../../utils/Data/ResearchData";
import {ResearchQuestionData} from "../../utils/Data/ResearchQuestionData";
import {OptionState, QuestionsState, StepTwo} from "./StepTwo";
import {store} from "../../redux/ConfigureStore";
import {ResearchStatus} from "../../utils/Data/ResearchStatus";
import {FirestoreManager} from "../../utils/Services/FirebaseManager/FirestoreManager";
import {ShareResearch} from "./ShareResearch";
import { Loading } from "../AnimatedComponents/Loading/Loading";

interface LoadingState {
    loading: boolean,
    result: boolean
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
    const [actualStep, setStep] = useState(STEPS.THREE);
    const [questions, saveQuestions] = useState<QuestionsState[] | null>(null);
    const [error, setError] = useState<boolean>(false);
    const research: Research = useRef(new Research()).current;
    const firestoreManager = new FirestoreManager();

    const _decreaseStep = () => setStep(actualStep-1);

    const _renderBackStep = () => {
        if (actualStep === STEPS.ONE || loading.loading) {
            return (
                <div />
            )
        } else {
            return (
                <div className={"previousStep"} onClick={_decreaseStep}>
                    <ChevronLeftIcon fontSize={"large"}/>
                    Back {/*TODO - i18n*/}
                </div>
            )
        }
    }

    const _renderErrorByEmptyTextField = (message: string, field: string | null) => {
        if (error && (field === null || field === "")) {
            return (
                <div className={"spanErrorContainer"}>
                    <span className={"spanError"}>
                        Erro: O campo referente ao {message} deve estar preenchido. {/*TODO - i18n*/}
                    </span>
                </div>
            )
        } else {
            return (<div/>)
        }
    }

    const _fieldsAreValid = (fields: (string | null)[]): boolean => {
        let isValid = true;
        fields.forEach((field) => field == null || field === "" ? isValid = false : null)
        return isValid;
    }

    const _stepTwoFieldsAreValid = (questions: QuestionsState[]): boolean => {
        let isValid = true;
        questions.forEach((question) => {
            if (question.question == null || question.question === "") {
                isValid = false;
            }
            question.options.forEach((option) => {
                if (option.payload == null) {
                    isValid = false;
                }
            })
        })
        return isValid;
    }

    const _renderNextStep = () => {
        if (actualStep === STEPS.THREE) {
            return (
                <div/>
            )
        } else {
            return (
                <div className={"nextStep"} onClick={_increaseStep} >
                    Next {/*TODO - i18n*/}
                    <ChevronRightIcon fontSize={"large"}/>
                </div>
            )
        }
    }

    const _renderStepOne = () => {
        return (<div className={"stepOneDiv"}>
            <div className={"textField"}>
                <TextField
                    placeholder={"Titulo"}
                    fullWidth
                    onChange={(event) => research.title = event.target.value}
                    defaultValue={research.title}
                />
                {_renderErrorByEmptyTextField("titulo", research.title)}
            </div>
            <div className={"textField"}>
                <TextField
                    placeholder={"Sub-titulo"}
                    fullWidth
                    onChange={(event) => research.subtitle = event.target.value}
                    defaultValue={research.subtitle}
                />
                {_renderErrorByEmptyTextField("sub-titulo", research.subtitle)}
            </div>
            <div className={"textField"}>
                <TextField
                    placeholder={"Descrição"}
                    fullWidth
                    multiline={true}
                    rows={4}
                    onChange={(event) => research.description = event.target.value}
                    defaultValue={research.description}
                />
                {_renderErrorByEmptyTextField("descrição", research.description)}
            </div>
        </div>)
    }

    const _renderStepTwo = () => {
        return (
            <StepTwo error={error} onGetQuestions={(questions) => saveQuestions(questions)} savedQuestions={questions}/>
        )
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
                    question.question,
                    mapOptions(question.options),
                    null
                )
            )
        research.roles = getRoles();
        research.status = ResearchStatus.OPEN;
        const response = await firestoreManager.write(research);
        return response.result;
    }

    const _increaseStep = () => {
        setError(false);
        switch (actualStep) {
            case STEPS.ONE:
                if (_fieldsAreValid([research.title, research.subtitle, research.description])) {
                    setStep(actualStep+1);
                } else {
                    setError(true)
                }
                break;
            case STEPS.TWO:
                if (_stepTwoFieldsAreValid(questions!!)) {
                    setStep(actualStep+1);
                    _handleSavingQuestion(research);
                } else {
                    setError(true);
                }
                break;
            case STEPS.THREE:
                break;
            default:
                break;
        }
    }

    const _renderAsFromStep = () => {
        switch (actualStep) {
            case STEPS.ONE:
                return _renderStepOne();
            case STEPS.TWO:
                return _renderStepTwo();
            case STEPS.THREE:
                /* todo check if is not null */
                /* Disable back and next button while saving*/
                /* Animation to indicates that is saving */
                /* Animation to indicates that successful saved */
                /* Animation to Indicates that failed saved */
                /* Share options */
                /* Show share options after successful save */
                /* Show try again button option after failed saved */
                if (loading.loading) {
                    return <Loading/>
                } else {
                    return _renderStepThree();
                }
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
    }

    return (
        <div className={"registerCarouselCard"}>
            <Card className={"card"} elevation={5} raised={true} >
                <div className={"header"}>
                    Informações {/*TODO - i18n*/}
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
    )
}
