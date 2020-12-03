import {
  DialogActions,
  DialogContent,
  DialogTitle,
} from "components/VisuComps/Dialog.js";
import {
  readDBData,
  uploadFile,
  writeDBData,
} from "components/Internal/DBFunctions.js";

import GetAppIcon from "@material-ui/icons/GetApp";
import AddIcon from "@material-ui/icons/Add";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardBody from "components/Card/CardBody.js";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "components/Card/CardHeader.js";
import CardMedia from "@material-ui/core/CardMedia";
import CustomButton from "components/CustomButtons/Button.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import DeleteIcon from "@material-ui/icons/Delete";
import Dialog from "@material-ui/core/Dialog";
import Fab from "@material-ui/core/Fab";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import IconButton from "@material-ui/core/IconButton";
import PropTypes from "prop-types";
import React from "react";
import ShareIcon from "@material-ui/icons/Share";
import Typography from "@material-ui/core/Typography";
import { connect } from "react-redux";
import DescriptionIcon from "@material-ui/icons/Description";
import { withStyles } from "@material-ui/core/styles";

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
  downloadButton: {
    position: "relative",
    left: "50%",
    height: 150,
    width: 150,
    color: "grey",
  },
});

class MedRecordsContent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dbName: "medRecords",
      data: [],
    };
    this.openModal = this.openModal.bind(this);
  }

  componentDidMount() {
    this.fetchTable();
  }

  componentDidUpdate(prevProps) {
    if (prevProps == this.props) {
      // No change from above (currently nothing else is needed)
      return;
    }
    // this.fetchTable();
  }

  // DB functions
  fetchTable = () => {
    return readDBData(this.state.dbName, false).then((doc_data) => {
      if (doc_data == null) return;
      // Cannot get data -> set default data from parent class
      // this.setState({ data: this.props.tableOptions.data });
      else this.setState({ data: doc_data });
    });
  };

  // Is called when table is changed
  uploadTable = () => {
    var success = writeDBData(this.state.dbName, this.state.data);
  };

  uploadFile = (event) => {
    event.preventDefault();

    var fileToUpload = event.target.files[0];

    var isImage = fileToUpload.type.includes("image");
    //todo: cleaner error catching
    return uploadFile(fileToUpload).then((fileLink) => {
      if (fileLink == null) {
        // displayLogin
      }

      var newMedRecord = {
        link: fileLink,
        isImage: isImage,
        date: "2011",
        doctor: "Dr. Müller",
        disease: "Hüftprobleme",
        open: false,
      };

      this.addnewMedRecord(newMedRecord);
    });
  };

  // Data Table changes
  addnewMedRecord = (newMedRecord) => {
    this.setState(
      (prevState) => {
        const data = [...prevState.data];
        data.push(newMedRecord);
        return { ...prevState, data };
      },
      () => {
        this.uploadTable();
      }
    );
  };

  changeMedRecord(medRecord, key, value) {
    var newData = { ...medRecord, [key]: value };

    this.setState(
      (prevState) => {
        const data = [...prevState.data];
        data[data.indexOf(medRecord)] = newData;
        return { ...prevState, data };
      },
      () => {
        this.uploadTable();
      }
    );
  }

  removeMedRecord = (MedRecordToRemove) => {
    this.setState(
      (prevState) => {
        const data = [...prevState.data];
        data.splice(data.indexOf(MedRecordToRemove), 1);
        return { ...prevState, data };
      },
      () => {
        this.uploadTable();
      }
    );
  };

  // UI functions
  openModal = (medRecord) => {
    this.changeMedRecord(medRecord, "open", true);
  };

  handleClose = (medRecord) => {
    this.changeMedRecord(medRecord, "open", false);
  };

  tableChanges = (medRecord, property, event) => {
    this.changeMedRecord(medRecord, property, event.target.value);
  };

  render() {
    const { classes } = this.props;

    return (
      <div>
        <GridContainer>
          {this.state.data.map((medRecord) => (
            <GridItem xs={12} sm={6} md={4}>
              {/* Previously ShowFile */}
              <Card className={classes.card}>
                <CardActionArea onClick={(e) => this.openModal(medRecord, e)}>
                  {medRecord.isImage ? (
                    <CardMedia
                      className={classes.media}
                      component="img"
                      image={medRecord.link}
                      title="Befund"
                    />
                  ) : (
                    <CardMedia
                      className={classes.media}
                      component="img"
                      image="https://img.pngio.com/file-png-image-royalty-free-stock-png-images-for-your-design-file-png-256_256.png"
                      title="Befund"
                    />
                  )}
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      {medRecord.disease}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      {medRecord.date}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      {medRecord.doctor}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <IconButton
                    onClick={(e) => this.removeMedRecord(medRecord, e)}
                    aria-label="test"
                  >
                    <DeleteIcon />
                  </IconButton>
                  <IconButton style={{ marginLeft: "auto" }} aria-label="share">
                    <ShareIcon />
                  </IconButton>
                </CardActions>
                <Dialog
                  fullWidth={true}
                  maxWidth={"xl"}
                  onClose={(e) => this.handleClose(medRecord, e)}
                  aria-labelledby="customized-dialog-title"
                  open={medRecord.open}
                >
                  <DialogTitle
                    id="customized-dialog-title"
                    onClose={(e) => this.handleClose(medRecord, e)}
                  >
                    Befund
                  </DialogTitle>
                  <DialogContent dividers>
                    <Card>
                      <CardBody>
                        {medRecord.isImage ? (
                          <div>
                            <CardMedia
                              component="img"
                              image={medRecord.link}
                              title="Befund"
                            />
                            <a href={medRecord.link} download>
                              Expandieren
                            </a>
                          </div>
                        ) : (
                          <a href={medRecord.link} download>
                            <GetAppIcon className={classes.downloadButton} />
                          </a>
                        )}
                      </CardBody>
                    </Card>

                    <Card>
                      <CardHeader color="primary">
                        <h4 className={classes.cardTitleWhite}>Details</h4>
                      </CardHeader>
                      <CardBody>
                        <GridContainer>
                          <GridItem xs={12} sm={12} md={4}>
                            <CustomInput
                              labelText="Datum"
                              id="date"
                              inputProps={{
                                value: medRecord.date,
                                onChange: (e) =>
                                  this.tableChanges(medRecord, "date", e),
                              }}
                              formControlProps={{
                                fullWidth: true,
                              }}
                            />
                          </GridItem>
                          <GridItem xs={12} sm={12} md={4}>
                            <CustomInput
                              labelText="Arzt"
                              id="doctor"
                              inputProps={{
                                value: medRecord.doctor,
                                onChange: (e) =>
                                  this.tableChanges(medRecord, "doctor", e),
                              }}
                              formControlProps={{
                                fullWidth: true,
                              }}
                            />
                          </GridItem>
                          <GridItem xs={12} sm={12} md={4}>
                            <CustomInput
                              labelText="Krankheit"
                              id="disease"
                              inputProps={{
                                value: medRecord.disease,
                                onChange: (e) =>
                                  this.tableChanges(medRecord, "disease", e),
                              }}
                              formControlProps={{
                                fullWidth: true,
                              }}
                            />
                          </GridItem>
                        </GridContainer>
                        <GridContainer>
                          <GridItem xs={12} sm={12} md={12}>
                            <CustomInput
                              labelText="Weiteres"
                              id="moreInfo"
                              formControlProps={{
                                fullWidth: true,
                              }}
                              inputProps={{
                                value: medRecord.moreInfo,
                                onChange: (e) =>
                                  this.tableChanges(medRecord, "moreInfo", e),
                                multiline: true,
                                rows: 5,
                              }}
                            />
                          </GridItem>
                        </GridContainer>
                      </CardBody>
                    </Card>
                    {/* todo: Add QR Code to share */}
                  </DialogContent>
                  <DialogActions>
                    <CustomButton
                      autoFocus
                      onClick={(e) => this.handleClose(medRecord, e)}
                      color="primary"
                    >
                      Close
                    </CustomButton>
                  </DialogActions>
                </Dialog>
              </Card>
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

MedRecordsContent.propTypes = {
  classes: PropTypes.object.isRequired,
};

// Required for each component that relies on the loginState
const mapStateToProps = (state) => ({
  loginState: state.loginState,
});

const MedRecordsContentWithRedux = connect(mapStateToProps)(MedRecordsContent);

export default withStyles(styles)(MedRecordsContentWithRedux);
