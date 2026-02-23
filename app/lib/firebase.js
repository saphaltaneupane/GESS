// // app/lib/firebase.js
// import { initializeApp, getApps, getApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
// import { getFirestore } from "firebase/firestore";
// import { getStorage } from "firebase/storage";

// const firebaseConfig = {
//   apiKey: "AIzaSyCJq-6rmRGWmDbH8y0RG2ktIM7KDDsRCss",
//   authDomain: "ganeshschool.firebaseapp.com",
//   projectId: "ganeshschool",
//   storageBucket: "ganeshschool.firebasestorage.app",
//   messagingSenderId: "848988109242",
//   appId: "1:848988109242:web:f2048f2b566cef30868583",
//   measurementId: "G-XZ7BSRHP5L",
// };

// // Initialize Firebase (Next.js friendly check)
// // This prevents the "Firebase App named '[DEFAULT]' already exists" error
// const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// // Initialize and Export services
// export const auth = getAuth(app);
// export const db = getFirestore(app);
// export const storage = getStorage(app);
// app/lib/firebase.js
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDx7-7U9uqlDrOoa8kG44FNZ-3x7QmzAwg",
  authDomain: "ganeshschool.firebaseapp.com",
  projectId: "ganeshschool",
  storageBucket: "ganeshschool.firebasestorage.app",
  messagingSenderId: "848988109242",
  appId: "1:848988109242:web:f2048f2b566cef30868583",
  measurementId: "G-XZ7BSRHP5L",
};

// Initialize Firebase (Next.js friendly check)
// This prevents the "Firebase App named '[DEFAULT]' already exists" error
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Initialize and Export services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);