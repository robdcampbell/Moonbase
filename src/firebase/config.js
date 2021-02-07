import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const app = firebase.initializeApp({
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
});

// Instance of authentication
export const auth = app.auth();
// DB and storage tokens
export const firestore = firebase.firestore();
export const storage = firebase.storage();
/*
OPTIONS WHEN ACCESSING FIREBASE
console.log(firebase.app().options);
*/
