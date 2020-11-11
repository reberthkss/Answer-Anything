import React from "react";
import "./Conclusion.css";
import {ShareSocialMedia} from "../ShareSocialMedia/ShareSocialMedia";

const defaultFinishMessage = "That's question were be registered on the Answer Anything servers. All data is storage following all privacy policies."; /*TODO - i18n*/

export const Conclusion = ({finishMessage, researchUrl}: {finishMessage: string, researchUrl: string}) => {
    return (
        <div className={"conclusionRootContainer"}>
            <div className={"messagesContainer"}>
                <div className={"messageContainer"}>
                    {finishMessage}
                </div>
                <div className={"thankYouContainer"}>
                    {/*CHANGE FOR REMOTE CONFIG VALUES*/}
                    Thank you for answer our research! {/*TODO - i18n*/}
                </div>
            </div>
            <ShareSocialMedia url={researchUrl}/>
        </div>
    )
}

Conclusion.defaultProps = {
    finishMessage: defaultFinishMessage
}
