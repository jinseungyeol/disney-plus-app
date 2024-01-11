// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCUxLaRQxl7OpI4jEKn4poeEr8ceCocEv4",
  authDomain: "react-disney-plus-app-6c49c.firebaseapp.com",
  projectId: "react-disney-plus-app-6c49c",
  storageBucket: "react-disney-plus-app-6c49c.appspot.com",
  messagingSenderId: "741804434463",
  appId: "1:741804434463:web:5fa4fc2ab7bbc3e251212a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;