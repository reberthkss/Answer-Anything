import React from "react";
import "./ShareResearch.css";
import TextField from "@material-ui/core/TextField/TextField";
import {ShareSocialMedia} from "../ShareSocialMedia/ShareSocialMedia";

export const ShareResearch = () => {
    /*
    * TODO - Generate deep links
    *  */
    return (
        <div className={"shareResearchContainer"}>
            <div className={"shareMessageContainer"}>
               <div className={"shareMessageText"}>
                   Digite uma mensagem para ser compartilhada junto ao link {/*TODO - i18n*/}
               </div>
                <div className={"shareMessageTextFieldContainer"}>
                    <TextField
                        className={"shareMessageTextField"}
                        rows={3}
                        multiline={true}
                    />
                </div>
                <ShareSocialMedia/>
            </div>
        </div>
    )
}
