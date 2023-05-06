// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAruGHYD4U7yK7p8NWVPpr300bGoDKocKk",
  authDomain: "personal-finance-dashboa-816ca.firebaseapp.com",
  projectId: "personal-finance-dashboa-816ca",
  storageBucket: "personal-finance-dashboa-816ca.appspot.com",
  messagingSenderId: "823369155791",
  appId: "1:823369155791:web:7f21bd8303f5214751a3ba",
  measurementId: "G-ZBMYGKP83C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);