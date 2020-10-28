import React from "react"
import "./SocialMediaIcons.css"

export const InstagramIcon = ({onClick}: {onClick: () => void}) => {
    return (
        <div className={"cursor"} onClick={onClick}>
            <svg height={64} width={64} version="1.1" id="Layer_1"
                 x="0px" y="0px" viewBox="0 0 16 16">
                <linearGradient id="SVGID_1_" gradientUnits="userSpaceOnUse" x1="1.4645" y1="14.5355" x2="14.5355"
                                y2="1.4645">
                    <stop offset="0" stop-color="#FFC107"/>
                    <stop
                        offset="0.5074" stop-color="#F44336"/>
                    <stop offset="0.9901" stop-color="#9C27B0"/>
                </linearGradient>
                <path
                    d="M11 0H5a5 5 0 0 0-5 5v6a5 5 0 0 0 5 5h6a5 5 0 0 0 5-5V5a5 5 0 0 0-5-5zm3.5 11c0 1.93-1.57 3.5-3.5 3.5H5c-1.93 0-3.5-1.57-3.5-3.5V5c0-1.93 1.57-3.5 3.5-3.5h6c1.93 0 3.5 1.57 3.5 3.5v6z"
                    fill="url(#SVGID_1_)"/>
                <linearGradient id="SVGID_2_" gradientUnits="userSpaceOnUse" x1="5.1716" y1="10.8284" x2="10.8284"
                                y2="5.1716">
                    <stop offset="0" stop-color="#FFC107"/>
                    <stop offset="0.5074" stop-color="#F44336"/>
                    <stop offset="0.9901" stop-color="#9C27B0"/>
                </linearGradient>
                <path
                    d="M8 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8zm0 6.5A2.503 2.503 0 0 1 5.5 8c0-1.379 1.122-2.5 2.5-2.5s2.5 1.121 2.5 2.5c0 1.378-1.122 2.5-2.5 2.5z"
                    fill="url(#SVGID_2_)"/>
                <linearGradient id="SVGID_3_" gradientUnits="userSpaceOnUse" x1="11.9229" y1="4.0771" x2="12.6771"
                                y2="3.3229">
                    <stop offset="0" stop-color="#FFC107"/>
                    <stop offset="0.5074" stop-color="#F44336"/>
                    <stop offset="0.9901" stop-color="#9C27B0"/>
                </linearGradient>
                <circle cx="12.3" cy="3.7" r="0.533" fill="url(#SVGID_3_)"/>
            </svg>
        </div>
    )
}
