import React, {useState} from "react";
import "./NewOption.css"
import DeleteIcon from '@material-ui/icons/Delete';
import {Tooltip} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";

interface NewOptionProps {
    onDeleteOption: () => void,
    onUpdateValue: (option: string) => void,
    value: string | null,
}
export const NewOption = ({onDeleteOption, onUpdateValue, value = null, }: NewOptionProps) => {
    const [disabled, setDisabled] = useState(value != null);
    const [error, setError] = useState(false);
    const [optionValue, setOption] = useState<string>(value != null ? value : "");
    const _fieldAreInvalid = (value: string) => {
        if (value === "" || value == null) {
            return true;
        } else {
            return false;
        }
    }

    const _handleKey = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            if (_fieldAreInvalid(event.currentTarget.value)) {
                setError(true);
                return;
            } else {
                setOption(event.currentTarget.value);
                setDisabled(!disabled);
                onUpdateValue(optionValue!!);
            }
        }
    }

    const _renderErrorMessage = () => {
        if (error) {
            return ("O campo deve estar preenchido"); {/*TODO - i18n*/}
        } else {
            return "";
        }
    }

    const _deleteOption = () => {
        onDeleteOption();
    }

    const _renderOptionField = () => {
        if (disabled) {
            return <div className={"optionQuestionDisabledDiv"}>
                <div className={"optionQuestionDisabled"} onClick={() => {
                    setDisabled(!disabled);
                }}>
                    {optionValue}
                </div>
                <div className={"deleteOptionButton"}>
                    {/*TODO - i18n*/}
                    <Tooltip title={"Deletar esta opção"}>
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
                        type={"text"}
                        defaultValue={optionValue}
                        className={"optionQuestionEnabled"}
                        autoFocus={true}
                        onKeyDown={_handleKey}
                        onChange={(event) => setOption(event.target.value)}
                        placeholder={"Digite aqui uma possivel resposta"}
                        onBlur={() => setError(false)}
                    />{/*TODO - i18n*/}
                    <span className={"spanError"}>
                        {_renderErrorMessage()}
                    </span>
                </div>
            )
        }
    }

    return (
        <div className={"optionQuestionDiv"} >
            {_renderOptionField()}
        </div>
        )
}
