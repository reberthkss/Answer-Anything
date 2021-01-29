import React, {useEffect} from "react";
import { Route, Switch, useHistory, useRouteMatch} from "react-router-dom";
import "./MainScreen.css"
import {ConfigurationScreen} from "../ConfigurationScreen/ConfigurationScreen";
import {AppToolbar} from "../../Components/AppToolbar/AppToolbar";
import {ReduxState} from "../../redux/reducer";
import {useSelector} from "react-redux";
import {DashboardScreen} from "../DashboardScreen/DashboardScreen";
import {RegisterResearchScreen} from "../RegisterResearch/RegisterResearchScreen";
import {ReadResearchCarousel} from "../../Components/ReadResearchCarousel/ReadResearchCarousel";




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
        <div>
            <AppToolbar/>
            <Switch>
                <Route path={path} component={DashboardScreen}/>
                {/*<Route path={`${path}/configurations`} component={ConfigurationScreen}/>*/}
                {/*<Route path={`${path}/register-research`} component={RegisterResearchScreen}/>*/}
            </Switch>
        </div>
    )
}

