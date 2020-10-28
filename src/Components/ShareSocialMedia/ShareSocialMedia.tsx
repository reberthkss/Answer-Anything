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

export const ShareSocialMedia = () => {

    return (
        <div className={"shareOptionsContainer"}>
            <div className={"socialMedia"}>
                <DiscordIcon onClick={() => null}/>
                <FacebookIcon onClick={() => null}/>
                <GmailIcon onClick={() => null}/>
                <InstagramIcon onClick={() => null} />
                <LinkedinIcon onClick={() => null}/>
            </div>
            <div className={"socialMedia"}>
                <MessengerIcon onClick={() => null}/>
                <OutlookIcon onClick={() => null}/>
                <SlackIcon onClick={() => null}/>
                <TelegramIcon onClick={() => null}/>
                <WhatsappIcon onClick={() => null}/>
            </div>
        </div>
    )
}
