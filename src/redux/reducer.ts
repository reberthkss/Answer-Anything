import {ActionsTypes} from "./ActionTypes";
import {UserData} from "../utils/Data/UserData";
import {Research} from "../utils/Data/ResearchData";
import {AnswerData} from "../utils/Data/AnswerData";
import {Answers} from "../utils/Data/Answers";


/*Mudar estrutura do redux para separar:

 *   Os reducers do Dashboard do usuário
 *   Os reducers da tela de respostas

 +/- assim:

 dashboard: {},
 answerScreen: {}

 */

export interface AnswerResearchProps {researchId: string, answers: Answers}
export interface ResearchProps {id: string, research: Research}
export interface ReduxState {
    user: UserData | null,
    research: Research | null,
    researchs: ResearchProps[],
    answerResearchPayload: AnswerResearchPayloadProps | null,
    answersOfResearch: AnswerResearchProps | null
}

export interface ReduxAction {
    payload?: any
    type: ActionsTypes
}

export interface AnswerResearchPayloadProps {
    researchId: string,
    answerResearchId: string
}

const initialState: ReduxState = {
    user: null,
    research: null,
    researchs: [],
    answerResearchPayload: null,
    answersOfResearch: null
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
        case ActionsTypes.SAVE_ANSWER_RESEARCH_PAYLOAD:
            return {...state, answerResearchPayload: payload};
        case ActionsTypes.SAVE_ANSWERS_OF_RESEARCH:
            return {...state, answersOfResearch: payload};
        default:
            return state;
    }
}
