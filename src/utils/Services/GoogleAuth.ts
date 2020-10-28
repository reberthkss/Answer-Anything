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
        firebase.auth().languageCode = 'pt';
        this.provider = new firebase.auth.GoogleAuthProvider();
        this.store = store;
    }
    provider: firebase.auth.GoogleAuthProvider;
    store: Store<ReduxState & PersistPartial, ReduxAction>;

    // @ts-ignore
    async doLogin(): Promise<RepositoryResponse> {
        try {
            const response = await firebase.auth().signInWithPopup(this.provider);
            const userData = new UserData(response);
            this.store.dispatch(saveAuthenticatedUser(userData))
            returnRepositoryResponse(true, null);
        } catch (e) {
            console.log("error => ", e);
            returnRepositoryResponse(false, e);
        }
    }

    // @ts-ignore
    async doLogout(): Promise<RepositoryResponse> {
        try {
            const response = await firebase.auth().signOut();
            this.store.dispatch(clearAuthenticatedUser());
            returnRepositoryResponse(true, null);
        } catch (e) {
            /* TODO - Print message Error */
            console.log(e);
            returnRepositoryResponse(false, e);
        }
    }
}
