import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyByi96ZlDi4S8MhxxzZBiYNBOYl8bLVrq0",
    authDomain: "mallassassins.firebaseapp.com",
    databaseURL: "http://localhost:4000/database/mallassassins/data",
    projectId: "mallassassins",
    storageBucket: "mallassassins.appspot.com",
    messagingSenderId: "132794183326",
    appId: "1:132794183326:web:47d916ec283f2726a2158f"
  };

const app = initializeApp(firebaseConfig);

export default app;