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

export interface ComputedAnswersPayload {researchId: string, computedAnswers: ComputedAnswers}
export interface ResearchProps {researchId: string, research: Research, answers: Answers | null, computedAnswers: ComputedAnswers | null}
export interface ReduxState {
    user: UserData | null,
    research: Research | null,
    researchs: ResearchProps[],
    inProgressAnswer: AnswerResearchPayloadProps | null,
}

export interface SaveResearchsPayload {researchId: string, research: Research}

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
    let researchList: ResearchProps[] = [];
    switch (type) {
        case ActionsTypes.SAVE_AUTHENTICATED_USER:
            return {...state, user: payload};
        case ActionsTypes.CLEAR_SAVED_USER:
            return initialState;
        case ActionsTypes.SAVE_RESEARCHS:
            let isSame = true;

            for (let researchToFind of payload) {
                const targetResearch: ResearchProps | undefined = state.researchs.find((reseach) => reseach.researchId == researchToFind.researchId);
                if (targetResearch == undefined || targetResearch.research.timestamp.seconds != researchToFind.research.timestamp.seconds) {
                    isSame = false;
                    break;
                }
            }

            console.log(isSame)
            if (isSame) {
                return state;
            } else {
                researchList = [...state.researchs];
                payload.forEach((research: any) => {
                    const targetResearchIndex = researchList.findIndex((rsch) => rsch.researchId == research.researchId);
                    if (targetResearchIndex != -1) {
                        researchList[targetResearchIndex].research = research.research
                    } else {
                        researchList.push({researchId: research.researchId, research: research.research, answers: null, computedAnswers: null});
                    }
                });
                return {...state, researchs: researchList};
            }
        case ActionsTypes.SAVE_RESEARCH:
            return {...state, research: payload};
        case ActionsTypes.SAVE_ANSWER_RESEARCH_PAYLOAD:
            return {...state, inProgressAnswer: payload};
        case ActionsTypes.SAVE_COMPUTED_ANSWER:
            researchList = [...state.researchs];
            const indexOfTargetResearch = researchList.findIndex((research) => research.researchId == payload.researchId);
            if (indexOfTargetResearch != -1) {
                researchList[indexOfTargetResearch].computedAnswers = payload.computedAnswers;
            }
            return {...state, researchs: researchList};
        default:
            return state;
    }
}
