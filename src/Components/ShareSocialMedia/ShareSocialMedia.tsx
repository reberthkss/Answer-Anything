import FacebookIcon from '@material-ui/icons/Facebook';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import TelegramIcon from '@material-ui/icons/Telegram';
import RedditIcon from '@material-ui/icons/Reddit';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import TwitterIcon from '@material-ui/icons/Twitter';
import "./ShareSocialMedia.css";
import React from "react";
import {
    FacebookShareButton,
    LinkedinShareButton,
    TelegramShareButton,
    WhatsappShareButton,
    RedditShareButton,
    TwitterShareButton
} from "react-share";
import Clipboard from 'react-clipboard.js';
import {useTranslation} from "react-i18next";
import {Colors} from "../../utils/Enums/Colors";
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
                <FacebookShareButton url={url} quote={message}>
                    <FacebookIcon fontSize={"large"} style={{color: Colors.FACEBOOK}}/>
                </FacebookShareButton>
                <LinkedinShareButton title={TITLE} url={url} summary={message} source={"www.answeranything.com"}>
                    <LinkedInIcon fontSize={"large"} style={{color: Colors.LINKEDIN}}/>
                </LinkedinShareButton>
                <RedditShareButton title={TITLE} url={url}>
                    <RedditIcon fontSize={"large"} style={{color: Colors.REDDIT}} />
                </RedditShareButton>
            </div>
            <div className={"socialMedia"}>
                <TelegramShareButton title={TITLE} url={url}>
                    <TelegramIcon fontSize={"large"} style={{color: Colors.TELEGRAM}}/>
                </TelegramShareButton>
                <WhatsappShareButton title={TITLE} separator={"-"} url={url}>
                    <WhatsAppIcon fontSize={"large"} style={{color: Colors.WHATSAPP}} />
                </WhatsappShareButton>
                <TwitterShareButton title={TITLE} url={url} via={message}>
                    <TwitterIcon fontSize={"large"} style={{color: Colors.TWITTER}} />
                </TwitterShareButton>
            </div>
        </div>
    )
}

ShareSocialMedia.defaultProps = {
    message: null
}
