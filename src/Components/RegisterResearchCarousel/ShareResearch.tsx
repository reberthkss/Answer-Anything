import React from "react";
import "./ShareResearch.css";
import TextField from "@material-ui/core/TextField/TextField";
import {ShareSocialMedia} from "../ShareSocialMedia/ShareSocialMedia";
import {useSelector} from "react-redux";
import {ReduxState} from "../../redux/reducer";
import {ShareManager} from "../../utils/Services/ShareManager/ShareManager";
import {useTranslation} from "react-i18next";

export const ShareResearch = () => {
    /*
    * TODO - Generate deep links
    *  */

    const {t} = useTranslation();
    const researchId = useSelector((state: ReduxState) => state.inProgressAnswer?.researchId || null);

    return (
        <div className={"shareResearchContainer"}>
            <div className={"shareMessageContainer"}>
               <div className={"shareMessageText"}>
                   {t("type_some_message_to_share_with_link")}
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
