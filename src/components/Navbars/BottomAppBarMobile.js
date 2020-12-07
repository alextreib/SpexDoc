import { grayColor } from "assets/jss/material-dashboard-react.js";

import AppBar from "@material-ui/core/AppBar";
import Badge from "@material-ui/core/Badge";
import CssBaseline from "@material-ui/core/CssBaseline";
import HomeIcon from "@material-ui/icons/Home";
import { Link } from "react-router-dom";
import NotificationData from "components/NotificationData/NotificationData.js";
import NotificationIcon from "@material-ui/icons/Notifications";
import ProfileButton from "components/Navbars/ProfileButton.js";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import AccountCircle from "@material-ui/icons/AccountCircle";

import React from "react";
import Toolbar from "@material-ui/core/Toolbar";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import RestoreIcon from "@material-ui/icons/Restore";
import { makeStyles } from "@material-ui/core/styles";

import { useState, useEffect } from "react";
import { readDBData, writeDBData } from "components/Internal/DBFunctions.js";

const useStyles = makeStyles((theme) => ({
  root: {},
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
  },
  LinkNotification: {
    color: "inherit",
  },
  Profile: {
    color: "inherit",
  },
}));

export default function BottomAppBarMobile() {
  const classes = useStyles();

  const [notificationList, setnotificationList] = React.useState([]);
  const [value, setValue] = React.useState(0);

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

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <BottomNavigation
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
          showLabels
          className={classes.root}
        >
          <BottomNavigationAction
            label="Notification"
            icon={
              <Link className={classes.Home} to="/dashboard">
                <HomeIcon />
              </Link>
            }
          />

          <BottomNavigationAction
            label="Recents"
            icon={
              <Link className={classes.LinkNotification} to="/notifications">
                <Badge badgeContent={notificationList.length} color="secondary">
                  <NotificationIcon />
                </Badge>
              </Link>
            }
          />

          <BottomNavigationAction
            label="Profile"
            icon={
              <Link className={classes.Profile} to="/user">
                <ProfileButton />
              </Link>
            }
          />
        </BottomNavigation>
      </AppBar>
    </React.Fragment>
  );
}
