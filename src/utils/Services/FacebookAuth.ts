import firebase from "firebase";
import {Store} from "redux";
import {ReduxAction, ReduxState} from "../../redux/reducer";
import {PersistPartial} from "redux-persist/lib/persistReducer";
import {RepositoryResponse, returnRepositoryResponse} from "./Helpers";
import {ProfileData, UserData} from "../Data/UserData";
import {clearAuthenticatedUser, saveAuthenticatedUser} from "../../redux/Actions";
import { store } from "../../redux/ConfigureStore";

export class FacebookAuth {
    constructor() {
        firebase.auth().useDeviceLanguage();
        this.provider = new firebase.auth.FacebookAuthProvider();
        this.store = store;
        this.provider.addScope("email");
        this.provider.setCustomParameters({
            'display': 'popup'
        });
    }
    provider: firebase.auth.FacebookAuthProvider;
    store: Store<ReduxState & PersistPartial, ReduxAction>;

    async doLogin(): Promise<RepositoryResponse> {
        try {
            const response = await firebase.auth().signInWithPopup(this.provider);
            const payload: ProfileData = {
                // @ts-ignore
                id: firebase.auth().currentUser?.uid || "",
                // @ts-ignore
                firstName: response.additionalUserInfo?.profile["first_name"] || "",
                // @ts-ignore
                lastName: response.additionalUserInfo?.profile["last_name"] || "",
                // @ts-ignore
                avatarUrl: response.additionalUserInfo?.profile["picture"]["data"]["url"] || "",
                // @ts-ignore
                email: response.user?.email || "reberthkss@outlook.com"
            }
            const userData = new UserData(payload);
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
