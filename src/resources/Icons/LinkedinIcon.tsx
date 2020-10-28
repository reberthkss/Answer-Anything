import React from "react"
import "./SocialMediaIcons.css"

export const LinkedinIcon = ({onClick}: {onClick: () => void}) => {
    return (
        <div className={"cursor"} onClick={onClick}>
            <svg width="64px" height="64px"
                 viewBox="0 0 72 72" version="1.1"><title>linkedin</title>
                <g id="providers-list" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                    <g id="linkedin">
                        <rect id="Rectangle-2" fill="#117EB8" x="0" y="0" width="72" height="72" rx="4"/>
                        <path
                            d="M13.139 27.848h9.623V58.81h-9.623V27.848zm4.813-15.391c3.077 0 5.577 2.5 5.577 5.577 0 3.08-2.5 5.581-5.577 5.581a5.58 5.58 0 1 1 0-11.158zm10.846 15.39h9.23v4.231h.128c1.285-2.434 4.424-5 9.105-5 9.744 0 11.544 6.413 11.544 14.75V58.81h-9.617V43.753c0-3.59-.066-8.209-5-8.209-5.007 0-5.776 3.911-5.776 7.95V58.81h-9.615V27.848z"
                            id="Shape" fill="#FFF"/>
                    </g>
                </g>
            </svg>
        </div>
    )
}
