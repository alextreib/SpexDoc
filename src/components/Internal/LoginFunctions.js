import {firebase, firestore, auth} from "components/Internal/Firebase.js";

export const loginUser = () => {
  return new Promise((resolve, reject) => {
    var provider = new firebase.auth.GoogleAuthProvider();

    resolve(auth.signInWithPopup(provider));
  });
};

export const logoutUser = () => {
  return new Promise((resolve, reject) => {
    resolve(auth.signOut());
  });
};
