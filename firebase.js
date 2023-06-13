import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD0oxE9r3YNGWWiMgFTcOV5nqvJyGhb1rE",
  authDomain: "wechat-4b52f.firebaseapp.com",
  projectId: "wechat-4b52f",
  storageBucket: "wechat-4b52f.appspot.com",
  messagingSenderId: "955323002965",
  appId: "1:955323002965:web:820d4656fcbf04c2cbe4dc",
};
// Initialize Firebase

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const database = getFirestore();
