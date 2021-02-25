import React, {useEffect, useState} from "react";
import "./NewOption.css"
import DeleteIcon from '@material-ui/icons/Delete';
import {Tooltip} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import {useTranslation} from "react-i18next";
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
interface NewOptionProps {
    id: string,
    onDeleteOption: (id: string) => void,
    onUpdateValue: (option: string) => void,
    onKeyPressed: (id: string, keyPressed: string) => void,
    value: string,
}
export const NewOption = ({onDeleteOption, onUpdateValue, value = "", id, onKeyPressed }: NewOptionProps) => {
    const [error, setError] = useState(false);
    const [optionValue, setOption] = useState<string>( "");
    const {t} = useTranslation();

    const _fieldAreInvalid = (value: string) => {
        if (value === "" || value == null) {
            return true;
        } else {
            return false;
        }
    }

    const _handleKey = (event: React.KeyboardEvent<HTMLInputElement>) => {
        onKeyPressed(id, event.key);
        if (event.key === "Enter") {
            if (_fieldAreInvalid(event.currentTarget.value)) {
                setError(true);
                return;
            } else {
                onUpdateValue(optionValue);
            }
        }
    }

    const _renderErrorMessage = () => {
        if (error) {
            return t("field_must_be_filled");
        } else {
            return "";
        }
    }

    const _renderOptionField = () => {
        return (
            <div className={"optionQuestionEnabledContainer"}>
                <div className={"text-input-container"}>
                    <input
                        id={id}
                        type={"text"}
                        className={"optionQuestionEnabled"}
                        onKeyDown={_handleKey}
                        onChange={(event) => setOption(event.target.value)}
                        value={optionValue}
                        placeholder={t("tip_a_option")}
                        onBlur={() => setError(false)}
                    />
                    <Tooltip title={"Remover pergunta"}>
                        <IconButton onClick={() => onDeleteOption(id)}>
                            <RemoveCircleOutlineIcon/>
                        </IconButton>
                    </Tooltip>
                </div>
                <span className={"spanError"}>
                        {_renderErrorMessage()}
                </span>
            </div>
        )
    }

    return (
        <div className={"optionQuestionDiv"} >
            {_renderOptionField()}
        </div>
        )
}
