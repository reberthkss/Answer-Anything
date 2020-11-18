import React, {useEffect, useState} from "react";
import {useParams, useHistory} from "react-router-dom";
import "./AnswerResearch.css"
import { CircularProgress } from "@material-ui/core";
import {AnswerResearchCarousel} from "../../Components/AnswerResearchCarousel/AnswerResearchCarousel";
import {Research} from "../../utils/Data/ResearchData";
import {ResearchQuestionData} from "../../utils/Data/ResearchQuestionData";
import {FirestoreManager} from "../../utils/Services/FirebaseManager/FirestoreManager";
import {ReduxState} from "../../redux/reducer";
import {useSelector} from "react-redux";
import {AnswerResearchManager} from "../../utils/Services/AnswerResearchManager/AnswerResearchManager";
import {getStore} from "../../redux/ConfigureStore";
import {saveResearch} from "../../redux/Actions";
import {isDevEnv} from "../../utils/utils";

export const AnswerResearchScreen = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const {research} = useSelector((state:ReduxState) => state);
    const {answerResearchPayload} = useSelector((state: ReduxState) => state);
    const history = useHistory();
    const params: any = useParams();
    const id = params.id || {id: null}
    const TAG = "AnswerResearch";

    const loadResearch = async (id: string) => {
        const firestoreManager = new FirestoreManager();
        setLoading(true);
        const result = await firestoreManager.find(id);
        if (result.result) {
            isDevEnv() && console.log(TAG, "Research is valid")
        } else {
            isDevEnv() && console.log(TAG, "Research is invalid");
            history.replace("/404");
        }
        setLoading(false);
    }

    const handleOptionSelection = async (question: ResearchQuestionData, selectedOption: number) => {
        if (research === null ) return ;
        const answerResearchManager = new AnswerResearchManager();
        const questionPosition = research
            .questions
            .indexOf(question);
        research.questions[questionPosition].selectedOption = selectedOption;
        const newResearch = new Research(research.title, research.subtitle, research.description, research.questions, research.status, research.roles);
        const responseOnSave = await answerResearchManager.saveAnsweredQuestion({
            researchId: answerResearchPayload?.researchId || null,
            answerResearchId: answerResearchPayload?.answerResearchId || null,
            answeredQuestionId: question.id,
            selectedOption: selectedOption
        });

        if (responseOnSave.result) {
            /* TODO - Success*/
        } else {
            /* TODO - Error*/
        }

        /*TODO - MAKE A CALL TO REGISTER A ANSWER*/
        getStore().dispatch(saveResearch(newResearch))
    }

    const Content = () => {
        if (loading) {
            /*TODO - fix center position*/
          // return ( <Loading />)
            return (
                <div className={"loading"}>
                    <CircularProgress/>
                </div>
            )
        } else if (research != null) {
            return (
                <div className={"mainContent"}>
                    {/*TODO - ADD A LOGO TO RENDER ON THE TOP LEFT CORNER OF SITE*/}
                    <AnswerResearchCarousel
                        researchId={id}
                        research={research}
                        onGetSelectedOption={handleOptionSelection}
                    />
                </div>
            )
        }
    }

    useEffect(() => {
        loadResearch(id);
    }, []);

    return (
        <div className={"rootAnswerResearch"}>
            {/*TODO ADD BACKGROUND*/}
            {Content()}
        </div>
    )
}
