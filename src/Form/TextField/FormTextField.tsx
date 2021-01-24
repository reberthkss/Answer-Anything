import TextField from "@material-ui/core/TextField";
import React, {ChangeEvent, MutableRefObject, useEffect, useState} from "react";
import "./styles.css"

interface Props {
    field: string,
    title: string,
    onChangeCallback: (text: string) => void,
    onKeyPressCallback: (keyPressed: string) => void,
    isTextValidCallback: (text: string | null) => boolean,
    getRef: () => MutableRefObject<HTMLDivElement | null>,
    errorInField: boolean
}
export function FormTextField ({field, title, onChangeCallback, onKeyPressCallback, isTextValidCallback, getRef, errorInField}: Props) {
    const [text, setText] = useState<string | null>(null);
    const [hasError, setError] = useState<boolean>(false);

    function renderTextField() {
        return (
            <TextField
                inputRef={getRef()}
                placeholder={title}
                fullWidth
                onChange={(event) => {
                    setText(event.target.value);
                    if (isTextValidCallback(event.target.value)) {
                        onChangeCallback(event.target.value);
                    } else {
                        setError(true);
                    }
                }}
                onKeyPress={(event) => {
                    onKeyPressCallback(event.key);
                }}
                defaultValue={text}
            />
        )
    }

    function renderErrorField() {
        if (hasError || errorInField) {
            return (
                <div className={"spanErrorContainer"}>
                    <span className={"spanError"}>
                        Erro: O campo referente ao {field} deve estar preenchido. {/*TODO - i18n*/}
                    </span>
                </div>
            )
        } else {
            return null;
        }
    }
    return (
        <div className={"textField"}>
            {renderTextField()}
            {renderErrorField()}
        </div>
    )
}
