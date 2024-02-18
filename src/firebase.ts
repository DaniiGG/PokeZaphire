// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCAmRGJUf8PXDrBpOZl4jP1CEaxBRo-7rc",
  authDomain: "pokeapi-66770.firebaseapp.com",
  projectId: "pokeapi-66770",
  storageBucket: "pokeapi-66770.appspot.com",
  messagingSenderId: "453357623235",
  appId: "1:453357623235:web:13aa5887bb2e80dae8cf76",
  measurementId: "G-SGE1J7Y90F",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const firestore = getFirestore(app);
export const auth = getAuth(app);
export default app;