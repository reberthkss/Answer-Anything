import {ActionsTypes} from "./ActionTypes";
import {UserData} from "../utils/Data/UserData";
import {Research} from "../utils/Data/ResearchData";


export interface ReduxState {
    user: UserData | null,
    research: Research | null,
    researchs: Research[]
}

export interface ReduxAction {
    payload?: any
    type: ActionsTypes
}

const initialState: ReduxState = {
    user: null,
    research: null,
    researchs: []
}

export const rootReducer = (state: ReduxState = initialState, action: ReduxAction): ReduxState => {
    const {type, payload} = action;
    switch (type) {
        case ActionsTypes.SAVE_AUTHENTICATED_USER:
            return {...state, user: payload};
        case ActionsTypes.CLEAR_SAVED_USER:
            return {...state, user: null};
        case ActionsTypes.SAVE_RESEARCHS:
            return {...state, researchs: payload};
        case ActionsTypes.SAVE_RESEARCH:
            return {...state, research: payload};
        default:
            return state;
    }
}
