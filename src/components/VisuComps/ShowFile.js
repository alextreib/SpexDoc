import React from "react";
import ReactDOM from "react-dom";
// import Button from "components/CustomButtons/Button.js";
import Button from "@material-ui/core/Button";
import CustomButton from "components/CustomButtons/Button.js";

import firebase from "firebase/app";
import "firebase/storage";
import "firebase/firestore";
import { makeStyles } from "@material-ui/core/styles";
import { withStyles } from "@material-ui/core/styles";

import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import ShareIcon from "@material-ui/icons/Share";
import DeleteIcon from "@material-ui/icons/Delete";

import Typography from "@material-ui/core/Typography";

import Dialog from "@material-ui/core/Dialog";
import LoginAlert from "components/LoginAlert/LoginAlert.js";

import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import CloseIcon from "@material-ui/icons/Close";

import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import CardHeader from "components/Card/CardHeader.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";

import { getUserID } from "components/Internal/Checks.js";

import IconButton from "@material-ui/core/IconButton";
// import Button from "@material-ui/core/Button";
import EditableTableReport from "components/EditableTableReport/EditableTableReport.js";

import Icon from "@material-ui/core/Icon";
import AddIcon from "@material-ui/icons/Add";

import Fab from "@material-ui/core/Fab";

import {
  removeDBArray,
  writeDBData,
  uploadFile,
  readDBData,
  appendDBArray,substituteDBArrayElement,deleteDoc
} from "components/Internal/DBFunctions.js";

import PropTypes from "prop-types";

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
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle
      disableTypography
      className={classes.dialogtitle}
      {...other}
    >
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

class ShowFile extends React.Component {
  constructor(props) {
    super(props);

    // Integrate script
    this.state = {
      commonProps: {
        LoginAlertProps: {
          openLoginRequired: false,
          FuncParams: "test",
        },
      },
      medRecord: {
        link: props.medRecordParams.link,
        date: "20.20.2020",
        doctor: "Dr. Wilder",
        disease: "Krampfadern",
        moreInfo: "Behandlung durch Ausdehnung der Gefäße",
      },
      internal: {
        open: false,
      },
      medRecordParams: props.medRecordParams,
    };
    console.log(props.medRecordParams);
  }

  componentDidUpdate(prevProps) {
    if (this.props == prevProps) {
      return;
    }
    this.updateProps();
  }

  componentDidMount() {
    this.fetchTable();
  }

  updateProps()
  {
    this.setState({ medRecord:{ ...this.state.medRecord, link: this.props.medRecordParams.link }});
    this.setState({ medRecordParams:this.props.medRecordParams });
  }

  openModal = () => {
    this.setState({ internal: { open: true } });
  };

  removeFile = () => {
   var rest= removeDBArray(
      "medRecordsFileLinks",
      this.state.medRecord.link
    ).then((doc_data) => {
      this.props.medRecordParams.updateFunc();
    });

    deleteDoc("medRecords"+this.state.medRecordParams.id);
  };

  handleClose = () => {
    this.setState({ internal: { open: false } });
  };

  // Fetch the table from Firebase (Original data)
  // Is called when table is changed
  fetchTable = () => {
    // todo: default parameter
    return readDBData("medRecords"+this.state.medRecordParams.id, false).then((medRecord) => {
      if (medRecord == null)
      {
        return;
      // Display Login
      // Obtaining all medRecords
      }
      this.setState({ medRecord: medRecord })
    });
  };

  // Is called when table is changed
  uploadMedRecord = () => {
    var user_id = getUserID();
    if (user_id == null) {
      this.displayLogin();
      return false;
    }

    writeDBData("medRecords"+this.state.medRecordParams.id,this.state.medRecord )
  };

  // Nice function: Sets states automatically
  profileChange = (property, event) => {
    var changedValue = event.target.value;
    this.setState({
      medRecord: { ...this.state.medRecord, [property]: changedValue },
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <Card className={classes.card}>

        <CardActionArea onClick={this.openModal}>
          <CardMedia
            className={classes.media}
            component="img"
            alt="Contemplative Reptile"
            image={this.state.medRecord.link}
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {this.state.medRecord.disease}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {this.state.medRecord.date}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {this.state.medRecord.disease}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
        <IconButton 
           onClick={this.removeFile}
           aria-label="test">
          <DeleteIcon />
        </IconButton>
          <IconButton
            style={{ marginLeft: "auto" }}
            aria-label="share"
          >
          <ShareIcon />
        </IconButton>
        </CardActions>
        <Dialog
          fullWidth={true}
          maxWidth={"xl"}
          onClose={this.handleClose}
          aria-labelledby="customized-dialog-title"
          open={this.state.internal.open}
        >
          <DialogTitle id="customized-dialog-title" onClose={this.handleClose}>
            Befund
          </DialogTitle>
          <DialogContent dividers>
          <Card>
          <CardBody>
            <CardMedia
              component="img"
              alt="Contemplative Reptile"
                  image={this.state.medRecord.link}
              title="Contemplative Reptile"
            />
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
                        value: this.state.medRecord.date,
                        onChange: (e) => this.profileChange("date", e),
                      }}
                      formControlProps={{
                        fullWidth: true,
                        color: "secondary",
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      labelText="Arzt"
                      id="doctor"
                      inputProps={{
                        value: this.state.medRecord.doctor,
                        onChange: (e) => this.profileChange("doctor", e),
                      }}
                      formControlProps={{
                        fullWidth: true,
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      labelText="Nachname"
                      id="disease"
                      inputProps={{
                        value: this.state.medRecord.disease,
                        onChange: (e) => this.profileChange("disease", e),
                      }}
                      formControlProps={{
                        fullWidth: true,
                        color: "secondary",
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
                        value: this.state.medRecord.moreInfo,
                        onChange: (e) => this.profileChange("moreInfo", e),
                        multiline: true,
                        rows: 5,
                      }}
                    />
                  </GridItem>
                </GridContainer>
              </CardBody>
              <CardFooter>
                <CustomButton
                  color="primary"
                  onClick={this.uploadMedRecord}
                  round
                >
                  Speichern
                </CustomButton>
              </CardFooter>
            </Card>
            {/* todo: Add QR Code to share */}
          </DialogContent>
          <DialogActions>
            <CustomButton autoFocus onClick={this.handleClose} color="primary">
              Close
            </CustomButton>
          </DialogActions>
        </Dialog>
      </Card>
    );
  }
}

ShowFile.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ShowFile);
