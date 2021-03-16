import React, {useEffect, useState} from "react";
import "./DashboardScreen.css"
import {
    Switch,
    Route,
    useRouteMatch
} from "react-router-dom";
import {SelectResearch} from "../../Components/SelectResearch/SelectResearch";
import {FirestoreManager} from "../../utils/Services/FirebaseManager/FirestoreManager";
import {CircularProgress} from "@material-ui/core";
import {RegisterResearchScreen} from "./RegisterResearch/RegisterResearchScreen";
import Analysis from "./Analysis/Analysis";
import {NotFound} from "../NotFound";
import {isDevEnv} from "../../utils/utils";
export const DashboardScreen = () => {
    const { path } = useRouteMatch();
    const [loading, setLoading] = useState(true);
    const firestoreManager = new FirestoreManager();
    const loadData = async () => {
        const res = await firestoreManager.read();
        if (res.result) {
            isDevEnv() && console.log("Success set listener!");
        } else {
            isDevEnv() && console.log("Error on set listener!");
        }
        setLoading(false);
    }
    useEffect(() => {
        /* TODO - Find ways to reduce requests to firestore */
        loadData();
        return () => {
            firestoreManager.clearReadSubscription();
        }
    }, [])
    const _renderPage = () => {
        if (loading) {
            return <div className={"loadingIndicatorDiv"}>
                <CircularProgress/>
            </div>
        } else {
            return (
                <Switch>
                    <Route path={path} exact component={SelectResearch}/>
                    <Route path={`${path}/research/:id`} component={Analysis}/>
                    <Route path={`${path}/register-research/:id`} component={RegisterResearchScreen}/>
                    <Route path={"*"} component={NotFound}/>
                </Switch>
            )
        }
    }
    return (
        <div className={"mainContainerDashboardScreen"}>
            {_renderPage()}
        </div>
    )
}
