import React from "react";
import LoginAlert from "components/LoginAlert/LoginAlert.js";
import PopUp from "components/PopUp/PopUp.js";

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
