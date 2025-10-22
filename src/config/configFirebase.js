import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

//  Config firebase here
const firebaseConfig = {
  apiKey: "AIzaSyCyUyRZHzv6YGdolCRdX7CSYKWdRY14D8o",
  authDomain: "projectmma301-155b7.firebaseapp.com",
  databaseURL: "https://projectmma301-155b7-default-rtdb.firebaseio.com", // add Realtime Database
  projectId: "projectmma301-155b7",
  storageBucket: "projectmma301-155b7.firebasestorage.app",
  messagingSenderId: "513141813143",
  appId: "1:513141813143:web:e7e15ac48717e2261b5ed2",
  measurementId: "G-8GCVRPEBMQ",
};

// init Firebase
const app = initializeApp(firebaseConfig);

// init Database
export const db = getDatabase(app);
