import firebase from "firebase/app";
import "firebase/storage";
import "firebase/firestore";
import "firebase/auth";

// Get user_id -> checkUser -> LoginAlert
export const checkUser = () => {
  if (firebase.auth().currentUser == null) {
    console.log("user not logged in");
    return false;
  } else {
    return true;
  }
};

export const getUserID = () => {
  if (checkUser()) {
    return firebase.auth().currentUser.uid;
  }
  return null;
};
