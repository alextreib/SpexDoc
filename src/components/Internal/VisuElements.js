import React from "react";
import MaterialTable from "material-table";

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/database";

import Button from "components/CustomButtons/Button.js";
import LoginAlert from "components/LoginAlert/LoginAlert.js";
import PopUp from "components/PopUp/PopUp.js";

import { getUserID } from "components/Internal/Checks.js";
import { getPublicKey } from "components/Internal/Extraction.js";

export const openLoginAlert = () => {
  console.log("openLoginAlert");

  const loginState = {
    openLoginRequired: true,
  };
  return <LoginAlert loginState={loginState} />;
};

export const openPopUp = () => {
  console.log("openPopUp");

  const PopUpProps = {
    openPopUp: true,
    message: "File Successfully uploaded",
  };
  return <PopUp popUp={PopUpProps} />;
};
