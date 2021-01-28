import React from "react";
import "./FacebookLogin.css";

interface FacebookLoginProps {
    onClick: () => void
}

function FacebookLogin({onClick}: FacebookLoginProps) {
    return (
        <div className={"facebookContainer"} onClick={onClick}>
            <div className={"fb_logo_container"}>
                <div className={"fb_logo"}/>
            </div>
            <div className={"fb_text_container"}>
                <span className={"continue_text"}>Sign in with Facebook</span>
            </div>
        </div>
    )
}

export default FacebookLogin;
