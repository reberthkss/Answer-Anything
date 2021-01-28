import firebase from "firebase";
import {RepositoryResponse, returnRepositoryResponse} from "./Helpers";
import {store} from "../../redux/ConfigureStore";
import {ReduxAction, ReduxState} from "../../redux/reducer";
import { PersistPartial } from "redux-persist/lib/persistReducer";
import { Store } from "redux";
import {UserData} from "../Data/UserData";
import {clearAuthenticatedUser, saveAuthenticatedUser} from "../../redux/Actions";

export class GoogleAuth {
    constructor() {
        firebase.auth().useDeviceLanguage();
        this.provider = new firebase.auth.GoogleAuthProvider();
        this.store = store;
    }
    provider: firebase.auth.GoogleAuthProvider;
    store: Store<ReduxState & PersistPartial, ReduxAction>;

    async doLogin(): Promise<RepositoryResponse> {
        try {
            const response = await firebase.auth().signInWithPopup(this.provider);
            const userData = new UserData(response);
            this.store.dispatch(saveAuthenticatedUser(userData))
            return returnRepositoryResponse(true, null);
        } catch (e) {
            /* TODO - Print message Error */
            return returnRepositoryResponse(false, e);
        }
    }

    async doLogout(): Promise<RepositoryResponse> {
        try {
            const response = await firebase.auth().signOut();
            this.store.dispatch(clearAuthenticatedUser());
            return returnRepositoryResponse(true, null);
        } catch (e) {
            /* TODO - Print message Error */
            return returnRepositoryResponse(false, e);
        }
    }
}
