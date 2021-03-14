import {CardContent, CardHeader, IconButton, Menu, MenuItem} from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import ShareIcon from '@material-ui/icons/Share';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import SendIcon from '@material-ui/icons/Send';
import React, {ReactElement, useState} from "react";
import FacebookIcon from '@material-ui/icons/Facebook';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import RedditIcon from '@material-ui/icons/Reddit';
import TwitterIcon from '@material-ui/icons/Twitter';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import TelegramIcon from '@material-ui/icons/Telegram';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import "./ResearchCardHeader.css"
import {Colors} from "../../../utils/Colors";
interface ResearchCardHeaderProps {
    title: string,
    subtitle: string,
    researchId: string,
}
interface OptionsProps {
    icon?: ReactElement,
    text: string,
    onClick?: () => void
}

const ResearchCardHeader = ({title, subtitle, researchId}: ResearchCardHeaderProps) => {
    const [anchorElement, setAnchorElement] = useState<any>(null);
    const [options, setOptions] = useState<OptionsProps[]>([]);
    const detailOptions: OptionsProps[] = [
        {icon: (<FileCopyIcon/>), text: "Copiar link da pesquisa"}
        ];
    const shareOptions: OptionsProps[] = [
        {icon: (<FacebookIcon style={{color: Colors.FACEBOOK}} />), text: "Facebook"},
        {icon: (<LinkedInIcon style={{color: Colors.LINKEDIN}}/>), text: "Linkedin"},
        {icon: (<RedditIcon style={{color: Colors.REDDIT}}/>), text: "Reddit"},
        {icon: (<TwitterIcon style={{color: Colors.TWITTER}}/>) , text: "Twitter"},
        {icon: (<WhatsAppIcon style={{color: Colors.WHATSAPP}}/>), text: "Whatsapp"},
        {icon: (<TelegramIcon style={{color: Colors.TELEGRAM}}/>), text: "Telegram"}
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
                        // option.onClick();
                    }} >
                        {renderOptionIcon(option.icon || null)}
                        {option.text}
                    </MenuItem>
                ))}
            </Menu>
        </div>
    )
}

export default ResearchCardHeader;
