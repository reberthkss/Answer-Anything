import {AnswerResearchPayloadProps, ReduxAction} from "./reducer";
import {ActionsTypes} from "./ActionTypes";
import {UserData} from "../utils/Data/UserData";
import {Research} from "../utils/Data/ResearchData";
import {Answers} from "../utils/Data/Answers";
import {ComputedAnswers} from "../utils/Data/ComputedAnswers";


export const saveAuthenticatedUser = (userInfo: UserData): ReduxAction => {
    return {payload: userInfo, type: ActionsTypes.SAVE_AUTHENTICATED_USER};
}

export const clearAuthenticatedUser = (): ReduxAction => {
    return {type: ActionsTypes.CLEAR_SAVED_USER};
}

export const saveResearchs = (researchs: {researchId: string, research: Research}[]): ReduxAction => {
    return {payload: researchs, type: ActionsTypes.SAVE_RESEARCHS};
}

export const saveResearch = (research: Research): ReduxAction => {
    return {payload: research, type: ActionsTypes.SAVE_RESEARCH};
}

export const saveAnswerResearchPayload = (researchPayload: AnswerResearchPayloadProps): ReduxAction => {
    return {payload: researchPayload, type: ActionsTypes.SAVE_ANSWER_RESEARCH_PAYLOAD};
}

export const saveAnswersOfResearch = (answersResearch: {researchId: string, answers: ComputedAnswers}): ReduxAction => {
    return {payload: answersResearch, type: ActionsTypes.SAVE_ANSWERS_OF_RESEARCH }
}
