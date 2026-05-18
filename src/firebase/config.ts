import { initializeApp }
from "firebase/app";

import {
  getFirestore,
} from "firebase/firestore";

import {
  getStorage,
} from "firebase/storage";


const firebaseConfig = {
  apiKey:
    "AIzaSyCdQ9b9JSpYfskMHH-QttcZ3FlV1CWD8Qs",

  authDomain:
    "foodmood-8d3a9.firebaseapp.com",

  projectId:
    "foodmood-8d3a9",

  storageBucket:
    "foodmood-8d3a9.firebasestorage.app",

  messagingSenderId:
    "587676351025",

  appId:
    "1:587676351025:web:d67a943bed8c7880713310",
};

const app =
  initializeApp(
    firebaseConfig
  );

export const db =
  getFirestore(app);

export const storage =
  getStorage(app);

