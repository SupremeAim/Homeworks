import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDCGiqigCrQhZhy6ErtYXwGx_xRFXVN12M",
  authDomain: "challenge-07-ff2e4.firebaseapp.com",
  projectId: "challenge-07-ff2e4",
  storageBucket: "challenge-07-ff2e4.firebasestorage.app",
  messagingSenderId: "1033729286446",
  appId: "1:1033729286446:web:941e21c2d35ae3259edabf",
  measurementId: "G-Q8GH4VCPLC"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);