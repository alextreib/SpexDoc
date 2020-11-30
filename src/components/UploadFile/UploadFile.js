import React from "react";

import firebase from "firebase/app";
import "firebase/storage";
import "firebase/firestore";
import "firebase/auth";
import { withStyles } from "@material-ui/core/styles";

// const { FloatingActionButton, SvgIcon, MuiThemeProvider, getMuiTheme } = MaterialUI;
import AddIcon from "@material-ui/icons/Add";

import Fab from "@material-ui/core/Fab";

import PropTypes from "prop-types";
import LoginAlert from "components/LoginAlert/LoginAlert.js";
import PopUp from "components/PopUp/PopUp.js";
import Button from "components/CustomButtons/Button.js";

const styles = () => ({
  // This group of buttons will be aligned to the right
  rightToolbar: {
    position: "relative",
    minHeight: 100,
  },
  menuButton: {
    marginRight: 16,
    marginLeft: -12,
  },
  fab: {
    position: "absolute",
    bottom: 15,
    right: 15,
  },
});

class FileDialogue extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      medRecords: ["test"],
      openLoginRequired: false,
      popUpProps: this.PopUpProps,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.saveDocToUser = this.saveDocToUser.bind(this);
  }
  
  componentDidUpdate() {
    console.log("UploadFiles update")
  }

  componentDidMount() {
    this.setState({
      medRecords: this.props.medRecords,
    });
  }

  // Structs
  PopUpProps = {
    openPopUp: false,
    message: "File Successfully uploaded",
  };

  // Functions
  loginFirst = () => {
    this.setState({
      openLoginRequired: true,
    });
  };

  checkUser() {
    var user = firebase.auth().currentUser;

    if (user) {
      // User is signed in.
      return true;
    } else {
      // No user is signed in.
      this.loginFirst();
      return false;
    }
  }

  magicFunc = () => {
    console.log("state changed in parent");
    this.setState({
      popUpProps: {
        openPopUp: true,
        message: "File successfully uploaded",
      },
    });
  };

 
  render() {
    const { classes } = this.props;

    return (
      <section className={classes.rightToolbar}>
        <LoginAlert loginState={this.state} />
        <PopUp popUp={this.state.popUpProps} />
        <input
          id="myInput"
          type="file"
          ref={(ref) => (this.myInput = ref)}
          style={{ display: "none" }}
          onChange={this.handleSubmit}
        />

        {/* Only button */}
        <Fab
          className={classes.fab}
          color="primary"
          aria-label="add"
          onClick={() => this.myInput.click()}
        >
          <AddIcon />
        </Fab>
      </section>
    );
  }
}

FileDialogue.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FileDialogue);
