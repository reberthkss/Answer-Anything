import React, {useState} from "react";
import "./AnswerResearchCarousel.css"
import {Card} from "@material-ui/core";
import {STEPS} from "../../utils/Steps";
import { Greeting } from "./Greeting";
import {AnswerQuestion} from "./AnswerQuestion";
import {Conclusion} from "./Conclusion";
import {Research} from "../../utils/Data/ResearchData";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import {ResearchQuestionData} from "../../utils/Data/ResearchQuestionData";
import {AnswerData} from "../../utils/Data/AnswerData";

interface AnswerResearchCarouselProps {
    research: Research,
    onGetSelectedOption: (question: ResearchQuestionData, selectedOption: number) => void
}

export interface UserData {email: string, name: string}

export const AnswerResearchCarousel = ({ research, onGetSelectedOption}: AnswerResearchCarouselProps) => {
    const [currentStep, setStep] = useState<number>(STEPS.ONE);
    const [userData, setUserData] = useState<UserData>({email: "", name: ""});

    const GetContent = () => {
        switch (currentStep) {
            case STEPS.ONE:
                return (
                    <Greeting
                        onGetEmail={(email: string) => setUserData({...userData, email})}
                        onGetName={(name: string) => setUserData({...userData, name})}
                        onStartQuestionnaire={() => {
                            /* TODO - start questionnaire (register a new answer with given user data) */
                            setStep(1);
                        }}
                        title={research.title!!}
                        description={research.description!!}/>
                )
            case STEPS.TWO:
                return (
                    <AnswerQuestion questions={research.questions}
                                    userData={userData}
                                    onFinishAnswerQuestion={() => setStep(STEPS.THREE)}
                                    onAnswerQuestion={onGetSelectedOption}
                    />
                )
            case STEPS.THREE:
                return (
                    <Conclusion/>
                )
            default:
                throw new Error("Step not found");
        }
    }

    const GetBackArrow = () => {
        if (currentStep === STEPS.ONE) return null;

        return (
            <div className={"backStepOption"} onClick={() => setStep(currentStep-1)}>
                <ChevronLeftIcon fontSize={"large"}/>
                Voltar {/*TODO - i18n*/}
            </div>
        )
    }

    const GetNextArrow = () => {
        let  allResearchsIsAnswered = 1;
        research.questions.forEach((question) => {
            if (question.selectedOption == null) {
                allResearchsIsAnswered = 0;
            }
        });

        if (currentStep === STEPS.ONE || currentStep === STEPS.THREE || !allResearchsIsAnswered) return null;

        return (
            <div className={"nextStepOption"} onClick={() => setStep(currentStep+1)}>
                Próximo {/*TODO - i18n*/}
                <ChevronRightIcon fontSize={"large"}/>
            </div>
        )
    }

    const GetFooter = () => {
        return (
            <div className={"footerOptions"}>
                {GetBackArrow()}
                {GetNextArrow()}
            </div>
        )
    }

    return (
        <div className={"rootContainer"}>
            <div className={"carouselContainer"}>
                <Card className={"cardContainer"} elevation={5}>
                    {GetContent()}
                    {GetFooter()}
                </Card>
            </div>
        </div>
    )
}

