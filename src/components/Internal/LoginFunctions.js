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


export const loginUserWithFit=()=>{
  return new Promise((resolve, reject) => {

  var provider = new firebase.auth.GoogleAuthProvider();

  // Required!
  provider.addScope('https://www.googleapis.com/auth/fitness.activity.read');

  firebase
    .auth()
    .signInWithPopup(provider)
    .then(function (result) {
      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = result.credential.accessToken;
      setaccessToken(token);

      console.log(token);
      // The signed-in user info.
      var user = result.user;
      // ...
    })
    .catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });
  });
}