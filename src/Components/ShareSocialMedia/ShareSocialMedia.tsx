import {DiscordIcon} from "../../resources/Icons/DiscordIcon";
import {FacebookIcon} from "../../resources/Icons/FacebookIcon";
import {GmailIcon} from "../../resources/Icons/GmailIcon";
import {InstagramIcon} from "../../resources/Icons/InstagramIcon";
import {LinkedinIcon} from "../../resources/Icons/LinkedinIcon";
import {MessengerIcon} from "../../resources/Icons/MessengerIcon";
import {OutlookIcon} from "../../resources/Icons/OutlookIcon";
import {SlackIcon} from "../../resources/Icons/SlackIcon";
import {TelegramIcon} from "../../resources/Icons/TelegramIcon";
import {WhatsappIcon} from "../../resources/Icons/WhatsAppIcon";
import "./ShareSocialMedia.css";
import React from "react";
import {
    FacebookShareButton,
    FacebookMessengerShareButton,
    LinkedinShareButton,
    TelegramShareButton,
    WhatsappShareButton,
    RedditShareButton, RedditIcon, TwitterShareButton, TwitterIcon
} from "react-share";
import Clipboard from 'react-clipboard.js';
import {useTranslation} from "react-i18next";
import {Reddit} from "@material-ui/icons";
export interface ShareSocialMediaProps {
    url: string,
    message: string
}
export const ShareSocialMedia = ({url, message = "Hey there! Take a look at the research i made!"}: ShareSocialMediaProps ) => {
    const {t} = useTranslation();
    const TITLE = "Answer Anything"
    return (
        <div className={"shareOptionsContainer"}>
            <div className={"urlShareOptionContainer"}>
                <div className={"shareWithFriendsText"}>
                    {t("share")}
                </div>
                <div className={"copyAndPasteContainer"}>
                    <div className={"urlContainer"}>
                        {url}
                    </div>
                    <Clipboard className={"copyAndPasteBtn"} data-clipboard-text={url} button-title="Copy" >
                        {t("copy")}
                    </Clipboard>
                </div>
                <div className={"orShareOnSocialMediaText"}>
                    {t("or_share_in_social_media")}
                </div>
            </div>
            <div className={"socialMedia"}>
                {/*<DiscordIcon onClick={() => null}/>*/}
                <FacebookShareButton url={url} quote={message}>
                    <FacebookIcon/>
                </FacebookShareButton>
                <LinkedinShareButton title={TITLE} url={url} summary={message} source={"www.answeranything.com"}>
                    <LinkedinIcon/>
                </LinkedinShareButton>
                <RedditShareButton title={TITLE} url={url}>
                    <RedditIcon/>
                </RedditShareButton>
            </div>
            <div className={"socialMedia"}>
                <TelegramShareButton title={TITLE} url={url}>
                    <TelegramIcon />
                </TelegramShareButton>
                <WhatsappShareButton title={TITLE} separator={"-"} url={url}>
                    <WhatsappIcon />
                </WhatsappShareButton>
                <TwitterShareButton title={TITLE} url={url} via={message}>
                    <TwitterIcon />
                </TwitterShareButton>
            </div>
        </div>
    )
}

ShareSocialMedia.defaultProps = {
    message: null
}
