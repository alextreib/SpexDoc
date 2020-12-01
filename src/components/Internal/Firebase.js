import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyCpS3fCBYZcehmfwhs6ma_6uyhw6FKmYfM",
  authDomain: "spexdoc.firebaseapp.com",
  databaseURL: "https://spexdoc.firebaseio.com",
  projectId: "spexdoc",
  storageBucket: "spexdoc.appspot.com",
  messagingSenderId: "890835351206",
  appId: "1:890835351206:web:78e087ece687649ae8e667",
  measurementId: "G-20H8X0HLQ9",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


export default firebase;