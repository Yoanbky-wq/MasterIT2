import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
   apiKey: "AIzaSyAsb8JishYXi8HcEdTbjy3QLTDLzyBBOqs",
  authDomain: "masterit-66d10.firebaseapp.com",
  projectId: "masterit-66d10",
  storageBucket: "masterit-66d10.firebasestorage.app",
  messagingSenderId: "652993827649",
  appId: "1:652993827649:web:f69a33f3d3634f711dc7c0"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
