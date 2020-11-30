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
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
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

import Grow from "@material-ui/core/Grow";
import Popper from "@material-ui/core/Popper";
import Divider from "@material-ui/core/Divider";
import Person from "@material-ui/icons/Person";

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

import NotificationData from "components/NotificationData/NotificationData.js";
import ProfileButton from "components/Navbars/ProfileButton.js";

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
  grayColor,
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

  //todo: What about the notification on bottom bar? Displaying Popper or only redirect?
  const handleClickNotification = () => {
    if (openNotification) {
      setOpenNotification(null);
    } else {
      console.log("else");
      // setOpenNotification(event.currentTarget);
    }
  };

  const handleCloseNotification = () => {
    setOpenNotification(null);
  };


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
              />
            </Badge>
          </Link>
          <ProfileButton />
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}
