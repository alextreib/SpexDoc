import LoginAlert from "components/LoginAlert/LoginAlert.js";
import React from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import Button from "components/CustomButtons/Button.js";

import { readDBData, writeDBData } from "components/Internal/DBFunctions.js";
import { checkUser, getUserEmail } from "components/Internal/Checks.js";
import { loginRedux, logoutRedux } from "components/Internal/Redux.js";
import { loginUser, logoutUser } from "components/Internal/LoginFunctions.js";
import { connect } from "react-redux";


// Is more or less an abstract class that clusters
// Expect commonProps
export default class VisuComp extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidUpdate(){
    console.log("visu comp update")
  }
    
  // Combining the function in a way to display it everywhere the same
  displayLogin = () => {
    console.log("displaylogin");
    // This is how a function in CommonProps is called
    this.setState({
      commonProps: { ...this.state.commonProps,
        LoginAlertProps: { openLoginRequired: true, FuncParams: "test" },
      },
    });
    console.log("update force");
  };
 

  // Rendering not possible in abstract class
}

