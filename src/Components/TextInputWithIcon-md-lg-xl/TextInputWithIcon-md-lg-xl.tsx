import React from "react"
import "./TextInputWithIcon-md-lg-xl.css"

interface TextInputWithIconProps {
    type: string,
    icon: () => any,
    placeholder: string,
    onChange: (value: string) => void

}
const TextInputWithIconMdLgXl = ({type, icon, placeholder, onChange}: TextInputWithIconProps) => {
    return (
        <div className={"text-input-with-icon-root-container"}>
            <div className={"text-input-with-icon-icon-container"}>
                {icon()}
            </div>
            <div className={"text-input-with-icon-input-container"}>
                <input
                    className={"text-input-with-icon-input"}
                    type={type}
                    placeholder={placeholder}
                    onChange={(event) => onChange(event.target.value)}
                />
            </div>
        </div>
    )
}

export default TextInputWithIconMdLgXl;


