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

export interface ShareSocialMediaProps {
    url: string,
    message: string | null
}
export const ShareSocialMedia = ({url, message}: ShareSocialMediaProps ) => {
    return (
        <div className={"shareOptionsContainer"}>
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
