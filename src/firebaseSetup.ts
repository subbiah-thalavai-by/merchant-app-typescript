/* eslint-disable import/no-duplicates */
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const firebaseConfig = firebase.initializeApp({
  apiKey: 'AIzaSyBzc-Pk4vZN38Hs4SAh6X1QGBXskZDOzAg',
  authDomain: 'merchant-app-20e14.firebaseapp.com',
  projectId: 'merchant-app-20e14121',
  storageBucket: 'merchant-app-20e14.appspot.com',
  messagingSenderId: '894343932500',
  appId: '1:894343932500:web:994caab5e4876b589a5bc1',
  measurementId: 'G-47JQEBN5D2',
});

const db = firebase.firestore();
const batch = db.batch();
const storageRef = firebase.storage().ref();
const auth = firebase.auth();

export {
  auth, db, firebaseConfig, batch, storageRef,
};
