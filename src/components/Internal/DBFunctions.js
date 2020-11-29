import React from "react";
import MaterialTable from "material-table";

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/database";

import Button from "components/CustomButtons/Button.js";
import LoginAlert from "components/LoginAlert/LoginAlert.js";

import { getUserID } from "components/Internal/Checks.js";
import { getPublicKey } from "components/Internal/Extraction.js";

export const writeDBData = (docName, data) => {
  var user_id = getUserID();
  if (user_id == null) return false;

  firebase
    .firestore()
    .collection("userStorage")
    .doc("users")
    .collection(user_id)
    .doc(docName)
    .set({
      data: data, // Required because array cannot be pushed
    });
  return true;
};

export const readDBData = (docName, allowPublicKey) => {
  return new Promise((resolve, reject) => {
    var user_id;
    // todo: Maybe optimize user_id through overriding
    if (allowPublicKey && getPublicKey() != null) {
      // Get the publicKey as user_id
      user_id = getPublicKey();
    } else {
      user_id = getUserID();
      // Use usual path
      if (user_id == null) {
        console.log("Reading not possible");
        resolve(null);
      }
    }

    var docRef = firebase
      .firestore()
      .collection("userStorage")
      .doc("users")
      .collection(user_id)
      .doc(docName);

    docRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          return doc.data();
        }
      })
      .then((doc_data) => {
        resolve(doc_data["data"]);
      });
  });
};
