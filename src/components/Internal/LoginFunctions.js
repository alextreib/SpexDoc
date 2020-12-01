import firebase from "components/Internal/Firebase.js";

export const loginUser = () => {
  return new Promise((resolve, reject) => {
    var provider = new firebase.auth.GoogleAuthProvider();

    resolve(firebase.auth().signInWithPopup(provider));
  });
};

export const logoutUser = () => {
  return new Promise((resolve, reject) => {
    resolve(firebase.auth().signOut());
  });
};
