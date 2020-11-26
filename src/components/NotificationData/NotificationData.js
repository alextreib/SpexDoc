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

// Contains only data to visualize the
class NotificationData extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      notificationList: props.notificationList,
    };
  }

  appendList(item) {
    this.setState({ notificationList: [...this.state.notificationList, item] });
  }

  // Listens to own and assigned parent state
  componentDidUpdate(prevProps) {
    // Is called when the corresponding state is changed in parent class (indirect trigger)
    // Is also called a 2nd time when setState{open:true} is called inside this function
    // if (this.props.notifications.openNotification == true) {
    //   this.showgenericNotification();
    //   // Open Dialog
    //   this.setState({
    //     open: true,
    //   });
    //   // Reset it in parent class
    //   this.props.notifications.openNotification = false;
    // }
  }

  changeChange = () => {
    var childList = ["childitem1", "childitem2"];
    this.props.onNotificationDataChange(childList);
  };

  render() {
    return (
      <div>
      </div>
    );
  }
}

export default NotificationData;
