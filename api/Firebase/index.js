import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyAwBpORQGp0_qUQQkaRG9mn1tgaeFUJIcw",
    authDomain: "note-taking-app-4fbf5.firebaseapp.com",
    projectId: "note-taking-app-4fbf5",
    storageBucket: "note-taking-app-4fbf5.appspot.com",
    messagingSenderId: "265510819849",
    appId: "1:265510819849:web:3eed24540f5fefe1dc40d8",
    measurementId: "G-6EMN2RXD2N"
  };

 // Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;