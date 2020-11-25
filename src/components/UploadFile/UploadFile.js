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
import Notifications from "components/Notifications/Notifications.js";
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
      openLoginRequired: false,
      notificationProps: this.NotificationProps,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.saveDocToUser = this.saveDocToUser.bind(this);
  }

  // Structs
  NotificationProps = {
    openNotification: false,
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
      notificationProps: {
        openNotification: true,
        message: "File successfully uploaded",
      },
    });
  };

  handleSubmit = (event) => {
    console.log("HandleSubmit");

    event.preventDefault();
    if (this.checkUser() == false) {
      console.log("User not logged in - Abort.");
      return;
    }

    var fileToUpload = event.target.files[0];
    if (fileToUpload == null) {
      console.log("No file selected - Abort.");
      return;
    }
    var fileName = fileToUpload.name;

    // Create a root reference
    var storageRef = firebase.storage().ref();

    storageRef
      .child(fileName)
      .put(fileToUpload)
      .then((snapshot) => {
        console.log("File uploaded");
        console.log(snapshot);
        snapshot.ref.getDownloadURL().then((downloadURL) => {
          // Push to server with profileID

          console.log("File available at", downloadURL);
          this.saveDocToUser(downloadURL);
          this.setState({
            notificationProps: {
              openNotification: true,
              message: "File successfully uploaded",
            },
          });
        });
      });
  };

  saveDocToUser = (docLink) => {
    // this.checkUser();
    var defaultDatabase = firebase.firestore();
    var user = firebase.auth().currentUser;
    if (user == null) {
      return;
    }

    const docRef = defaultDatabase.collection("userStorage").doc("docLinks");
    var id = user.uid;

    docRef.update({
      [id]: firebase.firestore.FieldValue.arrayUnion(docLink),
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <section className={classes.rightToolbar}>
        <LoginAlert loginState={this.state} />
        <Notifications notifications={this.state.notificationProps} />
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
