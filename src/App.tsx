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
import { useTranslation, initReactI18next } from "react-i18next";
import {Loading} from "./Components/AnimatedComponents/Loading/Loading";
import {CircularProgress} from "@material-ui/core";
import LanguageDetector from 'i18next-browser-languagedetector';


function App() {
    const [loading, setLoading] = useState(true);
    i18n
        .use(initReactI18next) // passes i18n down to react-i18next
        .use(LanguageDetector)
        .init({
            resources: {
                en: {
                    translation: {
                        "select_research": "Select a research",
                        "go_back": "Back",
                        "go_next": "Next",
                        "thanks_for_answer": "Thank you to answered our research!",
                        "privacy_text_information": "The answer were be registered on the Answer Anything servers. All data is storage following the privacy policies.",
                        "start": "START",
                        "register_new_research": "Register new research",
                        "home": "Home",
                        "sign_out": "Sign out",
                        "field_must_be_filled": "The field must be filled",
                        "delete_this_option": "Remove this option",
                        "tip_a_option": "Type it here a option",
                        "information": "Information",
                        "type_some_message_to_share_with_link": "Type here some message to share with link",
                        "new_option": "New option",
                        "the_question": "the question",
                        "which_question": "Say the question",
                        "new_question": "New question",
                        "share": "Share with your friends with that url below: ",
                        "or_share_in_social_media": "Or share on your social media: ",
                        "copy": "Copy",
                        "no_data_available": "No data available",
                        "survey_anywhere": "Survey anywhere you want",
                        "create_a_survey": "Create a survey",
                        "create_a_survey_description": "with an intuitive and minimalist interface. Start a quick poll, create a questionnaire and more.",
                        "review": "Review",
                        "review_description": "the data collected in an organized and automatic way with the aid of graphs"
                    }
                },
                pt: {
                    translation: {
                        "select_research": "Selecione uma pesquisa",
                        "go_back": "Voltar",
                        "go_next": "Próximo",
                        "thanks_for_answer": "Obrigado por responder nossa pesquisa!",
                        "privacy_text_information": "A resposta será registrada nos servidores do Answer Anything. Toda data é armazenada seguindo as politicas de privacidades.",
                        "start": "COMEÇAR",
                        "register_new_research": "Registrar nova pesquisa",
                        "home": "Inicio",
                        "sign_out": "Sair",
                        "field_must_be_filled": "O campo deve estar preenchido",
                        "delete_this_option": "Remover está opção",
                        "tip_a_option": "Digite aqui uma possivel resposta",
                        "information": "Informações",
                        "type_some_message_to_share_with_link": "Digite uma mensagem para ser compartilhada junto ao link",
                        "new_option": "Nova opção",
                        "the_question": "a pergunta",
                        "which_question": "Qual sua pergunta?",
                        "new_question": "Nova questão",
                        "share": "Compartilhe com seus amigos com o link abaixo: ",
                        "or_share_in_social_media": "Ou compartilhe em suas mídias sociais: ",
                        "copy": "Copiar",
                        "no_data_available": "Nenhum dado disponível",
                        "survey_anywhere": "Pesquise onde você quiser",
                        "create_a_survey": "Crie uma pesquisa",
                        "create_a_survey_description": "com uma interface intuitiva e minimalista. Prepare uma enquete rápida, crie um questionário e muito mais.",
                        "review": "Analise",
                        "review_description": "os dados coletados de forma organizada e automática com auxilio de gráficos"
                    }
                }
            },
            fallbackLng: 'en',
            supportedLngs: ["pt", "en"],
            load: "all",
            interpolation: {
                escapeValue: false
            }
        }).then(() => {
        setLoading(false);
    })

    if (loading) {
        return (
            <div>
                <CircularProgress/>
            </div>
        )
    } else {
        return (
            <Router>
                <div>
                    <Switch>
                        <Route path={"/"} exact component={RootDirectory}/>
                        <Route path="/dashboard"  component={MainScreen}/>
                        <Route path="/login"  component={LoginScreen}/>
                        <Route exact path={"/researchs/:id"} component={AnswerResearchScreen}/>
                        <Route path={"*"} component={NotFound}/>
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default App;
