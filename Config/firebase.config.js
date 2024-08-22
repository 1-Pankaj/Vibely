import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyBgDGte6pdIlpuDle7sMvRCyjEA3IxFCz4",
  authDomain: "vibely-chat.firebaseapp.com",
  projectId: "vibely-chat",
  storageBucket: "vibely-chat.appspot.com",
  messagingSenderId: "522408338720",
  appId: "1:522408338720:web:78bc9c865edd02b15ea345",
  measurementId: "G-CKWQ99KLEE",
  databaseURL: "https://vibely-chat-default-rtdb.firebaseio.com"
};

export const app = initializeApp(firebaseConfig, "app");
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
})
export const database = getDatabase(app)
export const storage = getStorage(app,  'gs://vibely-chat.appspot.com')
