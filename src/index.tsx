import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {PersistGate} from "redux-persist/integration/react";
import { Provider } from 'react-redux';
import {store, persistor} from "./redux/ConfigureStore";
import {getEnvironment} from "./utils/config";
import firebase from "firebase";

export const app = firebase.initializeApp(getEnvironment());


async function mockDataFirestore() {
    try {
        const document = await app
            .firestore()
            .collection("test")
            .add({
                "value": 1
            });
        await document
            .collection("value")
            .add({
                "value": 2
            });
    } catch (e) {
        console.log(`Error => ${e.message}`);
    }
}
if (window.location.hostname == "localhost") {
    app.firestore().settings({
        host: "localhost:8080", ssl: false
    })
    /*mockDataFirestore().then(() => {
        console.log("Finnaly mocked data!");
    })*/

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
