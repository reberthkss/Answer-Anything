import React, {useEffect, useState} from "react";
import "./DashboardScreen.css"
import {
    Switch,
    Route,
    useRouteMatch
} from "react-router-dom";
import {SelectResearch} from "../../Components/SelectResearch/SelectResearch";
import {ResearchList} from "../../Components/ResearchList/ResearchList";
import {FirestoreManager} from "../../utils/Services/FirebaseManager/FirestoreManager";
import {CircularProgress} from "@material-ui/core";
import {RegisterResearchScreen} from "../RegisterResearch/RegisterResearchScreen";
import {Analysis} from "../Analysis/Analysis";
export const DashboardScreen = () => {
    const { path } = useRouteMatch();
    const [loading, setLoading] = useState(true);
    const firestoreManager = new FirestoreManager();
    useEffect(() => {
        /* TODO - Find ways to reduce requests to firestore */
        firestoreManager.read().then(() => {
            setLoading(false);
        })
    }, [])
    /* TODO - ADD LOADING */
    const _renderPage = () => {
        if (loading) {
            return <div className={"loadingIndicatorDiv"}>
                <CircularProgress/>
            </div>
        } else {
            return (
                <>
                    <ResearchList/>
                    <Switch>
                        <Route path={path} exact component={SelectResearch}/>
                        <Route path={`${path}/research/:id`} component={Analysis}/>
                        <Route path={`${path}/register-research/:id`} component={RegisterResearchScreen}/>
                    </Switch>
                </>
            )
        }
    }
    return (
        <div className={"mainContainerDashboardScreen"}>
            {_renderPage()}
        </div>
    )
}
