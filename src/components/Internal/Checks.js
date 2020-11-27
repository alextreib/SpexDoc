
import firebase from "firebase/app";
import "firebase/storage";
import "firebase/firestore";
import "firebase/auth";

// Get user_id -> checkUser -> LoginAlert
export const checkUser=() => {
  var user = firebase.auth().currentUser;
  if (user == null) {
    console.log("user not logged in");
    return;
  }
  var user_id = user.uid;

  firebase
    .firestore()
    .collection("userStorage")
    .doc("users")
    .collection(user_id)
    .doc(docName)
    .set({
      data: data, // Required because array cannot be pushed
    });
}

export const readDBData=(docName, data) => {
  var user = firebase.auth().currentUser;
  if (user == null) {
    return;
  }
  var user_id = user.uid;

  firebase
    .firestore()
    .collection("userStorage")
    .doc("users")
    .collection(user_id)
    .doc(docName)
    .set({
      data: data, // Required because array cannot be pushed
    });
}
