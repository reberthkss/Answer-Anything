import {ActionsTypes} from "./ActionTypes";
import {UserData} from "../utils/Data/UserData";
import {Research} from "../utils/Data/ResearchData";
import {Answers} from "../utils/Data/Answers";
import {ComputedAnswers} from "../utils/Data/ComputedAnswers";


/*Mudar estrutura do redux para separar:

 *   Os reducers do Dashboard do usuário
 *   Os reducers da tela de respostas

 +/- assim:

 dashboard: {},
 answerScreen: {}

 */

export interface AnswerResearchProps {researchId: string, answers: ComputedAnswers}
export interface ResearchProps {researchId: string, research: Research, answers: Answers | null, computedAnswers: ComputedAnswers | null}
export interface ReduxState {
    user: UserData | null,
    research: Research | null,
    researchs: ResearchProps[],
    inProgressAnswer: AnswerResearchPayloadProps | null,
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
    inProgressAnswer: null
}

export const rootReducer = (state: ReduxState = initialState, action: ReduxAction): ReduxState => {
    const {type, payload} = action;
    switch (type) {
        case ActionsTypes.SAVE_AUTHENTICATED_USER:
            return {...state, user: payload};
        case ActionsTypes.CLEAR_SAVED_USER:
            return initialState;
        case ActionsTypes.SAVE_RESEARCHS:
            const listResearchs = [...state.researchs];
            payload.forEach((research: any) => {
                const targetResearchIndex = listResearchs.findIndex((rsch) => rsch.researchId == research.researchId);
                if (targetResearchIndex != -1) {
                    listResearchs[targetResearchIndex].research = research
                } else {
                    listResearchs.push({researchId: research.researchId, research: research.research, answers: null, computedAnswers: null});
                }
            });
            return {...state, researchs: listResearchs}   ;
        case ActionsTypes.SAVE_RESEARCH:
            return {...state, research: payload};
        case ActionsTypes.SAVE_ANSWER_RESEARCH_PAYLOAD:
            return {...state, inProgressAnswer: payload};
        case ActionsTypes.SAVE_ANSWERS_OF_RESEARCH:

        default:
            return state;
    }
}
