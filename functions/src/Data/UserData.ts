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
    constructor(data: firebase.auth.UserCredential) {
        const profile = data.additionalUserInfo!!.profile;
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
    }
    user: ProfileData;
}
