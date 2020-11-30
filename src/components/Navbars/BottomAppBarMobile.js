import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Paper from "@material-ui/core/Paper";
import Fab from "@material-ui/core/Fab";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import Avatar from "@material-ui/core/Avatar";
import MenuIcon from "@material-ui/icons/Menu";
import AddIcon from "@material-ui/icons/Add";
import SearchIcon from "@material-ui/icons/Search";
import MoreIcon from "@material-ui/icons/MoreVert";
import HomeIcon from "@material-ui/icons/Home";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import NotificationIcon from "@material-ui/icons/Notifications";
import Button from "components/CustomButtons/Button.js";
import Hidden from "@material-ui/core/Hidden";
import Badge from "@material-ui/core/Badge";
import red from "@material-ui/core/colors/red";

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";


import NotificationData from "components/NotificationData/NotificationData.js";

import AccountCircle from "@material-ui/icons/AccountCircle";
import NotificationsIcon from "@material-ui/icons/Notifications";

import {
  container,
  defaultFont,
  primaryColor,
  defaultBoxShadow,
  infoColor,
  successColor,
  warningColor,
  dangerColor,
  whiteColor,
  grayColor
} from "assets/jss/material-dashboard-react.js";

const useStyles = makeStyles((theme) => ({
  text: {
    padding: theme.spacing(2, 2, 0),
  },
  paper: {
    paddingBottom: 50,
  },
  list: {
    marginBottom: theme.spacing(2),
  },
  subheader: {
    backgroundColor: theme.palette.background.paper,
  },
  appBar: {
    top: "auto",
    bottom: 0,
    backgroundColor: "white",
    boxShadow: "none",
    borderBottom: "0",
    marginBottom: "0",
    position: "fixed",
    width: "100%",
    color: grayColor[7],
    minHeight: "50px",
    display: "block",
  },
  grow: {
    flex: 1,
  },
  fabButton: {
    position: "absolute",
    zIndex: 1,
    top: -30,
    left: 0,
    right: 0,
    margin: "0 auto",
  },
}));

export default function BottomAppBarMobile() {
  const classes = useStyles();

  const [notificationList, setnotificationList] = React.useState([
    "test",
    "test2",
  ]);

  const [openNotification, setOpenNotification] = React.useState(null);

  // When child (NotificationData) triggers change -> this function is called
  const notificationDataChange = (newList) => {
    setnotificationList(newList);
  };

  const handleClickNotification = (event) => {
    if (openNotification) {
      setOpenNotification(null);
    } else {
      setOpenNotification(event.currentTarget);
    }
  };

  const handleCloseNotification = () => {
    setOpenNotification(null);
  };

 const handleLoginProfile = () =>{
  console.log("login process");
  var provider = new firebase.auth.GoogleAuthProvider();

  firebase
    .auth()
    .signInWithPopup(provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      // this.setProfile(user);
      console.log("User successfully logged in ");
      // this.props.loginRedux({ user_id: user.uid });
    })
    .catch((error) => {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      console.log("error: " + errorCode + ":" + errorMessage);
      // ...
    });
 }

  return (
    <React.Fragment>
      <CssBaseline />
      <NotificationData onNotificationDataChange={notificationDataChange} />
      <AppBar className={classes.appBar}>
        <Toolbar>
          <NavLink
            to="/admin/dashboard"
            activeClassName="active"
            style={{ textDecoration: "none" }}
          >
            {/* <Link style={{ textDecoration: "none" }} to="/admin/dashboard"> */}
            <IconButton edge="start" color="inherit" aria-label="open drawer">
              <HomeIcon />
            </IconButton>
          </NavLink>
          <div className={classes.grow} />

          {/* todo: adding paper/dropdown list with itemsm, also wrong color */}
          <Link color="inherit" to="/admin/notifications">
            <Badge badgeContent={notificationList.length} color="primary">
              <NotificationIcon
                color="black"
                onClick={handleClickNotification}
                className={classes.icons}
              ></NotificationIcon>
            </Badge>
          </Link>
          <Link color="inherit" to="/admin/user">
          <IconButton    onClick={handleLoginProfile} edge="end" color="inherit">
            <AccountCircle />
          </IconButton>
          </Link>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}
