import React from "react";
import {RegisterCarousel} from "../../Components/RegisterResearchCarousel/RegisterResearchCarousel";
import "./RegisterResearchScreen.css";
import {Step, StepLabel, Stepper} from "@material-ui/core";

export const RegisterResearchScreen = () => {
    return (
        <div className={"registerScreenDiv"}>
            <RegisterCarousel/>
        </div>
    )
}
