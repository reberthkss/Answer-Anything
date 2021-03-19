import React from "react";
import "./FacebookLogin.css";
import {useTranslation} from "react-i18next";

interface FacebookLoginProps {
    onClick: () => void
}

function FacebookLogin({onClick}: FacebookLoginProps) {
    const {t} = useTranslation();
    return (
        <div className={"facebookContainer"} onClick={onClick}>
            <div className={"fb_logo_container"}>
                <div className={"fb_logo"}/>
            </div>
            <div className={"fb_text_container"}>
                <span className={"continue_text"}>{t("sign_in_with_facebook")}</span>
            </div>
        </div>
    )
}

export default FacebookLogin;
