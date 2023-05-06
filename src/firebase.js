import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAruGHYD4U7yK7p8NWVPpr300bGoDKocKk",
  authDomain: "personal-finance-dashboa-816ca.firebaseapp.com",
  projectId: "personal-finance-dashboa-816ca",
  storageBucket: "personal-finance-dashboa-816ca.appspot.com",
  messagingSenderId: "823369155791",
  appId: "1:823369155791:web:7f21bd8303f5214751a3ba",
  measurementId: "G-ZBMYGKP83C"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const auth = getAuth(app);
export { db };
