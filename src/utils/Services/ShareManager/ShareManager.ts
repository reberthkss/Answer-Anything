import {getStore} from "../../../redux/ConfigureStore";
import { Store } from "redux";
import { ReduxState, ReduxAction } from "../../../redux/reducer";
import { PersistPartial } from "redux-persist/lib/persistReducer";

export class ShareManager {
    constructor() {
        this.store = getStore();
    }

    store: Store<ReduxState & PersistPartial, ReduxAction>;
    static shareResearch(researchId: string | null) {
        return `${window.location.host}/researchs/${researchId}`;
    }

}
