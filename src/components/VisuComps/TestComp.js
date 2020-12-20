import AccountCircle from '@material-ui/icons/AccountCircle';
import AppBar from '@material-ui/core/AppBar';
import Badge from "@material-ui/core/Badge";
import Dashboard from "@material-ui/icons/Dashboard";
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import { Link } from "react-router-dom";
import MailIcon from "@material-ui/icons/Mail";
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreIcon from '@material-ui/icons/MoreVert';
import NotificationIcon from "@material-ui/icons/Notifications";
import NotificationsIcon from '@material-ui/icons/Notifications';
import React from "react";
import SearchIcon from '@material-ui/icons/Search';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  sectionDesktop: {
  },
}));

export default function TestComp() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Badge badgeContent={4} color="primary">
        <MailIcon />
      </Badge>
      <MailIcon />

      <Badge badgeContent="" color="transparent">
        <Dashboard fontSize="large" />
      </Badge>
      <Dashboard fontSize="large" />

      <Link className={classes.LinkNotification} to="/notifications">
        <Badge badgeContent="2" color="secondary">
          <NotificationIcon fontSize="large" />
        </Badge>
      </Link>
      <NotificationIcon fontSize="large" />

      <Dashboard fontSize="large" />

      <div className={classes.sectionDesktop}>
        <IconButton aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="secondary">
            <MailIcon />
          </Badge>
        </IconButton>
        <IconButton aria-label="show 17 new notifications" color="inherit">
          <Badge badgeContent={17} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <IconButton
          edge="end"
          aria-label="account of current user"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
      </div>
    </div>
  );
}
