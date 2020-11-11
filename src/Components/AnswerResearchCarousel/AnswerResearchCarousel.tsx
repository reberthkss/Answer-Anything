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
import {AnswerResearchManager} from "../../utils/Services/AnswerResearchManager/AnswerResearchManager";
import {getStore} from "../../redux/ConfigureStore";
import { useLocation } from "react-router-dom";
import {ShareManager} from "../../utils/Services/ShareManager/ShareManager";

interface AnswerResearchCarouselProps {
    researchId: string,
    research: Research,
    onGetSelectedOption: (question: ResearchQuestionData, selectedOption: number) => void
}

export interface UserData {email: string, name: string}

export const AnswerResearchCarousel = ({ researchId, research, onGetSelectedOption}: AnswerResearchCarouselProps) => {
    const [currentStep, setStep] = useState<number>(STEPS.ONE);
    const [answerData, setAnswerData] = useState<AnswerData | null>(null);

    const _handleEndOfResearch = async () => {
        const answerResearchPayload = getStore().getState().answerResearchPayload;
        const answerResearchManager = new AnswerResearchManager();
        const resFromFirebase = await answerResearchManager.endQuestionnaire({
            researchId: answerResearchPayload?.researchId || null,
            answerResearchId: answerResearchPayload?.answerResearchId || null
        });

        if (resFromFirebase.result) {
            setStep(STEPS.THREE);
        } else {
            console.log("Error => ", resFromFirebase.error);
        }



    }

    const GetContent = () => {
        const answerResearchManager = new AnswerResearchManager();
        switch (currentStep) {
            case STEPS.ONE:
                return (
                    <Greeting
                        onStartQuestionnaire={async ({email, name}) => {
                            const answerData = new AnswerData({email, name});
                            const res = await answerResearchManager.startQuestionnaire(researchId, answerData);
                            if (res.result) {
                                setAnswerData(answerData);
                                setStep(1);
                            } else {
                                /*TODO - display error*/
                                console.log(res.error);
                            }

                        }}
                        title={research.title!!}
                        description={research.description!!}/>
                )
            case STEPS.TWO:
                if (answerData === null) throw new Error("Answer data is invalid");
                return (
                    <AnswerQuestion questions={research.questions}
                                    userData={answerData.userData}
                                    onFinishAnswerQuestion={_handleEndOfResearch}
                                    onAnswerQuestion={onGetSelectedOption}
                    />
                )
            case STEPS.THREE:
                const answerResearchPayload = getStore().getState().answerResearchPayload;
                return (
                    <Conclusion researchUrl={ShareManager.shareResearch(answerResearchPayload?.researchId || null)}/>
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

