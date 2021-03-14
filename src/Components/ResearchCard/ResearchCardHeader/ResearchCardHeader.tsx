import {CardContent, CardHeader, IconButton, Menu, MenuItem} from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import React, {useState} from "react";

interface ResearchCardHeaderProps {
    title: string,
    subtitle: string
}

const ResearchCardHeader = ({title, subtitle}: ResearchCardHeaderProps) => {
    const [anchorElement, setAnchorElement] = useState<any>(null);
    const options = ["Copiar link da pesquisa"]

    return (
        <CardContent>
            <CardHeader
                title={research.research.title}
                subheader={research.research.subtitle}
                action={
                    <IconButton aria-label="settings" onClick={(event) => setAnchorElement(event.target)}>
                        <MoreVertIcon />
                    </IconButton>
                }
            />
            <Menu
                id="long-menu"
                anchorEl={anchorElement}
                keepMounted
                open={anchorElement != null}
                onClose={() => setAnchorElement(null)}
                PaperProps={{
                    style: {
                        maxHeight: "100px",

                        wordWrap: "break-word"
                    },
                }}
            >
                {options.map((option) => (
                    <MenuItem key={option} selected={option === option[0]} onClick={() => setAnchorElement(null)}>
                        {option}
                    </MenuItem>
                ))}
            </Menu>
        </CardContent>
    )
}

export default ResearchCardHeader;
