import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCZyYPT2O5m0jWktIBQXyIO44LaTIChIvU",
  authDomain: "reactwithfirebase-a9488.firebaseapp.com",
  projectId: "reactwithfirebase-a9488",
  storageBucket: "reactwithfirebase-a9488.appspot.com",
  messagingSenderId: "805847783179",
  appId: "1:805847783179:web:7a63125e8a41d55eafb40e",
  measurementId: "G-Y7V0Z2KKG3",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
