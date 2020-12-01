import React from "react";
import ReactDOM from "react-dom";
// import Button from "components/CustomButtons/Button.js";
import Button from '@material-ui/core/Button';
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
import ShareIcon from '@material-ui/icons/Share';
import DeleteIcon from '@material-ui/icons/Delete';

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
  readDBData
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
      userProfile: {
        email: "20.20.2020",
        firstName: "Dr. Wilder",
        lastName: "Krampfadern",
        plz: "123456",
        city: "Musterstadt",
        street: "Maximilianstraße",
        aboutMe: "Behandlung durch Ausdehnung der Gefäße",
      },
      internal: {
        open: false,
      },
      openLoginRequired: false,
      // todo: split to parent/ interal/child
      showFileParams: props.showFileParams,
      external: {
        tableOptions: {
          name: "Emergency",
          columns: [
            { title: "Datum", field: "date" },
            { title: "Arzt", field: "doctor" },
            { title: "Anmerkung", field: "annotation" },
          ],
          data: [
            {
              date: "20.20.2020",
              doctor: "Dr. Schumacher",
              annotation: "Test",
            },
            {
              predisposition: "Beispielerkrankung",
              diagnosis_year: "1997",
            },
          ],
        },
      },
    };
    console.log(props.showFileParams);
  }

  componentDidUpdate(prevProps) {
    if (this.props == prevProps) {
      return;
    }
    this.setState({ showFileParams: this.props.showFileParams });
  }

  openModal = () => {
    this.setState({ internal: { open: true } });
  };

  removeFile = () => {
    removeDBArray("medRecordsFileLinks", this.state.showFileParams.medRecord);
    this.props.showFileParams.updateFunc();
  };

  handleClose = () => {
    this.setState({ internal: { open: false } });
  };


  // Form functions
  
  // For redux and others
  componentDidUpdate(prevProps) {
    if (prevProps == this.props) {
      // No change from above (currently nothing else is needed)
      return;
    } else {
      this.fetchTable();
    }
  }

  componentDidMount() {
    this.fetchTable();
  }

  // Fetch the table from Firebase (Original data)
  // Is called when table is changed
  fetchTable = () => {
    // todo: default parameter
    return readDBData("ShowFile", false).then((doc_data) => {
      if (doc_data != null) this.setState({ userProfile: doc_data });
      // Cannot get data -> set default data from parent class
      // this.setState({ userProfile: this.state.user });
      // else ;
    });
  };

  // Is called when table is changed
  uploadProfile = () => {
    var user_id = getUserID();
    if (user_id == null) {
      this.displayLogin();
      return false;
    }
    var success = writeDBData("ShowFile", this.state.userProfile);
    if (success == false) this.displayLogin();
  };

  // Nice function: Sets states automatically
  profileChange = (property, event) => {
    var changedValue = event.target.value;
    this.setState({
      userProfile: { ...this.state.userProfile, [property]: changedValue },
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <Card className={classes.card}>
        <LoginAlert loginState={this.state} />

        <CardActionArea onClick={this.openModal}>
          <CardMedia
            className={classes.media}
            component="img"
            alt="Contemplative Reptile"
            image={this.state.showFileParams.medRecord}
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
            {this.state.userProfile.lastName}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {this.state.userProfile.email}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
            {this.state.userProfile.lastName}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
        <IconButton aria-label="share">
          <DeleteIcon />
        </IconButton>
        <IconButton style={{ marginLeft: "auto" }}   onClick={this.removeFile} aria-label="share">
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
              image={this.state.showFileParams.medRecord}
              title="Contemplative Reptile"
            />
               </CardBody>
               </Card>
              <br/>
              <br/>
        
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
                        value: this.state.userProfile.email,
                        onChange: (e) => this.profileChange("email", e),
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
                        value: this.state.userProfile.firstName,
                        onChange: (e) => this.profileChange("firstName", e),
                      }}
                      formControlProps={{
                        fullWidth: true,
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      labelText="Nachname"
                      id="lastName"
                      inputProps={{
                        value: this.state.userProfile.lastName,
                        onChange: (e) => this.profileChange("lastName", e),
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
                      id="aboutMe"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        value: this.state.userProfile.aboutMe,
                        onChange: (e) => this.profileChange("aboutMe", e),
                        multiline: true,
                        rows: 5,
                      }}
                    />
                  </GridItem>
                </GridContainer>
              </CardBody>
              <CardFooter>
                <CustomButton color="primary" onClick={this.uploadProfile} round>
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
