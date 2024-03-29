import React, {ChangeEvent, useState} from "react";
import "./Greeting.css";
import {TextField} from "@material-ui/core";
import {Validators} from "../../utils/Validators/Validators";
import {UserData} from "./AnswerResearchCarousel";
import {isDevEnv} from "../../utils/utils";
import {useTranslation} from "react-i18next";


interface Status {
    error: boolean,
    message: string
}

interface InputStatus {
    email: Status,
    name: Status
}

interface GreetingProps {
    title: string,
    description: string,
    onStartQuestionnaire: (userData: UserData) => void
}


export const Greeting = ({title, description, onStartQuestionnaire}: GreetingProps) => {
    const [inputsStatus, setInputStatus] = useState<InputStatus>({
        email: {error: false, message: ""},
        name: {error: false, message: ""}
    });
    const {t} = useTranslation();
    const [userData, setUserData] = useState<{ email: string, name: string }>({email: isDevEnv() ? "reberthkss@outlook.com" : "", name: isDevEnv() ? "reberth": ""});

    const onBlurEmail = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        if (!Validators.isEmailValid(event.target.value)) {
            setInputStatus({...inputsStatus, email: {error: true, message: t("invalid_email")}})
        } else {
            setUserData({...userData, email: event.target.value});
        }
    }

    const onBlurName = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        if (event.target.value.length === 0) {
            setInputStatus({...inputsStatus, name: {error: true, message: t("invalid_name")}})
        } else {
            setUserData({...userData, name: event.target.value});
        }
    }

    const onFocusEmail = () => {
        setInputStatus({...inputsStatus, email: {error: false, message: ""}})
    }

    const onFocusName = () => {
        setInputStatus({...inputsStatus, name: {error: false, message: ""}})
    }

    const handleStartEvent = () => {
        if (userData.name.length === 0 && userData.email.length === 0) {
            setInputStatus({
                email: {error: true, message: t("type_the_email")},
                name: {error: true, message: t("type_the_name")}
            });
        } else if (userData.name.length === 0) {
            setInputStatus({...inputsStatus, name: {error: true, message: t("type_the_name")}});
        } else if (userData.email.length === 0) {
            setInputStatus({...inputsStatus, email: {error: true, message: t("type_the_email")}});
        } else {
            onStartQuestionnaire(userData);
        }
    }

    return (
        <div className={"greetingRootContainer"}>
            <div className={"greetingTitleContainer"}>
                {title}
            </div>
            <div className={"greetingDescriptionContainer"}>
                {description}
            </div>
            <div className={"greetingUserDataContainer"}>
                <div className={"inputContainer"}>
                    <div className={"input-sub-container"}>
                        <TextField id="outlined-basic" label="E-mail" variant="outlined" required
                                   fullWidth
                                   type={"email"}
                                   error={inputsStatus.email.error}
                                   helperText={inputsStatus.email.message}
                                   onBlur={onBlurEmail}
                                   onFocus={onFocusEmail}
                        />
                    </div>
                </div>
                <div className={"inputContainer"}>
                    <div className={"input-sub-container"}>
                        <TextField id="outlined-basic" label={t("name_label")} variant="outlined" required
                                   fullWidth
                                   type={"text"}
                                   error={inputsStatus.name.error}
                                   helperText={inputsStatus.name.message}
                                   onChange={onBlurName}
                                   onFocus={onFocusName}
                        />
                    </div>
                </div>
            </div>
            <div className={"greetingNextSectionContainer"}>
                <div className={"startAnswerButton"} style={{borderRadius: 5}} onClick={handleStartEvent}>
                    {t("start")}
                </div>
            </div>
        </div>
    )
}
