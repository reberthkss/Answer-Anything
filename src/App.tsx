import React from 'react';
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

function App() {

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

export default App;
