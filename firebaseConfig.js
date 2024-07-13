// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCaXUX7EJSFsdGbPUE_Ktvt1wxa9OyIzDQ",
  authDomain: "askgpt-ai.firebaseapp.com",
  databaseURL: "https://askgpt-ai-default-rtdb.firebaseio.com",
  projectId: "askgpt-ai",
  storageBucket: "askgpt-ai.appspot.com",
  messagingSenderId: "944773044945",
  appId: "1:944773044945:web:d3dde938c5849b0b8203f0",
  measurementId: "G-KEHWGQ2XCH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth