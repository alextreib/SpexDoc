import React from "react";
import { readDBDataWithUid } from "./DBFunctions";
import { getPublicKey } from "./Extraction";

export const shareLink = (message, link) => {
  if (navigator.share) {
    navigator
      .share({
        title: "Sharing",
        text: message,
        url: link,
      })
      .then(() => {
        console.log("Successfully shared");
        return true;
      })
      .catch((error) => {
        console.error("Something went wrong sharing the blog", error);
      });
  } else {
    return false;
  }
};

// Based on link, get the publicKey
export const isSharingAllowed = (docName, writing = false) => {
  // Has to be generally allowed to share
  if (!SharingTableNames.includes(docName)) return false;

  // is user wise allowed to share
  var user_id = getPublicKey();
  //todo: docName has to be global accessible sharing list
  // readDBDataWithUid(docName, user_id);
};

// Generally allowed shared data
// todo: Sort into categories: Emergency, Vaccination, MedRecords
export const SharingTableNames = [
  "EmergencyPredisposition",
  "EmergencyMedication",
  "EmergencyContacts",
  "OrganDonationData",
  "MedRecords",
  "CategoryList",
  "Vaccination",
];
