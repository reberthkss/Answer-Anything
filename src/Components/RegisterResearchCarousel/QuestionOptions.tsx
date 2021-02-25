import React, {ChangeEvent} from "react";
import {OptionState} from "./RegisterQuestions";
import Scrollbar from "react-scrollbars-custom";
import {IconButton, Input, Tooltip} from "@material-ui/core";
import {Add, Remove} from "@material-ui/icons";
import "./QuestionOptions.css"
interface QuestionOptionsProps {
    questionId: number,
    options: OptionState[],
    onQuestionOptionUpdate: (questionIndex: number, optionIndex: number, newValue: string) => void,
    addNewOption: (questionIndex: number, optionIndex: number) => void,
    removeOption: (questionIndex: number, optionIndex: number) => void
}
const QuestionOptions = ({questionId, options, onQuestionOptionUpdate, addNewOption, removeOption}: QuestionOptionsProps) => {
    return (
        <Scrollbar>
            <div className={"options-container"}>
                {options.map((option) => (
                    <div className={"option-container"}>
                        <Input
                            value={option.payload}
                            onChange={({target: {value}}: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => onQuestionOptionUpdate(questionId, option.index, value)}
                            error={!option.isValid}
                            multiline={true}
                            className={"input-container"}
                        />
                        <div className={"actions-container"}>
                            <Tooltip title={"Adicionar"}>
                                <IconButton onClick={() => addNewOption(0, option.index)}>
                                    <Add/>
                                </IconButton>
                            </Tooltip>
                            <Tooltip title={"Remover"}>
                                <IconButton onClick={() => removeOption(0, option.index)}>
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
