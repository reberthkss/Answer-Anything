import React, {ChangeEvent} from "react";
import {TextField} from "@material-ui/core";
import "./QuestionTitle.css"
import {useTranslation} from "react-i18next";

interface QuestionTitleProps {
    questionId: number,
    title: string,
    hasError: boolean,
    onQuestionTitleUpdate: (questionId: number, newValue: string) => void
}

const QuestionTitle = ({questionId, title, hasError, onQuestionTitleUpdate}: QuestionTitleProps) => {
    const {t} = useTranslation();
    return (
        <div className={"title-container"}>
            <TextField
                value={title}
                onChange={({target: {value}}: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => onQuestionTitleUpdate(questionId, value)}
                error={hasError}
                autoFocus={true}
                label={t("question_title_label")}
                helperText={t("dont_let_field_empty")}
                placeholder={t("place_a_question_here")}
                className={"input-container"}
            />
        </div>
    )
}

export default QuestionTitle;
