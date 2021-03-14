import {CardContent, CardHeader, IconButton, Menu, MenuItem} from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import ShareIcon from '@material-ui/icons/Share';
import React, {useState} from "react";
import "./ResearchCardHeader.css"
interface ResearchCardHeaderProps {
    title: string,
    subtitle: string
}

const ResearchCardHeader = ({title, subtitle}: ResearchCardHeaderProps) => {
    const [anchorElement, setAnchorElement] = useState<any>(null);
    const options = ["Copiar link da pesquisa"];

    return (
        <div>
            <CardHeader
                title={title}
                subheader={subtitle}
                action={
                    <div className={"research-card-header-icons-container"}>
                        <IconButton aria-label="settings" onClick={(event) => setAnchorElement(event.target)}>
                            <ShareIcon />
                        </IconButton>
                        <IconButton aria-label="settings" onClick={(event) => setAnchorElement(event.target)}>
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
                    <MenuItem key={option} selected={option === option[0]} onClick={() => setAnchorElement(null)}>
                        {option}
                    </MenuItem>
                ))}
            </Menu>
        </div>
    )
}

export default ResearchCardHeader;
