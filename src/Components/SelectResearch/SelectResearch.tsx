import React from "react";
import "./SelectResearch.css"
import { useTranslation, initReactI18next } from "react-i18next";

export const SelectResearch = () => {
    /* Create carroussel to questions */
    /* Like: step 1, step 2, step 3*/
    const {t} = useTranslation();
    return (
        <div className={"root"}>
            {t("select_research")}
        </div>
    )
}
