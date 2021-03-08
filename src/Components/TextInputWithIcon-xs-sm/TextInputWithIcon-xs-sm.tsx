import React, {useState} from "react";
import "./TextInputWithIcon-xs-sm.css"
import TextInputWithIconMdLgXl from "../TextInputWithIcon-md-lg-xl/TextInputWithIcon-md-lg-xl";
import {Icon, IconButton} from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';
interface TextInputWithIconXsSm {
    type: string,
    icon: () => any,
    placeholder: string,
    onChange: (value: string) => void
}

const TextInputWithIconXsSm = ({type, icon, placeholder, onChange}: TextInputWithIconXsSm) => {
    const renderMainContent = () => {
        return (
            <div className={"text-input-with-icon-root-container-xs-sm"}>
                <div className={"text-input-with-icon-container-xs-sm"}>
                    {icon()}
                </div>
                <div className={"text-input-with-icon-input-base-xs-sm"}>
                    <input
                        className={"text-input-with-icon-input-input-xs-sm"}
                        type={type}
                        placeholder={placeholder}
                        onChange={(event) => onChange(event.target.value)}
                    />
                </div>
            </div>
        )
    }
    return (
        <div className={"text-input-with-icon-xs-sm-container"}>
            {renderMainContent()}
        </div>
    )
}

export default TextInputWithIconXsSm;
