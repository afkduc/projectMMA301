import { initializeApp, getApps } from "firebase/app";
import { getDatabase } from "firebase/database";
import { initializeAuth, getReactNativePersistence, getAuth } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getStorage } from "firebase/storage";
import { Platform } from "react-native";

// 🔥 Cấu hình Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCyUyRZHzv6YGdolCRdX7CSYKWdRY14D8o",
  authDomain: "projectmma301-155b7.firebaseapp.com",
  databaseURL: "https://projectmma301-155b7-default-rtdb.firebaseio.com",
  projectId: "projectmma301-155b7",
  storageBucket: "projectmma301-155b7.appspot.com",
  messagingSenderId: "513141813143",
  appId: "1:513141813143:web:e7e15ac48717e2261b5ed2",
  measurementId: "G-8GCVRPEBMQ",
};

// 🔹 Chỉ khởi tạo app một lần
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// 🔹 Khởi tạo Auth tương thích React Native
let auth;
if (Platform.OS === "web") {
  auth = getAuth(app);
} else {
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
}

// 🔹 Khởi tạo Database và Storage
const database = getDatabase(app);
const storage = getStorage(app);

// 🔹 Xuất ra dùng trong project
export { app, auth, database, storage };
