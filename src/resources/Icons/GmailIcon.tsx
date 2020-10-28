import React from "react"
import "./SocialMediaIcons.css"

export const GmailIcon = ({onClick}: {onClick: () => void}) => {
    return (
        <div className={"cursor"} onClick={onClick}>
            <svg xmlns="http://www.w3.org/2000/svg"
                 enable-background="new 0 0 512 512"
                 viewBox="0 0 512 512"
                 height={64}
                 width={64}
            >
                <polygon fill="#f2f2f2" points="484.973 122.808 452.288 451.017 59.712 451.017 33.379 129.16 256 253.802"/>
                <polygon fill="#f2f2f2" points="473.886 60.983 256 265.659 38.114 60.983 256 60.983"/>
                <path fill="#f14336" d="M59.712,155.493v295.524H24.139C10.812,451.017,0,440.206,0,426.878V111.967l39,1.063L59.712,155.493
	z"/>
                <path fill="#d32e2a" d="M512,111.967v314.912c0,13.327-10.812,24.139-24.152,24.139h-35.56V155.493l19.692-46.525
	L512,111.967z"/>
                <path fill="#f14336" d="M512,85.122v26.845l-59.712,43.526L256,298.561L59.712,155.493L0,111.967V85.122
	c0-13.327,10.812-24.139,24.139-24.139h13.975L256,219.792L473.886,60.983h13.962C501.188,60.983,512,71.794,512,85.122z"/>
                <polygon fill="#d32e2a" points="59.712 155.493 0 146.235 0 111.967"/>
            </svg>
        </div>
    )
}
