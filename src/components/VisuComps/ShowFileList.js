import Grid from "@material-ui/core/Grid";
import React from "react";

import "firebase/storage";
import "firebase/firestore";
import { withStyles } from "@material-ui/core/styles";

import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";

import PropTypes from "prop-types";

import ShowFile from "components/VisuComps/ShowFile.js";
import { readDBData, uploadFile } from "components/Internal/DBFunctions.js";

const styles = (theme) => ({
  card: {
    maxWidth: 345,
    marginBottom: 100,
    paddingBottom: theme.spacing(1),
  },
  media: {
    height: 140,
  },
  dialogtitle: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
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

class ShowFileList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      medRecords: ["Beispiel"],
    };
  }

  componentDidMount() {
    this.loadFiles();
  }

  componentDidUpdate(prevProps) {
    console.log(this.state);
  }

  loadFiles = () => {
    return readDBData("medRecords", false).then((doc_data) => {
      console.log(doc_data);

      if (doc_data != null) this.setState({ medRecords: doc_data });
    });
  };

  uploadFile = (event) => {
    event.preventDefault();

    var fileToUpload = event.target.files[0];
    var result = uploadFile("medRecords", fileToUpload);

    if (result == false) {
      // displayLogin
    }
  };

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Grid container>
          {this.state.medRecords.map((medRecord) => (
            <Grid key={medRecord} item md={6}>
              <ShowFile showFileParams={{ medRecord: medRecord }} />
            </Grid>
          ))}
        </Grid>

        <div className={classes.rightToolbar}>
          <input
            id="myInput"
            type="file"
            ref={(ref) => (this.myInput = ref)}
            style={{ display: "none" }}
            onChange={this.uploadFile}
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
        </div>
      </div>
    );
  }
}

ShowFileList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ShowFileList);
