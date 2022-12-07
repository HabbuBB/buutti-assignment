
import { initializeApp } from "firebase/app";
import { getFirestore, collection } from 'firebase/firestore'


// Firebase configuration THIS EXPIRES IN 30 DAYS 
const firebaseConfig = {
  apiKey: "AIzaSyCAY31ITF9iA3O79dtlhYjZLqhuMD_6heg",
  authDomain: "books4buutti.firebaseapp.com",
  projectId: "books4buutti",
  storageBucket: "books4buutti.appspot.com",
  messagingSenderId: "773025234804",
  appId: "1:773025234804:web:e319dc30af7314ec9ef621"
};

// Initialize Firebase
initializeApp(firebaseConfig);

//Firestore database
export const db = getFirestore();
//Reference to the books collection in the database
export const BOOKS_REF = collection(db, 'books');
