import { firebase, firestore, auth } from "components/Internal/Firebase.js";
import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import axios from "axios";
import { getUser } from "components/Internal/Checks.js";
// const { getRequestHeaders, getWeeklyData } = require('components/VisuComps/DataManager.js');

const Dashboard = (props) => {
  // fetch weekly data
  // console.log(props.user);
  // const accessToken = props.user.accessToken;
  const [weekData, setWeekData] = useState([]);
  const [accessToken, setaccessToken] = useState();
  // let weekData = [];

  let selected = [0, 1, 2, 3, 4, 5, 6];
  const callBack = (state) => {
    setWeekData(state);
  };
  // const requestHeaders = getRequestHeaders(accessToken);
  const timeRightNow = new Date().getTime();

  const loginFunc = () => {
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
  };

  // const API_KEY = process.env.REACT_APP_API_KEY;

  // Provide request headers to be attached with each function call
  const getRequestHeaders = (accessToken) => {
    const requestHeaderBody = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/json",
      },
    };
    return requestHeaderBody;
  };

  const getDataFunc = async () => {
    var user = getUser();
    var token = user.getIdToken(true);
    console.log(token);

    console.log(user);
    var access_token =
      "ya29.a0AfH6SMBUp8F_aGefHvX-WS7MBZk43sdOaMeNzfSu6rYCzQ6lyQgvm9gOSu1iuZgN1KVH5h6gxEz_ff-w6TjIk3Hfhx0yf84A-KMghMWW3xh71oWTzR0Vu0ozWGcNZj4LDU6vPtFh8ldA01twq1k2C_m3jpHI3Tj3UAS1hzU_SpXy";

    var blank_url =
      "https://www.googleapis.com/fitness/v1/users/me/dataSources";

    axios
      .get(blank_url, getRequestHeaders(access_token))
      .then(function (response) {
        // handle success
        console.log(response);
      });
  };

  return (
    <div>
      <Button onClick={loginFunc}>TestComp BUtton</Button>
      <Button onClick={getDataFunc}>getDataFunc BUtton</Button>
    </div>
  );
};

export default Dashboard;
