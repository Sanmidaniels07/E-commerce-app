import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import {getFirestore} from "firebase/firestore"
import {getStorage} from "firebase/storage"

export const firebaseConfig = {
  apiKey: "AIzaSyAMjh4EtbN_xE4cvtBmrMU9esA4wGQtIfM",
  authDomain: "eshop-9105b.firebaseapp.com",
  projectId: "eshop-9105b",
  storageBucket: "eshop-9105b.appspot.com",
  messagingSenderId: "223017871213",
  appId: "1:223017871213:web:3e4563a28d90119cdb1c64"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)
export default app
