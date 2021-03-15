import React, {useEffect} from "react";
import { Route, Switch, useHistory, useRouteMatch} from "react-router-dom";
import "./MainScreen.css"
import {AppToolbar} from "../../Components/AppToolbar/AppToolbar";
import {ReduxState} from "../../redux/reducer";
import {useSelector} from "react-redux";
import {DashboardScreen} from "../DashboardScreen/DashboardScreen";
import {Grid} from "@material-ui/core";




export const MainScreen = () => {
    const history = useHistory();
    let {path, url} = useRouteMatch();
    const user = useSelector((state: ReduxState) => state.user);

    /* TODO - FIX ME - Security
    * USER CAN EDIT LOCAL STORAGE DATA AND THEN GET ACCESS TO MAIN SCREEN
    * */

    useEffect(() => {
        if (user == null) {
            history.push("/login");
        }
    }, [user]);

    return (
        <Grid container xs={12} sm={12} md={12} lg={12} xl={12}>
            <AppToolbar/>
            <Grid container item>
                <Switch>
                    <Route path={path} component={DashboardScreen}/>
                </Switch>
            </Grid>
        </Grid>
    )
}

