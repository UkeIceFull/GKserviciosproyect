import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDju33rrDR1Vk9-vSc-mrLzO1L_FNm63ZM",
  authDomain: "larss-ecb7f.firebaseapp.com",
  projectId: "larss-ecb7f",
  storageBucket: "larss-ecb7f.appspot.com",
  messagingSenderId: "89714794453",
  appId: "1:89714794453:web:07d461a21f7041963fa75c",
  measurementId: "G-9VZ6CMMMER",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };