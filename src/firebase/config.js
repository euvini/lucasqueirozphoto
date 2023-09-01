import * as firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCz8qs181fgyX7lDaWlPBIR-rkNsr6bi_U",
  authDomain: "lucasqueiroz-290d8.firebaseapp.com",
  projectId: "lucasqueiroz-290d8",
  storageBucket: "lucasqueiroz-290d8.appspot.com",
  messagingSenderId: "108808169454",
  appId: "1:108808169454:web:0727d73ceab833743810ff"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const projectStorage = firebase.storage();
const projectFirestore = firebase.firestore();
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export { projectStorage, projectFirestore, timestamp };