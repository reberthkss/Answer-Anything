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
    onDeleteOption: () => void,
    onUpdateValue: (option: string) => void,
    onKeyPressed: (id: string, keyPressed: string) => void,
    value: string | null,
}
export const NewOption = ({onDeleteOption, onUpdateValue, value = null, id, onKeyPressed }: NewOptionProps) => {
    const [disabled, setDisabled] = useState(value != null);
    const [error, setError] = useState(false);
    const [optionValue, setOption] = useState<string | null>( null);
    const {t} = useTranslation();

    useEffect(() => {
        setOption(value);
    }, [value]);
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
                setDisabled(!disabled);
                onUpdateValue(optionValue || "");
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

    const _deleteOption = () => {
        onDeleteOption();
    }

    const _renderOptionField = () => {
       /* if (disabled) {
            return <div className={"optionQuestionDisabledDiv"} id={id}>
                <div className={"optionQuestionDisabled"} onClick={() => {
                    setDisabled(!disabled);
                }}>
                    {optionValue}
                </div>
                <div className={"deleteOptionButton"}>
                    <Tooltip title={(t("delete_this_option")).toString()}>
                        <IconButton>
                            <DeleteIcon onClick={_deleteOption}/>
                        </IconButton>
                    </Tooltip>
                </div>
            </div>
        } else {
            return (
                <div className={"optionQuestionEnabledContainer"}>
                    <input
                        id={id}
                        type={"text"}
                        defaultValue={optionValue || ""}
                        className={"optionQuestionEnabled"}
                        onKeyDown={_handleKey}
                        onChange={(event) => setOption(event.target.value)}
                        placeholder={t("tip_a_option")}
                        onBlur={() => setError(false)}
                    />
                    <span className={"spanError"}>
                        {_renderErrorMessage()}
                    </span>
                </div>
            )
        }*/
        return (
            <div className={"optionQuestionEnabledContainer"}>
                <div className={"text-input-container"}>
                    <input
                        id={id}
                        type={"text"}
                        defaultValue={optionValue || ""}
                        className={"optionQuestionEnabled"}
                        onKeyDown={_handleKey}
                        onChange={(event) => setOption(event.target.value)}
                        placeholder={t("tip_a_option")}
                        onBlur={() => setError(false)}
                    />
                    <Tooltip title={"Adicionar pergunta abaixo"}>
                        <IconButton onClick={() => null}> {/* TODO */}
                            <AddCircleOutlineIcon/>
                        </IconButton>
                    </Tooltip>
                    <Tooltip title={"Remover pergunta"}>
                        <IconButton onClick={() => null}> {/* TODO */}
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
