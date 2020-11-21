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
import Button from "components/CustomButtons/Button.js";

const styles = (theme) => ({
  // This group of buttons will be aligned to the right
  rightToolbar: {
    marginLeft: "auto",
  },
  menuButton: {
    marginRight: 16,
    marginLeft: -12,
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
    [id]: firebase.firestore.FieldValue.arrayUnion(docLink)
  });
}

class FileDialogue extends React.Component {
  constructor(props) {
    const script = document.createElement("script");

    script.src =
      "https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js";
    script.async = true;

    document.body.appendChild(script);
    // highlight-range{3}
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      displayLogin: false,
    };
  }

  loginFirst = () => {
    this.setState({
      displayLogin: true,
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

  testFunc()
  {
    console.log("test123");
  }

  async handleSubmit(event) {
    event.preventDefault();
    if (this.checkUser() == false) {
      return;
    }

    var fileToUpload = event.target.files[0];
    if (fileToUpload == null) {
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
          console.log("File available at", downloadURL);
          // this.testFunc();
         saveDocToUser(downloadURL);
        });
      });
  }

  render() {
    const { classes } = this.props;

    return (
      <section className={classes.rightToolbar}>
        <div>
          <input
            id="myInput"
            type="file"
            ref={(ref) => (this.myInput = ref)}
            style={{ display: "none" }}
            onChange={this.handleSubmit}
          />

          {/* Only button */}
          <LoginAlert stateLogin={this.state} />
          <Button autoFocus onClick={this.saveDocToUser} color="primary">
            Close
          </Button>

          <Fab
            color="primary"
            aria-label="add"
            style={{ right: "0px" }}
            onClick={(e) => this.myInput.click()}
          >
            <AddIcon />
          </Fab>
        </div>
      </section>
    );
  }
}

FileDialogue.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FileDialogue);
