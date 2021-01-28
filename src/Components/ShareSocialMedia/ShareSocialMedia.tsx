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
import {FacebookShareButton, FacebookMessengerShareButton, LinkedinShareButton, TelegramShareButton, WhatsappShareButton} from "react-share";
import Clipboard from 'react-clipboard.js';
import {useTranslation} from "react-i18next";
export interface ShareSocialMediaProps {
    url: string,
    message: string | null
}
export const ShareSocialMedia = ({url, message}: ShareSocialMediaProps ) => {
    const {t} = useTranslation();
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
                    <Clipboard className={"copyAndPasteBtn"} data-clipboard-text={url} button-title="Copie" >
                        {t("copy")}
                    </Clipboard>
                </div>
                <div className={"orShareOnSocialMediaText"}>
                    {t("or_share_in_social_media")}
                </div>
            </div>
            <div className={"socialMedia"}>
                {/*<DiscordIcon onClick={() => null}/>*/}
                <FacebookShareButton url={url}>
                    <FacebookIcon/>
                </FacebookShareButton>
                <LinkedinShareButton url={url}>
                    <LinkedinIcon/>
                </LinkedinShareButton>
                {/*<GmailIcon onClick={() => null}/>*/}
                {/*<InstagramIcon onClick={() => null} />*/}
            </div>
            <div className={"socialMedia"}>
                {/*<MessengerIcon onClick={() => null}/>*/}
                {/*<OutlookIcon onClick={() => null}/>*/}
                {/*<SlackIcon onClick={() => null}/>*/}
                <TelegramShareButton url={url}>
                    <TelegramIcon />
                </TelegramShareButton>
                <WhatsappShareButton url={url}>
                    <WhatsappIcon />
                </WhatsappShareButton>
            </div>
        </div>
    )
}

ShareSocialMedia.defaultProps = {
    message: null
}
