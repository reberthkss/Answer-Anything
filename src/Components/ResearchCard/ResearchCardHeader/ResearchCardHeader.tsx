import {CardHeader, IconButton, Menu, MenuItem} from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import ShareIcon from '@material-ui/icons/Share';
import React, {ReactElement, useState} from "react";
import FacebookIcon from '@material-ui/icons/Facebook';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import RedditIcon from '@material-ui/icons/Reddit';
import TwitterIcon from '@material-ui/icons/Twitter';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import TelegramIcon from '@material-ui/icons/Telegram';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import "./ResearchCardHeader.css"
import {Colors} from "../../../utils/Enums/Colors";
import {ShareManager} from "../../../utils/Services/ShareManager/ShareManager";
import SocialNetworkManager from "../../../utils/Managers/SocialNetworkManager/SocialNetworkManager";
import SocialNetworks from "../../../utils/Enums/SocialNetworks";

interface ResearchCardHeaderProps {
    title: string,
    subtitle: string,
    researchId: string,
}
interface OptionsProps {
    icon?: ReactElement,
    text: string,
    onClick?: () => void,
    shareLink: string
}

const ResearchCardHeader = ({title, subtitle, researchId}: ResearchCardHeaderProps) => {
    const [anchorElement, setAnchorElement] = useState<any>(null);
    const [options, setOptions] = useState<OptionsProps[]>([]);
    const socialNetworkManager = new SocialNetworkManager(researchId, title);
    const detailOptions: OptionsProps[] = [
        {icon: (<FileCopyIcon/>), text: "Copiar link da pesquisa", shareLink: ShareManager.shareResearch(researchId)}
        ];
    const shareOptions: OptionsProps[] = [
        {icon: (<FacebookIcon style={{color: Colors.FACEBOOK}} />), text: SocialNetworks.FACEBOOK, shareLink: socialNetworkManager.getShareLink(SocialNetworks.FACEBOOK)},
        {icon: (<LinkedInIcon style={{color: Colors.LINKEDIN}}/>), text: SocialNetworks.LINKEDIN, shareLink: socialNetworkManager.getShareLink(SocialNetworks.LINKEDIN)},
        {icon: (<RedditIcon style={{color: Colors.REDDIT}}/>), text: SocialNetworks.REDDIT, shareLink: socialNetworkManager.getShareLink(SocialNetworks.REDDIT)},
        {icon: (<TwitterIcon style={{color: Colors.TWITTER}}/>) , text: SocialNetworks.TWITTER, shareLink: socialNetworkManager.getShareLink(SocialNetworks.TWITTER)},
        {icon: (<WhatsAppIcon style={{color: Colors.WHATSAPP}}/>), text: SocialNetworks.WHATSAPP, shareLink: socialNetworkManager.getShareLink(SocialNetworks.WHATSAPP)},
        {icon: (<TelegramIcon style={{color: Colors.TELEGRAM}}/>), text: SocialNetworks.TELEGRAM, shareLink: socialNetworkManager.getShareLink(SocialNetworks.TELEGRAM)}
    ];

    const renderOptionIcon = (icon: ReactElement | null) => {
        if (icon) {

            return (
                <div className={"research-card-header-option-icon-container"}>
                    {icon}
                    <div style={{marginRight: 10}}/>
                </div>
            );
        } else {
            return null;
        }
    }

    return (
        <div>
            <CardHeader
                title={title}
                subheader={subtitle}
                action={
                    <div className={"research-card-header-icons-container"}>
                        <IconButton aria-label="settings" onClick={(event) => {
                            setAnchorElement(event.target);
                            setOptions(shareOptions)
                        }}>
                            <ShareIcon />
                        </IconButton>
                        <IconButton aria-label="settings" onClick={(event) => {
                            setAnchorElement(event.target);
                            setOptions(detailOptions);
                        }}>
                            <MoreVertIcon />
                        </IconButton>
                    </div>
                }
            />
            <Menu
                id="options-menu"
                anchorEl={anchorElement}
                keepMounted
                open={anchorElement != null}
                onClose={() => setAnchorElement(null)}
            >
                {options.map((option) => (
                    <MenuItem key={option.text} onClick={() => {
                        setAnchorElement(null);
                        window.open(option.shareLink);
                        // option.onClick();
                    }}>
                        {renderOptionIcon(option.icon || null)}
                        {option.text}
                    </MenuItem>
                ))}
            </Menu>
        </div>
    )
}

export default ResearchCardHeader;
