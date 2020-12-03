import { grayColor } from "assets/jss/material-dashboard-react.js";

import AppBar from "@material-ui/core/AppBar";
import Badge from "@material-ui/core/Badge";
import CssBaseline from "@material-ui/core/CssBaseline";
import HomeIcon from "@material-ui/icons/Home";
import { Link } from "react-router-dom";
import NotificationData from "components/NotificationData/NotificationData.js";
import NotificationIcon from "@material-ui/icons/Notifications";
import ProfileButton from "components/Navbars/ProfileButton.js";
import React from "react";
import Toolbar from "@material-ui/core/Toolbar";
import { makeStyles } from "@material-ui/core/styles";

import { useState, useEffect } from "react";
import { readDBData, writeDBData } from "components/Internal/DBFunctions.js";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > * + *": {
      marginLeft: theme.spacing(5),
    },
  },
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
    backgroundColor: grayColor[10], //todo: maybe black?
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
  Home: {
    color: "inherit",
    marginLeft: theme.spacing(2),
  },
  LinkNotification: {
    color: "inherit",
    marginRight: theme.spacing(2),
  },
  Profile: {
    color: "inherit",
    marginRight: theme.spacing(5),
  },
}));

export default function BottomAppBarMobile() {
  const classes = useStyles();

  const [notificationList, setnotificationList] = React.useState([]);

  const [openNotification, setOpenNotification] = React.useState(null);

  useEffect(() => {
    fetchTable();
  });

  const fetchTable = () => {
    readDBData("Notifications", false).then((doc_data) => {
      if (doc_data == null) {
        console.log(doc_data);
        return;
      } else {
        setnotificationList(doc_data);
      }
    });
  };

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
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Link className={classes.Home} to="/dashboard">
            <HomeIcon />
          </Link>
          <div className={classes.grow} />
          <Link className={classes.LinkNotification} to="/notifications">
            <Badge badgeContent={notificationList.length} color="secondary">
              <NotificationIcon />
            </Badge>
          </Link>
          <ProfileButton className={classes.Profile} />
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}
