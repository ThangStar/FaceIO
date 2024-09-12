// Import the functions you need from the SDKs you need
import { FirebaseOptions, initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig: FirebaseOptions = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY || '',
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN || '',
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID || '',
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET || '',
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID || '',
  measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID || '',
  databaseURL: process.env.NEXT_PUBLIC_DATABASE_URL || 'https://demo.firebaseio.com'
};
const google = () => {
  const google = new GoogleAuthProvider();
  const auth = getAuth(app);
  google.setCustomParameters({
    'login_hint': 'user@example.com'
  });
  auth.languageCode = 'vi';
  return google
}


export const firebaseLogin = { google }
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const rdb = getDatabase(app)
export const storage = getStorage(app, firebaseConfig.storageBucket)
export default firebaseConfig
