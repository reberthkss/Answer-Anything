import {ReduxAction} from "./reducer";
import {ActionsTypes} from "./ActionTypes";
import {UserData} from "../utils/Data/UserData";
import {Research} from "../utils/Data/ResearchData";


export const saveAuthenticatedUser = (userInfo: UserData): ReduxAction => {
    return {payload: userInfo, type: ActionsTypes.SAVE_AUTHENTICATED_USER};
}

export const clearAuthenticatedUser = (): ReduxAction => {
    return {type: ActionsTypes.CLEAR_SAVED_USER};
}

export const saveResearchs = (researchs: Research[]): ReduxAction => {
    return {payload: researchs, type: ActionsTypes.SAVE_RESEARCHS};
}

export const saveResearch = (research: Research): ReduxAction => {
    return {payload: research, type: ActionsTypes.SAVE_RESEARCH};
}
