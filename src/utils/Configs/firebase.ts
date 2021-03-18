import * as firebase from "firebase/app";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const prodConfig = {
    apiKey: "AIzaSyDBobOssi0rAN6EIz6lroG5_nWXG6SCu4Q",
    authDomain: "answeranything-ce6e4.firebaseapp.com",
    databaseURL: "https://answeranything-ce6e4.firebaseio.com",
    projectId: "answeranything-ce6e4",
    storageBucket: "answeranything-ce6e4.appspot.com",
    messagingSenderId: "22067167918",
    appId: "1:22067167918:web:e75453648307b089ebe33f",
    measurementId: "G-1M53QVVXGC"
};

const devConfig = {
    apiKey: "AIzaSyCDii-6q6qaZxelX10HWu-Uj7BY8y5YX0Q",
    authDomain: "answer-anything-dev.firebaseapp.com",
    projectId: "answer-anything-dev",
    storageBucket: "answer-anything-dev.appspot.com",
    messagingSenderId: "188845554984",
    appId: "1:188845554984:web:c2b96275ff0f646f9ba41d",
    measurementId: "G-8NQ4PY4M8J"
};



export const getEnvironment = () => {
    return prodConfig;
    // return (!process.env.NODE_ENV || process.env.NODE_ENV === 'development' ) ? devConfig : prodConfig;
}

