import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore, initializeFirestore } from 'firebase/firestore'
// import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";
const firebaseConfig = {
  apiKey: 'AIzaSyA6opdillxVlOJGrWL4P0OUxykMW1nDWqo',
  authDomain: 'wechat-d9ead.firebaseapp.com',
  projectId: 'wechat-d9ead',
  storageBucket: 'wechat-d9ead.appspot.com',
  messagingSenderId: '558914931159',
  appId: '1:558914931159:web:785812d6405f1f48d2a392',
  measurementId: 'G-NYJY37B33B',
}

const app = initializeApp(firebaseConfig)
// const auth = getAuth(app)

// export const db = initializeFirestore(app, {
//   experimentalForceLongPolling: true,
// })
export const db = getFirestore()
