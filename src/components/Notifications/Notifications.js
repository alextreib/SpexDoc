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
      duration: 2500, //ms
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
      this.setState({ [this.state.position]: false });
    }, this.state.duration);
  };

  showNotification = (place) => {
    if (!this.state.$place) {
      this.setState({ [place]: true });
      setTimeout(() => {
        this.setState({ [place]: false });
      }, this.state.duration);
    }
  };

  render() {
    const { classes } = this.props;
    return (
      <Card>
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={10} lg={8}>
            <GridContainer>
              <GridItem xs={12} sm={12} md={4}>
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
                <Snackbar
                  place="tc"
                  color="info"
                  icon={AddAlert}
                  message={this.props.notifications.message}
                  open={this.state.tc}
                  closeNotification={() => this.setState({ tc: false })}
                  close
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={4}>
                <Snackbar
                  place="tr"
                  color="info"
                  icon={AddAlert}
                  message={this.props.notifications.message}
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
      </Card>
    );
  }
}

Notifications.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Notifications);
