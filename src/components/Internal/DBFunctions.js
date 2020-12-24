import {
  auth,
  firebase,
  firestore,
  storage,
} from "components/Internal/Firebase.js";

import Button from "components/CustomButtons/Button.js";
import LoginAlert from "components/LoginAlert/LoginAlert.js";
import MaterialTable from "material-table";
import React from "react";
import {
  getPublicKey,
  publicKeyProvided,
} from "components/Internal/Extraction.js";
import { isSharingAllowed } from "components/Internal/Sharing.js";

import { getUserID } from "components/Internal/Checks.js";
import {
  getStringDate,
  getCurrentDate,
} from "components/Internal/VisuElements.js";

// Use Case specific
export const writeRequest = (message) => {
  return new Promise((resolve, reject) => {
    var data = {
      message: message,
      user_id: getUserID(),
      answered: false,
    };

    resolve(writeGlobalDataCollection("requests", data));
  });
};

export const getRequests = () => {
  return new Promise((resolve, reject) => {
    var docName = "requests";

    resolve(readGlobalData(docName));
  });
};

// Generating new doc method, maybe implement a doc method -> access data directly (not via array)
export const writeGlobalDataCollection = (docName, data) => {
  return new Promise((resolve, reject) => {
    firestore
      .collection("globalData")
      .doc("globalDoc")
      .collection(docName)
      .add(data);

    resolve(true);
  });
};

export const readGlobalData = (docName) => {
  return new Promise((resolve, reject) => {
    var docRef = firestore
      .collection("globalData")
      .doc("globalDoc")
      .collection(docName);

    var requestArray = [];
    docRef
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          requestArray.push({ id: doc.id, data: doc.data() });
        });
        resolve(requestArray);
      })
      .catch(function (error) {
        console.log("Error getting documents: ", error);
      });
  });
};

export const newNotification = (message, sender) => {
  return new Promise(async (resolve, reject) => {
    var newNotification = {
      favoriteActive: false,
      message: message,
      sender: sender,
      date: await getCurrentDate(),
      title: "Neue Nachricht",
    };
    resolve(newNotification);
  });
};

export const writeNotification = (message, sender, recipient_uid) => {
  return new Promise(async (resolve, reject) => {
    // First read the data and then append list
    readDBDataWithUid("Notifications", recipient_uid).then(async (doc_data) => {
      var notificationList = [];
      if (doc_data != null) {
        notificationList = doc_data;
      }

      var newNotificationMsg = await newNotification(message, sender);
      notificationList.push(newNotificationMsg);

      writeDBDataWithUid("Notifications", notificationList, recipient_uid);
      resolve(true);
    });
  });
};

export const writeDBData = (docName, data) => {
  var user_id;
  // todo: Maybe optimize user_id through overriding
  if (isSharingAllowed(docName) && publicKeyProvided()) {
    // Get the publicKey as user_id
    user_id = getPublicKey();
  } else {
    user_id = getUserID();
    // Use usual path
    if (user_id == null) {
      console.log("Writing not possible");
      return null;
    }
  }

  return writeDBDataWithUid(docName, data, user_id);
};

export const writeDBDataWithUid = (docName, data, user_id) => {
  firestore
    .collection("userStorage")
    .doc("users")
    .collection(user_id)
    .doc(docName)
    .set({
      data: data, // Required because array cannot be pushed
    });
  return true;
};

export const readDBData = (docName, allowPublicKey = false) => {
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
        return resolve(null);
      }
    }

    resolve(readDBDataWithUid(docName, user_id));
  });
};

export const readDBDataWithUid = (docName, user_id) => {
  return new Promise((resolve, reject) => {
    var docRef = firestore
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
        if (doc_data != null) resolve(doc_data["data"]);
        else resolve(null);
      });
  });
};

// todo: maybe include user?
export const uploadFile = (fileToUpload) => {
  return new Promise((resolve, reject) => {
    // todo: enhance with fileinformation
    if (fileToUpload == null) {
      console.log("No file selected - Abort.");
      return false;
    }
    var fileName = fileToUpload.name;

    var storageRef = storage.ref();

    return storageRef
      .child(fileName)
      .put(fileToUpload)
      .then((snapshot) => {
        console.log("File uploaded");
        console.log(snapshot);
        snapshot.ref.getDownloadURL().then((downloadURL) => {
          if (downloadURL != null) resolve(downloadURL);
          else resolve(false);
        });
      });
  });
};

// Array operations
export const appendDBArray = (docName, arrayElement) => {
  return new Promise((resolve, reject) => {
    var user_id = getUserID();
    if (user_id == null) return false;

    const docRef = firestore
      .collection("userStorage")
      .doc("users")
      .collection(user_id)
      .doc(docName);

    // todo: if non-existing -create
    docRef
      .update({
        data: firebase.firestore.FieldValue.arrayUnion(arrayElement),
      })
      .then((result) => {
        if (result != null) resolve(true);
        else resolve(false);
      });
  });
};

export const removeDBArray = (docName, arrayElement) => {
  return new Promise((resolve, reject) => {
    var user_id = getUserID();
    if (user_id == null) return false;

    const docRef = firestore
      .collection("userStorage")
      .doc("users")
      .collection(user_id)
      .doc(docName);

    docRef
      .update({
        data: firebase.firestore.FieldValue.arrayRemove(arrayElement),
      })
      .then((result) => {
        if (result != null) resolve(true);
        else resolve(false);
      });
  });
};

export const deleteDoc = (docName) => {
  return new Promise((resolve, reject) => {
    var user_id = getUserID();
    if (user_id == null) return false;

    const docRef = firestore
      .collection("userStorage")
      .doc("users")
      .collection(user_id)
      .doc(docName);

    docRef.delete().then((result) => {
      if (result != null) resolve(true);
      else resolve(false);
    });
  });
};

// Not working

// Array operations
// key as {link: "https://"}
// Array is nested array, not
// Array=[{element:1, link=https}, {element:2,link=https}]
export const substituteDBArrayElement = (docName, arrayElement, key) => {
  return new Promise(async (resolve, reject) => {
    var user_id = getUserID();
    if (user_id == null) return false;

    // Loading the whole document
    var old_doc = await readDBData(docName);

    // Search for key
    console.log(old_doc);
    if (old_doc != null) {
      // Nothing to update
      var new_doc = old_doc.map((medRecord) => {
        if (medRecord.link == key) {
          medRecord = arrayElement;
        }
      });
    }
    writeDBData(docName, old_doc);
  });
};
