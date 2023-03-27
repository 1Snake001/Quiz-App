// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDfXiRXdAP3ZN10aaQeA-YTHXqAHKz6siM",
    authDomain: "quiz-app-3843c.firebaseapp.com",
    projectId: "quiz-app-3843c",
    storageBucket: "quiz-app-3843c.appspot.com",
    messagingSenderId: "696597494557",
    appId: "1:696597494557:web:305acb9917d48480ab7ff4"
  };
  
// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);