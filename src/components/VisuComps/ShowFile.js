import React from "react";
import ReactDOM from "react-dom";
import Button from "components/CustomButtons/Button.js";

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
import Typography from "@material-ui/core/Typography";

import Dialog from "@material-ui/core/Dialog";
import LoginAlert from "components/LoginAlert/LoginAlert.js";

import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import CloseIcon from "@material-ui/icons/Close";

import IconButton from "@material-ui/core/IconButton";
// import Button from "@material-ui/core/Button";

import Icon from "@material-ui/core/Icon";
import AddIcon from "@material-ui/icons/Add";

import Fab from "@material-ui/core/Fab";

import {
  removeDBArray,
  writeDBData,
  uploadFile,
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
      internal: {
        open: false,
      },
      openLoginRequired: false,
      // todo: split to parent/ interal/child
      showFileParams: props.showFileParams,
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
    console.log("File removed");
    removeDBArray("medRecords", this.state.showFileParams.medRecord);
    //   return;
    // }
    // var id = user.uid;

    // // Get
    // var defaultDatabase = firebase.firestore();

    // // Search in
    // var docLink=this.state.medRecord.docLink;
    // const docRef = defaultDatabase.collection("userStorage").doc("docLinks");

    // docRef.update({
    //   [id]: firebase.firestore.FieldValue.arrayRemove(docLink),
    // });

    //todo: remove in Cloud Firestore
  };

  magicFunc = () => {
    console.log("magic func");
  };

  handleClose = () => {
    this.setState({ internal: { open: false } });
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
              Befund Nr.
            </Typography>
            {/* <Typography variant="body2" color="textSecondary" component="p">
              20.11.2020
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Stuttgart
            </Typography> */}
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button
            onClick={this.removeFile}
            style={{ marginLeft: "auto", backgroundColor: "darkred" }}
          >
            Remove
          </Button>
          <Button onClick={this.magicFunc} style={{ marginLeft: "auto" }}>
            Details
          </Button>
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
            <CardMedia
              component="img"
              alt="Contemplative Reptile"
              image={this.state.showFileParams.medRecord}
              title="Contemplative Reptile"
            />
            {/* <Typography variant="h3" gutterBottom>
              Diagnose
            </Typography>
            <Typography variant="body1" gutterBottom>
              Allergie festgestellt.
            </Typography>
            <Typography variant="h3" gutterBottom>
              Therapie
            </Typography>
            <Typography variant="body1" gutterBottom>
              Es wurde eine Hyposensibilisierung durchgeführt. Keine weiteren
              Komplikationen bekannt.,
            </Typography>
            <Typography variant="h4" component="h2" align="center" gutterBottom>
              18.11.2020, Dr. Wilder
            </Typography> */}
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={this.handleClose} color="primary">
              Close
            </Button>
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
