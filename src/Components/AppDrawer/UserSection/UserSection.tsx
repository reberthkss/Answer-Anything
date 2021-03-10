import React from "react"
import {Avatar, Grid, Typography} from "@material-ui/core";
import "./UserSection.css"
import {useSelector} from "react-redux";
import {ReduxState} from "../../../redux/reducer";

interface UserSectionProps {
    avatar: string,
    name: string,
    email: string
}

export const UserSection = ({avatar, name, email}: UserSectionProps) => {
    return (
        <div className={"user-section-root-container"}>
            <Grid container direction={"column"}
                  xs={12} sm={12} md={12} lg={12} xl={12}
                  className={""}
                  spacing={1}
            >
                <Grid item>
                    <Avatar src={avatar}> {name[0]}</Avatar>
                </Grid>
                <Grid item direction={"column"} >
                    <Typography>
                        {name}
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography>
                        {email}
                    </Typography>
                </Grid>

            </Grid>
        </div>
    )
}
