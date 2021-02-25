import React, {ChangeEvent} from "react";
import {Input} from "@material-ui/core";
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
            <Input
                value={title}
                onChange={({target: {value}}: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => onQuestionTitleUpdate(questionId, value)}
                error={hasError}
                className={"input-container"}
            />
        </div>
    )
}

export default QuestionTitle;
