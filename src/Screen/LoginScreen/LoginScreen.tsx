import React from "react";
import "./LoginScreen.css"
import {makeStyles} from "@material-ui/core/styles";
import GoogleButton from 'react-google-button'
import {useDimensions} from "../../utils/Hooks/Hooks";
import {GoogleAuth} from "../../utils/Services/GoogleAuth";
import { useHistory } from "react-router-dom";
import {FacebookAuth} from "../../utils/Services/FacebookAuth";
import FacebookLogin from "../../Components/FacebookLogin/FacebookLogin";
import {useTranslation} from "react-i18next";
import Scrollbar from "react-scrollbars-custom";


export const LoginScreen = () => {
    const dimensions = useDimensions();
    const history = useHistory();
    const authGoogle = new GoogleAuth();
    const authFacebook = new FacebookAuth();
    const {t} = useTranslation();

    const _handleGoogleLogin = async () => {
       const authResponse = await authGoogle.doLogin();
       if (authResponse.isSuccessful) {
           history.push("/");
       } else {
           /*toast error*/
       }
    }

    const _handleFacebookLogin = async () => {
        const authResponse = await authFacebook.doLogin();
        if (authResponse.isSuccessful) {
            history.push("/");
        } else {
            /* toast error*/
        }
    }

    /* ANIMATE LOADING */
    return (
        <Scrollbar id={"scrollbar-options"} style={{width: "100%", height: "100vh"}} className={"scroll-bar-options"}>
            <div className={"backgroundImage"}>
                <div className={"answer_anything_text_container"}>
                    <div className={"answer_anything_text_1_container"}>
                        <span className={"answer_anything_text_1"}>Answer Anything</span>
                    </div>
                    <div className={"answer_anything_text_2_container"}>
                        <span className={"answer_anything_text_2"}>{t("survey_anywhere")}</span>
                    </div>
                    <div className={"features_description_container"}>
                        <div className={"feature_container feature_anim_1"}>
                            <p>
                                <span className={"bold_text"}>{t("create_a_survey")} </span>
                                <span className={"normal_text"}>{t("create_a_survey_description")}</span>
                            </p>
                        </div>
                        <div className={"feature_container feature_anim_2"}>
                            <p>
                                <span className={"bold_text"}>{t("review")} </span>
                                <span className={"normal_text"}>{t("review_description")}</span>
                            </p>
                        </div>
                    </div>
                </div>
                <div className={"auth_methods_container"}>
                    <div className={"auth_methods auth_methods_anim"}>
                        <GoogleButton onClick={_handleGoogleLogin}/>
                        <FacebookLogin onClick={_handleFacebookLogin} />
                    </div>
                </div>
            </div>
        </Scrollbar>
    )
}
