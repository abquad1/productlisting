
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';



import { initializeApp, getApps } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAYZts18H5sJ4eleYzZ250yUOB_fKKoXw8",
  authDomain: "productlisting-e5c27.firebaseapp.com",
  projectId: "productlisting-e5c27",
  // storageBucket: "productlisting-e5c27.firebasestorage.app",
  storageBucket: "productlisting-e5c27.appspot.com",
  messagingSenderId: "707291663552",
  appId: "1:707291663552:web:d66bedf7119bc375a6b125",
  measurementId: "G-KN18R1ND35"
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
// const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app); 
const db = getFirestore(app);
export { auth, db, analytics };
export default app;