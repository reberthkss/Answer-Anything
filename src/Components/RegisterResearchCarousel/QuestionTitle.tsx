import React, {ChangeEvent} from "react";
import {Input, TextField} from "@material-ui/core";
import "./QuestionTitle.css"

interface QuestionTitleProps {
    questionId: number,
    title: string,
    hasError: boolean,
    onQuestionTitleUpdate: (questionId: number, newValue: string) => void
}

const QuestionTitle = ({questionId, title, hasError, onQuestionTitleUpdate}: QuestionTitleProps) => {
    return (
        <div className={"title-container"}>
            <TextField
                value={title}
                onChange={({target: {value}}: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => onQuestionTitleUpdate(questionId, value)}
                error={hasError}
                autoFocus={true}
                label={"Pergunta"}
                helperText={"Não deixe o campo vazio!"}
                placeholder={"Digite a pergunta aqui"}
                className={"input-container"}
            />
        </div>
    )
}

export default QuestionTitle;
