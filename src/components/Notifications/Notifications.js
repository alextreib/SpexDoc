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

// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import SnackbarContent from "components/Snackbar/SnackbarContent.js";
import Snackbar from "components/Snackbar/Snackbar.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import AddAlert from "@material-ui/icons/AddAlert";

import CloseIcon from "@material-ui/icons/Close";

import IconButton from "@material-ui/core/IconButton";
// import Button from "@material-ui/core/Button";

import Icon from "@material-ui/core/Icon";
import AddIcon from "@material-ui/icons/Add";

import Fab from "@material-ui/core/Fab";

import PropTypes from "prop-types";

const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0",
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF",
    },
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1",
    },
  },
};

class Notifications extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      tl: false,
      tc: false,
      tr: false,
      bl: false,
      bc: false,
      br: false,
      timeout: 1000, //ms
      message: "Test Message",
      type: "info", //info, success, warning, danger, primary
      position: "tc", // tc, tl
      // showFileParams: props.,
      // DelayTime
    };

    // this.showNotification=showNotification
    this.showNotification.bind(this);
  }

  // Listens to own and assigned parent state
  componentDidUpdate(prevProps) {
    // Is called when the corresponding state is changed in parent class (indirect trigger)
    // Is also called a 2nd time when setState{open:true} is called inside this function
    if (this.props.notifications.openNotification == true) {
      this.showgenericNotification();
      console.log("Login required");
      // Open Dialog
      this.setState({
        open: true,
      });
      // Reset it in parent class
      this.props.notifications.openNotification = false;
    }
  }

  loginFirst = () => {
    this.setState({
      displayLogin: true,
    });
  };

  magicFunc = () => {
    this.showgenericNotification();
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  
  showgenericNotification = () => {
      this.setState({ [this.state.position]: true });
      setTimeout(() => {
        this.setState({[this.state.position]: false });
      }, this.state.timeout);
  };

  showNotification = (place) => {
    if (!this.state.$place) {
      this.setState({ [place]: true });
      setTimeout(() => {
        this.setState({ [place]: false });
      }, this.state.timeout);
    }
  };

  render() {
    const { classes } = this.props;

    return (
      <Card>
        <Button onClick={this.magicFunc} color="primary" autoFocus>
          Verstanden
        </Button>
        <CardHeader color="primary">
          <h4 className={classes.cardTitleWhite}>Notifications</h4>
          <p className={classes.cardCategoryWhite}>
            Handcrafted by our friends from{" "}
            <a
              target="_blank"
              href="https://material-ui-next.com/?ref=creativetime"
            >
              Material UI
            </a>{" "}
            and styled by{" "}
            <a
              target="_blank"
              href="https://www.creative-tim.com/?ref=mdr-notifications-page"
            >
              Creative Tim
            </a>
            . Please checkout the{" "}
            <a href="#pablo" target="_blank">
              full documentation
            </a>
            .
          </p>
        </CardHeader>
        <CardBody>
          <GridContainer>
            <GridItem xs={12} sm={12} md={6}>
              <h5>Notifications Style</h5>
              <br />
              <SnackbarContent message={"This is a plain notification"} />
              <SnackbarContent
                message={"This is a notification with close button."}
                close
              />
              <SnackbarContent
                message={"This is a notification with close button and icon."}
                close
                icon={AddAlert}
              />
              <SnackbarContent
                message={
                  "This is a notification with close button and icon and have many lines. You can see that the icon and the close button are always vertically aligned. This is a beautiful notification. So you don't have to worry about the style."
                }
                close
                icon={AddAlert}
              />
            </GridItem>
            <GridItem xs={12} sm={12} md={6}>
              <h5>Notifications States</h5>
              <br />
              <SnackbarContent
                message={
                  'INFO - This is a regular notification made with color="info"'
                }
                close
                color="info"
              />
              <SnackbarContent
                message={
                  'SUCCESS - This is a regular notification made with color="success"'
                }
                close
                color="success"
              />
              <SnackbarContent
                message={
                  'WARNING - This is a regular notification made with color="warning"'
                }
                close
                color="warning"
              />
              <SnackbarContent
                message={
                  'DANGER - This is a regular notification made with color="danger"'
                }
                close
                color="danger"
              />
              <SnackbarContent
                message={
                  'PRIMARY - This is a regular notification made with color="primary"'
                }
                close
                color="primary"
              />
            </GridItem>
          </GridContainer>
          <br />
          <br />
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={6} style={{ textAlign: "center" }}>
              <h5>
                Notifications Places
                <br />
                <small>Click to view notifications</small>
              </h5>
            </GridItem>
          </GridContainer>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={10} lg={8}>
              <GridContainer>
                <GridItem xs={12} sm={12} md={4}>
                  <Button
                    fullWidth
                    color="primary"
                    onClick={() => this.showNotification("tl")}
                  >
                    Top Left
                  </Button>
                  <Snackbar
                    place="tl"
                    color="info"
                    icon={AddAlert}
                    message={this.state.message}
                    open={this.state.tl}
                    closeNotification={() => this.setState({ tl: false })}
                    close
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <Button
                    fullWidth
                    color="primary"
                    onClick={() => this.showNotification("tc")}
                  >
                    Top Center
                  </Button>
                  <Snackbar
                    place="tc"
                    color="info"
                    icon={AddAlert}
                    message={this.state.message}
                    open={this.state.tc}
                    closeNotification={() => this.setState({ tc: false })}
                    close
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <Button
                    fullWidth
                    color="primary"
                    onClick={() => this.showNotification("tr")}
                  >
                    Top Right
                  </Button>
                  <Snackbar
                    place="tr"
                    color="info"
                    icon={AddAlert}
                    message="Sie sind Arzt? Dann erleichern Sie sich die tägliche Arbeit."
                    open={this.state.tr}
                    closeNotification={() => this.setState({ tr: false })}
                    close
                  />
                </GridItem>
              </GridContainer>
            </GridItem>
          </GridContainer>
          <GridContainer justify={"center"}>
            <GridItem xs={12} sm={12} md={10} lg={8}>
              <GridContainer>
                <GridItem xs={12} sm={12} md={4}>
                  <Button
                    fullWidth
                    color="primary"
                    onClick={() => this.showNotification("bl")}
                  >
                    Bottom Left
                  </Button>
                  <Snackbar
                    place="bl"
                    color="info"
                    icon={AddAlert}
                    message={this.state.message}
                    open={this.state.bl}
                    closeNotification={() => this.setState({ bl: false })}
                    close
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <Button
                    fullWidth
                    color="primary"
                    onClick={() => this.showNotification("bc")}
                  >
                    Bottom Center
                  </Button>
                  <Snackbar
                    place="bc"
                    color="info"
                    icon={AddAlert}
                    message={this.state.message}
                    open={this.state.bc}
                    closeNotification={() => this.setState({ bc: false })}
                    close
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <Button
                    fullWidth
                    color="primary"
                    onClick={() => this.showNotification("br")}
                  >
                    Bottom Right
                  </Button>
                  <Snackbar
                    place="br"
                    color="info"
                    icon={AddAlert}
                    message={this.state.message}
                    open={this.state.br}
                    closeNotification={() => this.setState({ br: false })}
                    close
                  />
                </GridItem>
              </GridContainer>
            </GridItem>
          </GridContainer>
        </CardBody>
      </Card>
    );
  }
}

Notifications.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Notifications);
