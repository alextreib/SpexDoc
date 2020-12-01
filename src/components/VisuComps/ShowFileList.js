import Grid from "@material-ui/core/Grid";
import React from "react";

import "firebase/storage";
import "firebase/firestore";
import { withStyles } from "@material-ui/core/styles";

import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";

import PropTypes from "prop-types";

import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Button from "components/CustomButtons/Button.js";

import ShowFile from "components/VisuComps/ShowFile.js";
import {
  readDBData,
  uploadFile,
  writeDBData,
  appendDBArray,
} from "components/Internal/DBFunctions.js";

import { connect } from "react-redux";

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

// Explanation data structure:
// 1) medRecordsFileLinks has the keys ["FileLink1","FileLink2"]
// 2) medRecords has the keys [{doctor: "Dr. Wilder", date: "2020"},{doctor: "Doktor2"}]
// The keys are given to the MedRecord with medRecordParams (link)
// With this key, the MedRecord can find the structure in medRecords (matching)
// Same goes for removing -> Removing in both structure
// Reason why so ugly: Props etc. not working parent
// Never seen such bad architecture
class ShowFileList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      medRecordsFileLinks: [],
    };
    this.loadFiles = this.loadFiles.bind(this);
  }

  componentDidMount() {
    this.loadFiles();
  }

  componentDidUpdate(prevProps) {
    if (prevProps == this.props) {
      // No change from above (currently nothing else is needed)
      return;
    }
    this.loadFiles();
  }

  loadFiles = () => {
    setTimeout(() => {
      return readDBData("medRecordsFileLinks", false).then((doc_data) => {
        console.log(doc_data);

        if (doc_data != null) this.setState({ medRecordsFileLinks: doc_data });
      });
    // See if there's an intervall required. It seems 100ms are appropriate
    }, 0);
  };

  uploadFile = (event) => {
    event.preventDefault();

    var fileToUpload = event.target.files[0];
    //todo: cleaner error catching
    return uploadFile("medRecordsFileLinks", fileToUpload).then((fileLink) => {
      if (fileLink == null) {
        // displayLogin
      }

      appendDBArray("medRecordsFileLinks", fileLink);

      this.setState((prevState) => ({
        medRecordsFileLinks: [...prevState.medRecordsFileLinks, fileLink],
      }));
      // Success
      this.loadFiles();
    });
  };

  magicFunc = () => {};

  render() {
    const { classes } = this.props;

    return (
      <div>
        <GridContainer>
          {this.state.medRecordsFileLinks.map((link, index) => (
            <GridItem xs={12} sm={6} md={4}>
              <ShowFile
                medRecordParams={{
                  link: link,
                  id: index,
                  updateFunc: this.loadFiles,
                }}
              />
            </GridItem>
          ))}
        </GridContainer>

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

// Required for each component that relies on the loginState
const mapStateToProps = (state) => ({
  loginState: state.loginState,
});

const ShowFileListWithRedux = connect(mapStateToProps)(ShowFileList);

export default withStyles(styles)(ShowFileListWithRedux);
