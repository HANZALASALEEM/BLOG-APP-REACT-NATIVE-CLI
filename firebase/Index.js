// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
import {getAnalytics} from 'firebase/analytics';
import {getAuth} from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAC4fJTuf_GClRbpGLTh8LjMz_p029M9ws',
  authDomain: 'blogapp-b16d5.firebaseapp.com',
  projectId: 'blogapp-b16d5',
  storageBucket: 'blogapp-b16d5.appspot.com',
  messagingSenderId: '577280054273',
  appId: '1:577280054273:web:bec7676a78564ea0819c00',
  measurementId: 'G-15SMPYMDP5',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
