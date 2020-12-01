import {
  grayColor,
} from "assets/jss/material-dashboard-react.js";

import AppBar from "@material-ui/core/AppBar";
import Badge from "@material-ui/core/Badge";
import CssBaseline from "@material-ui/core/CssBaseline";
import HomeIcon from "@material-ui/icons/Home";
import IconButton from "@material-ui/core/IconButton";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import NotificationData from "components/NotificationData/NotificationData.js";
import NotificationIcon from "@material-ui/icons/Notifications";
import ProfileButton from "components/Navbars/ProfileButton.js";
import React from "react";
import Toolbar from "@material-ui/core/Toolbar";
import { makeStyles } from "@material-ui/core/styles";

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
    backgroundColor: grayColor[10],//todo: maybe black?
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
            to="/dashboard"
            activeClassName="active"
            style={{ textDecoration: "none" }}
          >
            {/* <Link style={{ textDecoration: "none" }} to="/dashboard"> */}
            <IconButton edge="start" color="inherit" aria-label="open drawer">
              <HomeIcon />
            </IconButton>
          </NavLink>
          <div className={classes.grow} />

          {/* todo: adding paper/dropdown list with itemsm, also wrong color */}
          <Link color="inherit" to="/notifications">
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
