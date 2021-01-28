import React from "react";
import "./Conclusion.css";
import {ShareSocialMedia} from "../ShareSocialMedia/ShareSocialMedia";
import {useTranslation} from "react-i18next";


export const Conclusion = ({finishMessage, researchUrl}: {finishMessage: string, researchUrl: string}) => {
    const {t} = useTranslation();
    return (
        <div className={"conclusionRootContainer"}>
            <div className={"messagesContainer"}>
                <div className={"messageContainer"}>
                    {finishMessage}
                </div>
                <div className={"thankYouContainer"}>
                    {/*CHANGE FOR REMOTE CONFIG VALUES*/}
                    {t("thanks_for_answer")}
                </div>
            </div>
            <ShareSocialMedia url={researchUrl}/>
        </div>
    )
}
