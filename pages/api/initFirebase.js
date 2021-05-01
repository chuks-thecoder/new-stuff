import firebase from "firebase/app";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyCLI8fuFd8efLkossZAO2_YMg_FPTMjrlk",
  authDomain: "expo-f311c.firebaseapp.com",
  projectId: "expo-f311c",
  databaseURL: "https://expo-f311c-default-rtdb.firebaseio.com/",
  storageBucket: "expo-f311c.appspot.com",
  messagingSenderId: "120651137780",
  appId: "1:120651137780:web:16ddeb857be221b1f194a1",
};

export default function initFirebase() {
  if (!firebase.apps.length) {
    firebase.initializeApp(config);
  }
}
