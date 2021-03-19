import {IconButton, Popover, Tooltip} from "@material-ui/core";
import Clipboard from "react-clipboard.js";
import {ShareManager} from "../../utils/Services/ShareManager/ShareManager";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import React, {useState} from "react";
import ShareIcon from '@material-ui/icons/Share';
import "./SharePopover.css";
import {
    FacebookIcon,
    FacebookShareButton, TwitterIcon, TwitterShareButton,
    WhatsappIcon,
    WhatsappShareButton
} from "react-share";

interface ShareIconProps {
    researchId: string
}

const SharePopover = ({researchId}: ShareIconProps) => {
    const [anchorElement, setAnchorElement] = useState<Element | null>(null);
    const iconButtonOnClick = (event: any) => {
        setAnchorElement(event.currentTarget);
    }
    const url = ShareManager.shareResearch(researchId);
    const STANDARD_MESSAGE = "Hey there! Take a look at my new research!"
    return (
        <div>
            <IconButton size={"small"} onClick={iconButtonOnClick}>
                <ShareIcon className={"share-icon"}/>
            </IconButton>
            <div className={"pop-over-container"}>
                <Popover
                    className={"pop-over"}
                    open={anchorElement != null}
                    anchorEl={anchorElement}
                    onClose={() => setAnchorElement(null)}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                >
                    <div className={"icons-container"}>
                        <Tooltip title={"Copiar url da pesquisa"}>
                            <IconButton>
                                <Clipboard className={"copy-and-paste-component"}
                                           data-clipboard-text={url}>
                                    <FileCopyIcon className={"file-copy-icon"} fontSize={"small"}/>
                                </Clipboard>
                            </IconButton>
                        </Tooltip>
                        <Tooltip title={"Compartilhar no Whatsapp"}>
                            <IconButton>
                                <WhatsappShareButton url={url}>
                                    <WhatsappIcon className={"whats-app-icon"}/>
                                </WhatsappShareButton>
                            </IconButton>
                        </Tooltip>
                        <Tooltip title={"Compartilhar no Facebook"}>
                            <IconButton>
                                <FacebookShareButton url={url} quote={STANDARD_MESSAGE}>
                                    <FacebookIcon className={"whats-app-icon"}/>
                                </FacebookShareButton>
                            </IconButton>
                        </Tooltip>
                        <Tooltip title={"Compartilhar no Twitter"}>
                            <IconButton>
                                <TwitterShareButton url={url}  title={STANDARD_MESSAGE}>
                                    <TwitterIcon className={"whats-app-icon"}/>
                                </TwitterShareButton>
                            </IconButton>
                        </Tooltip>
                    </div>
                </Popover>
            </div>
        </div>
    )
}


export default SharePopover;
