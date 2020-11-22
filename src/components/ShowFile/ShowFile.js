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
import Icon from "@material-ui/core/Icon";
import AddIcon from "@material-ui/icons/Add";

import Fab from "@material-ui/core/Fab";

import PropTypes from "prop-types";

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  root2: {
    maxWidth: 345,
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
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

    this.showFileParams=props.showFileParams;

    // Integrate script
    const script = document.createElement("script");
    script.src =
      "https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js";
    script.async = true;
    document.body.appendChild(script);

    this.state = {
      open: false,
      displayLogin: false,
      showFileParams: "Empty"
    };
  }

  componentDidUpdate(prevProps) {
    this.setState({ showFileParams: this.props.showFileParams });
  }

  handleClick = () => {
    console.log("parent handleClick");
  };

  loginFirst = () => {
    this.setState({
      displayLogin: true,
    });
  };

  checkUser = () => {
    var user = firebase.auth().currentUser;
    console.log(user);

    if (user) {
      // User is signed in.
      return true;
    } else {
      // No user is signed in.
      this.loginFirst();
      return false;
    }
  };

  openModal = () => {
    if (this.checkUser() == true) {
      this.setState({ open: true });
    }
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  onChangeHandler = (event) => {};

  render() {
    const { classes } = this.props;

    return (
      <Card className={classes.root2}>
        <LoginAlert stateLogin={this.state} />
        <CardActionArea onClick={this.openModal}>
          <CardMedia
            component="img"
            alt="Contemplative Reptile"
            square
            image={this.state.showFileParams.docLink}
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              Dr. Wilder
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              20.11.2020
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Stuttgart
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" align="center" color="primary">
            Teilen
          </Button>
        </CardActions>
        <div>
          <Dialog
            fullWidth={true}
            maxWidth={"xl"}
            onClose={this.handleClose}
            aria-labelledby="customized-dialog-title"
            open={this.state.open}
          >
            <DialogTitle
              id="customized-dialog-title"
              onClose={this.handleClose}
            >
              Befund
            </DialogTitle>
            <DialogContent dividers>
              <CardMedia
                component="img"
                alt="Contemplative Reptile"
                square
                image={this.state.showFileParams.docLink}
                title="Contemplative Reptile"
              />
              <Typography variant="h3" gutterBottom>
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
              <Typography
                variant="h4"
                component="h2"
                align="center"
                gutterBottom
              >
                18.11.2020, Dr. Wilder
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button autoFocus onClick={this.handleClose} color="primary">
                Close
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </Card>
    );
  }
}

ShowFile.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ShowFile);
