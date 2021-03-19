import React, {ChangeEvent} from "react";
import {OptionState} from "./RegisterQuestions";
import Scrollbar from "react-scrollbars-custom";
import {IconButton, Input, TextField, Tooltip} from "@material-ui/core";
import {Add, Remove} from "@material-ui/icons";
import "./QuestionOptions.css"
import {useTranslation} from "react-i18next";
interface QuestionOptionsProps {
    questionId: number,
    options: OptionState[],
    onQuestionOptionUpdate: (questionIndex: number, optionIndex: number, newValue: string) => void,
    addNewOption: (questionIndex: number, optionIndex: number) => void,
    removeOption: (questionIndex: number, optionIndex: number) => void
}
const QuestionOptions = ({questionId, options, onQuestionOptionUpdate, addNewOption, removeOption}: QuestionOptionsProps) => {
    const {t} = useTranslation();
    const removeOptionIsEnabled = (options: OptionState[]) => options.length == 1;
    return (
        <Scrollbar>
            <div className={"options-container"}>
                {options.map((option, index) => (
                    <div className={"option-container"}>
                        <TextField
                            value={option.payload}
                            onChange={({target: {value}}: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => onQuestionOptionUpdate(questionId, option.index, value)}
                            error={!option.isValid}
                            multiline={true}
                            label={t("option_label", {optionNumber: index+1})}
                            placeholder={t("option_field_placeholder")}
                            helperText={t("dont_let_field_empty")}
                            className={"input-container"}
                        />
                        <div className={"actions-container"}>
                            <Tooltip title={() => t("add_option_tooltip")}>
                                <IconButton onClick={() => addNewOption(questionId, option.index)}>
                                    <Add/>
                                </IconButton>
                            </Tooltip>
                            <Tooltip title={() => t("remove_option_tooltip")}>
                                <IconButton onClick={() => removeOption(questionId, option.index)} disabled={removeOptionIsEnabled(options)}>
                                    <Remove/>
                                </IconButton>
                            </Tooltip>
                        </div>
                    </div>
                ))}
            </div>
        </Scrollbar>
    )
}

export default QuestionOptions;
