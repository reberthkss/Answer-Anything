import React, {useState} from 'react';
import './App.css';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import {NotFound} from "./Screen/NotFound";
import {LoginScreen} from "./Screen/LoginScreen/LoginScreen";
import {MainScreen} from "./Screen/MainScreen/MainScreen";
import {RootDirectory} from "./Screen/RootDiretory/RootDirectory";
import {AnswerResearchScreen} from "./Screen/AnswerResearch/AnswerResearchScreen";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import {CircularProgress} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import enTranslation from "./utils/locales/en";
import ptBrTranslation from "./utils/locales/pt-br";
import XHR from "i18next-http-backend";
import LanguageDetector from 'i18next-browser-languagedetector';
import 'fontsource-roboto';
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
const fallbackLng = {
    'pt-br': ['pt'],
    'default': ['en']
}
const availableLanguages = ['pt', 'es', 'en'];

function App() {
    const [loading, setLoading] = useState(true);

    i18n
        .use(XHR)
        .use(LanguageDetector)
        .use(initReactI18next)
        .init({
            fallbackLng,
            detection: {
                order: ['querystring', 'navigator'],
                lookupQuerystring: 'lng'
            },
            debug: false,
            whitelist: availableLanguages,
            load: "languageOnly",
            resources: {
                en: {
                    common: enTranslation
                },
                pt: {
                    common: ptBrTranslation
                }
            },
            ns: ['common'],
            defaultNS: 'common',
            interpolation: {
                escapeValue: false,
            },
        })
        .then(() => {
            setLoading(false);
        });

    if (loading) {
        return (
            <div>
                <CircularProgress/>
            </div>
        )
    } else {
        try {
            return (
                <Router>
                    <Grid container xs={12} sm={12} md={12} lg={12} xl={12}>
                        <Switch>
                            <Route path={"/"} exact component={RootDirectory}/>
                            <Route path="/dashboard"  component={MainScreen}/>
                            <Route path="/login"  component={LoginScreen}/>
                            <Route exact path={"/researchs/:id"} component={AnswerResearchScreen}/>
                            <Route path={"*"} component={NotFound}/>
                        </Switch>
                        <ToastContainer
                            position="top-right"
                            autoClose={3000}
                            closeOnClick
                            rtl={false}
                            pauseOnHover
                        />
                    </Grid>
                </Router>
            );
        } catch (e) {
            console.log(e);
            return <div>
                Error!
            </div>
        }
    }
}

export default App;
