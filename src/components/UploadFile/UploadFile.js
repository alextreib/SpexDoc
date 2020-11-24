import React from "react";
import ReactDOM from "react-dom";

import firebase from "firebase/app";
import "firebase/storage";
import "firebase/firestore";
import "firebase/auth";
import { makeStyles } from "@material-ui/core/styles";
import { withStyles } from "@material-ui/core/styles";

// const { FloatingActionButton, SvgIcon, MuiThemeProvider, getMuiTheme } = MaterialUI;
import IconButton from "@material-ui/core/IconButton";
import Icon from "@material-ui/core/Icon";
import AddIcon from "@material-ui/icons/Add";

import Fab from "@material-ui/core/Fab";

import PropTypes from "prop-types";
import LoginAlert from "components/LoginAlert/LoginAlert.js";
import Notifications from "components/Notifications/Notifications.js";
import Button from "components/CustomButtons/Button.js";

const styles = (theme) => ({
  // This group of buttons will be aligned to the right
  
  rightToolbar: {
    position: "relative",
    minHeight:100
  },
  menuButton: {
    marginRight: 16,
    marginLeft: -12,
  },
  fab: {
    position:"absolute",
    bottom: 15,
    right: 15,
  },
});

async function saveDocToUser(docLink) {
  // event.preventDefault();
  // this.checkUser();
  console.log(docLink);

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
}

class FileDialogue extends React.Component {
  constructor(props) {
    super(props);
    // highlight-range{3}
    this.handleSubmit = this.handleSubmit.bind(this);

    console.log("consturctor");
    console.log(this.LoginAlert);

    this.state = {
      openLoginRequired: false,
      openNotification: false,
    };
  }

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

  magicFunc = () => 
  {
    console.log("state changed in parent");
    this.setState({
      openNotification: true,
    });
  }

  async handleSubmit(event) {
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

    var uploadTask = storageRef
      .child(fileName)
      .put(fileToUpload)
      .then(function (snapshot) {
        console.log("File uploaded");
        console.log(snapshot);
        snapshot.ref.getDownloadURL().then(function (downloadURL) {
          // Push to server with profileID
          //todo: notification
          console.log("File available at", downloadURL);
          saveDocToUser(downloadURL);
        });
      });
  }

  render() {
    const { classes } = this.props;

    return (
      <section className={classes.rightToolbar}>
        <LoginAlert loginState={this.state} />
        <Notifications notifications={this.state} />
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
          onClick={(e) => this.myInput.click()}
        >
          <AddIcon />
        </Fab>
        <Button onClick={this.magicFunc} color="primary" autoFocus>
              Verstanden
            </Button>
      </section>
    );
  }
}

FileDialogue.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FileDialogue);
