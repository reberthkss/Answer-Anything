import React, {useEffect, useRef, useState} from "react";
import "./RegisterResearchCarousel.css"
import {STEPS} from "../../utils/Steps";
import {Card} from "@material-ui/core";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import {Research} from "../../utils/Data/ResearchData";
import {ResearchQuestionData} from "../../utils/Data/ResearchQuestionData";
import {generateInitialOptions, OptionState, QuestionsState, StepTwo} from "./StepTwo";
import {store} from "../../redux/ConfigureStore";
import {ResearchStatus} from "../../utils/Data/ResearchStatus";
import {FirestoreManager} from "../../utils/Services/FirebaseManager/FirestoreManager";
import {ShareResearch} from "./ShareResearch";
import {Loading} from "../AnimatedComponents/Loading/Loading";
import {FormTextField} from "../../Form/TextField/FormTextField";
import {useTranslation} from "react-i18next";
import {useLocation, useParams} from "react-router-dom";

interface LoadingState {
    loading: boolean,
    result: boolean
}

const initialQuestionsState = [
    {index: 0, question: null, options: generateInitialOptions(0)}
]

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
    const [questions, saveQuestions] = useState<QuestionsState[]>(initialQuestionsState);
    const [error, setError] = useState<boolean>(false);
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
    }, [location])


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

    const _fieldsAreValid = (): boolean => {
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

    const _stepTwoFieldsAreValid = (questions: QuestionsState[] | null): boolean => {
        let isValid = true;
        if (questions) {
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
        } else {
            isValid = false;
        }

        return isValid;
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

    const _renderStepTwo = () => {
        return (
            <StepTwo
                error={error}
                onGetQuestions={(questions) => saveQuestions(questions)}
                savedQuestions={questions}
                nextButtonRef={nextRef}
            />
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
            );
        research.roles = getRoles();
        research.status = ResearchStatus.OPEN;
        const response = await firestoreManager.write(research, id);
        return response.result;
    }


    const _increaseStep = () => {
        setError(false);
        switch (actualStep) {
            case STEPS.ONE:
                if (_fieldsAreValid()) {
                    setStep(actualStep + 1);
                } else {
                    setError(true)
                }
                break;
            case STEPS.TWO:
                if (_stepTwoFieldsAreValid(questions)) {
                    _handleSavingQuestion(research).then((res) => {
                        if (res) {
                            setStep(actualStep + 1);
                        }
                    })
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
        return success;
    }

    return (
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
    )
}
