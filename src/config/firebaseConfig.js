import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID,
};
initializeApp(firebaseConfig);
console.log("firebase connected");
console.log(process.env.NEXT_PUBLIC_API_KEY);
console.log(process.env.NEXT_PUBLIC_AUTH_DOMAIN);
console.log(process.env.NEXT_PUBLIC_PROJECT_ID);
console.log(process.env.NEXT_PUBLIC_SENDER_ID);
console.log(process.env.NEXT_PUBLIC_APP_ID);
console.log(process.env.NEXT_PUBLIC_MEASUREMENT_ID);

export const db = getFirestore();
