import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {PersistGate} from "redux-persist/integration/react";
import { Provider } from 'react-redux';
import {store, persistor} from "./redux/ConfigureStore";
import {getEnvironment} from "./utils/Configs/firebase";
import firebase from "firebase";
export const app = firebase.initializeApp(getEnvironment());

if (window.location.hostname == "localhost") {
    app.firestore().settings({
        host: "localhost:8080", ssl: false
    })

}

ReactDOM.render(
  <React.StrictMode>
      <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
              <App />
          </PersistGate>
      </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
