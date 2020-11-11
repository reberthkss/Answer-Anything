import React from "react";
import "./ShareResearch.css";
import TextField from "@material-ui/core/TextField/TextField";
import {ShareSocialMedia} from "../ShareSocialMedia/ShareSocialMedia";
import {useSelector} from "react-redux";
import {ReduxState} from "../../redux/reducer";
import {ShareManager} from "../../utils/Services/ShareManager/ShareManager";

export const ShareResearch = () => {
    /*
    * TODO - Generate deep links
    *  */

    const researchId = useSelector((state: ReduxState) => state.answerResearchPayload?.researchId || null);

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
                <ShareSocialMedia url={ShareManager.shareResearch(researchId)}/>
            </div>
        </div>
    )
}
