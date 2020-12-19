import { firebase, firestore, auth } from "components/Internal/Firebase.js";
import { defaultURL } from "components/Internal/DefaultData.js";

const BitlyClient = require("bitly").BitlyClient;
//todo: Hide key
const bitly = new BitlyClient("10f3147740e04fd0ea4c68788a84147cc6034dfa");

// Get user_id -> checkUser -> LoginAlert
export const checkUser = () => {
  return auth.currentUser != null;
};

export const getUser = () => {
  if (checkUser()) {
    return auth.currentUser;
  }
  return null;
};

export const getUserID = () => {
  if (checkUser()) {
    return auth.currentUser.uid;
  }
  return null;
};

export const getUserEmail = () => {
  if (checkUser()) {
    return auth.currentUser.email;
  }
  return null;
};

export const getShortLink = async (property) => {
  var longLink =
    "https://app.spexdoc.net/" + property + "/publicKey=" + getUserID();
  const response = await bitly.shorten(longLink);
  return response.link;
};
