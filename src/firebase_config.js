// import firebase from "firebase";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

var firebaseConfig = {
  apiKey: "AIzaSyAE7ShmcWeWH5RboQs6zyNSlfertPVgGmk",
  authDomain: "todolist-6c5e0.firebaseapp.com",
  projectId: "todolist-6c5e0",
  storageBucket: "todolist-6c5e0.appspot.com",
  messagingSenderId: "313563147049",
  appId: "1:313563147049:web:0258a0a6b82fb3226ae538"
};


// firebase.initializeApp(firebaseConfig);

// const DB = firebase.firestore();

// export default DB;

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

export { auth, db };