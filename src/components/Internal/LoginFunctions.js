import { firebase, firestore, auth } from "components/Internal/Firebase.js";

export const loginUser = () => {
  return new Promise((resolve, reject) => {
    var provider = new firebase.auth.GoogleAuthProvider();

    // todo: Provide option to ignore
    provider.addScope("https://www.googleapis.com/auth/fitness.activity.read");
    provider.addScope("https://www.googleapis.com/auth/fitness.sleep.read");
    provider.addScope("https://www.googleapis.com/auth/fitness.body.read");
    provider.addScope(
      "https://www.googleapis.com/auth/fitness.blood_pressure.read"
    );

    resolve(auth.signInWithPopup(provider));
  });
};

export const logoutUser = () => {
  return new Promise((resolve, reject) => {
    resolve(auth.signOut());
  });
};
