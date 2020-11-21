import React from "react";
import ReactDOM from "react-dom";

import firebase from "firebase/app";
import "firebase/storage";
import "firebase/firestore";
import { makeStyles } from "@material-ui/core/styles";
import { withStyles } from '@material-ui/core/styles';


// const { FloatingActionButton, SvgIcon, MuiThemeProvider, getMuiTheme } = MaterialUI;
import IconButton from "@material-ui/core/IconButton";
import Icon from "@material-ui/core/Icon";
import AddIcon from "@material-ui/icons/Add";

import Fab from "@material-ui/core/Fab";

import PropTypes from "prop-types";

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
    this.fileInput = React.createRef();
  }

  onChangeHandler = (event) => {
    console.log("fired");
    console.log(event.target.files[0]);
  };

  handleSubmit(event) {
    // highlight-range{3}
    event.preventDefault();

    var fileToUpload=event.target.files[0];
    var fileName=fileToUpload.name;

    console.log(fileToUpload);
    alert(`Uploaded file - ${fileName}`);

    // Create a root reference
    var storageRef = firebase.storage().ref();

    var uploadTask = storageRef
      .child(fileName)
      .put(fileToUpload)
      .then(function (snapshot) {
        console.log("Uploaded file!");
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
