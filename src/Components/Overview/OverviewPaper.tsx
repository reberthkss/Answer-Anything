import {Grid} from "@material-ui/core";
import React from "react";
import "./OverviewPaper.css"
export const OverviewPaper = ({children}: {children: any}) => {
    return (
        <Grid item className={"gridItemContainer"}>
            <div className={"gridItem"}>
                {children}
            </div>
        </Grid>
    )
}
