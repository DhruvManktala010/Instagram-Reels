import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
const firebaseConfig = {
    apiKey: "AIzaSyBsjErcGT_QhTLdQ5Rhv-pFeWtGZzhQZSI",
    authDomain: "instgram-reels-f5d5a.firebaseapp.com",
    projectId: "instgram-reels-f5d5a",
    storageBucket: "instgram-reels-f5d5a.appspot.com",
    messagingSenderId: "194027366195",
    appId: "1:194027366195:web:83550c91f58912c1b54046"
  };
firebase.initializeApp(firebaseConfig);
export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const storage = firebase.storage();
export const signInWithGoogle = () => {
  auth.signInWithPopup(provider);
}


