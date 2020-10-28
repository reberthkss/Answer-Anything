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
    apiKey: "AIzaSyDBobOssi0rAN6EIz6lroG5_nWXG6SCu4Q",
    authDomain: "answeranything-ce6e4.firebaseapp.com",
    databaseURL: "https://answeranything-ce6e4.firebaseio.com",
    projectId: "answeranything-ce6e4",
    storageBucket: "answeranything-ce6e4.appspot.com",
    messagingSenderId: "22067167918",
    appId: "1:22067167918:web:d0c72a3591c9cbd3ebe33f",
    measurementId: "G-65DDE6TH25"
};



export const getEnvironment = () => {
    return (!process.env.NODE_ENV || process.env.NODE_ENV === 'development' ) ? devConfig : prodConfig;
}

