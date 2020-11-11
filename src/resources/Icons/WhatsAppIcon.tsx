import React from "react"
import "./SocialMediaIcons.css"

export const WhatsappIcon = () => {
    return (
        <div className={"cursor"}>
            <svg xmlns="http://www.w3.org/2000/svg"
                 fill="#fff"
                 height={64} width={64}
                 aria-label="WhatsApp"
                 viewBox="0 0 512 512">
                <rect width="512" height="512" fill="#45d354" rx="15%"/>
                <path
                    d="M308 273c-3-2-6-3-9 1l-12 16c-3 2-5 3-9 1-15-8-36-17-54-47-1-4 1-6 3-8l9-14c2-2 1-4 0-6l-12-29c-3-8-6-7-9-7h-8c-2 0-6 1-10 5-22 22-13 53 3 73 3 4 23 40 66 59 32 14 39 12 48 10 11-1 22-10 27-19 1-3 6-16 2-18"/>
                <path
                    d="M264 384c-41 0-72-22-72-22l-49 13 12-48s-20-31-20-70c0-72 59-132 132-132 68 0 126 53 126 127 0 72-58 131-129 132m-159 29l83-23a158 158 0 0 0 230-140c0-86-68-155-154-155a158 158 0 0 0-137 236"/>
            </svg>
        </div>
    )
}
