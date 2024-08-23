import { initializeApp } from "firebase/app";
import { fetchSignInMethodsForEmail, getAuth, getReactNativePersistence, initializeAuth } from "firebase/auth";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyBVdEEMLwaEwxC86zjK_pr9TpVbmushf94",
  authDomain: "com-codeloom.firebaseapp.com",
  databaseURL: "https://com-codeloom-default-rtdb.firebaseio.com",
  projectId: "com-codeloom",
  storageBucket: "com-codeloom.appspot.com",
  messagingSenderId: "30540332761",
  appId: "1:30540332761:web:1606c4c0a4a3275cb448c8",
  measurementId: "G-D8EDNDJ5VZ"
};


const codeloomApp = initializeApp(firebaseConfig, 'app2');
const codeloomAuth = initializeAuth(codeloomApp, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
})
const codeloomDatabase = getDatabase(codeloomApp, "https://com-codeloom-default-rtdb.firebaseio.com")

const codeloomStorage = getStorage(codeloomApp, 'gs://com-codeloom.appspot.com')
export { codeloomAuth, codeloomApp, codeloomDatabase, codeloomStorage }