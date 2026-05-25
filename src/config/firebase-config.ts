import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAepEEjbIksBF-bqF-L34ilM9qdePP24kI",
  authDomain: "cafeshop-react.firebaseapp.com",
  projectId: "cafeshop-react",
  storageBucket: "cafeshop-react.firebasestorage.app",
  messagingSenderId: "706352469385",
  appId: "1:706352469385:web:2f36e86f8d28d37925bd58",
  measurementId: "G-01W6G1R31S"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
