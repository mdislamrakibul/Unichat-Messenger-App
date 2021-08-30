import firebase from 'firebase/app'
import 'firebase/auth'

export const auth = firebase.initializeApp({
    apiKey: "AIzaSyA8Tf-AMdgR2XsKNMCnuXu1XydRwHECryw",
    authDomain: "unichat-80c20.firebaseapp.com",
    projectId: "unichat-80c20",
    storageBucket: "unichat-80c20.appspot.com",
    messagingSenderId: "146461824778",
    appId: "1:146461824778:web:d09eb6521b26ed1c7f4cf3"
  }).auth();