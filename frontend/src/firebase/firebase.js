// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from '@firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAMdT8uI3mip_kQxnUrJ7U0Zf9PIP6Spak",
  authDomain: "testfirebasecloud-2478d.firebaseapp.com",
  projectId: "testfirebasecloud-2478d",
  storageBucket: "testfirebasecloud-2478d.firebasestorage.app",
  messagingSenderId: "603406944701",
  appId: "1:603406944701:web:9e6b70a8b3580f1c4a6ad4",
  measurementId: "G-SWH96SDH5W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
