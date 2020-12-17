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
import { getPublicKey } from "components/Internal/Extraction.js";
import { getUserID } from "components/Internal/Checks.js";


export const AdminUserIDList=["8X81AgrU6Sc3Z23OMsXw4zLNuno2"]

export const isAdmin = () => {
  return AdminUserIDList.includes(getUserID());
};
