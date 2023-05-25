// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyD1bN8NkV6P_wLTBrEC6g0sW9vPI3l9kHA",
    authDomain: "netflix-website-dc9cd.firebaseapp.com",
    databaseURL: "https://netflix-website-dc9cd-default-rtdb.firebaseio.com",
    projectId: "netflix-website-dc9cd",
    storageBucket: "netflix-website-dc9cd.appspot.com",
    messagingSenderId: "347582678648",
    appId: "1:347582678648:web:5ad0aa746a8afd5b5e8f8d",
    measurementId: "G-W37P2CGQ6X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);