import firebase from "firebase";

export interface ProfileData {
    firstName: string,
    lastName: string,
    id: string,
    email: string,
    avatarUrl: string
}
export interface UserDataModel {
    profile: ProfileData
}

export class UserData {
    constructor(data: firebase.auth.UserCredential | ProfileData) {

        // @ts-ignore
        if (data["user"]) {
            // @ts-ignore
            const profile = data.additionalUserInfo!!.profile;
            // @ts-ignore
            const userId = data["user"]!!.uid;
            this.user = {
                id: userId,
                // @ts-ignore
                email: profile["email"],
                // @ts-ignore
                firstName: profile["given_name"],
                // @ts-ignore
                lastName: profile["family_name"],
                // @ts-ignore
                avatarUrl: profile["picture"]
            }
        } else {
            this.user = data as ProfileData;
        }
    }
    user: ProfileData;
}
