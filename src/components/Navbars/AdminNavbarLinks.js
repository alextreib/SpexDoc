import React from "react";
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Hidden from "@material-ui/core/Hidden";
import Poppers from "@material-ui/core/Popper";
import Divider from "@material-ui/core/Divider";
// @material-ui/icons
import Person from "@material-ui/icons/Person";
import Notifications from "@material-ui/icons/Notifications";
import Dashboard from "@material-ui/icons/Dashboard";
import Search from "@material-ui/icons/Search";
// core components
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import NotificationData from "components/NotificationData/NotificationData.js";

import styles from "assets/jss/material-dashboard-react/components/headerLinksStyle.js";

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import { Link } from "react-router-dom";

const useStyles = makeStyles(styles);

class AdminNavbarLinks extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      profileActive: null,
      openNotification: null,
      openProfile: null,
      notificationList: [
        "Neuer Befund von Hausarzt Kölmer",
        "Dermatologie möchte Termin vereinbaren",
        "Hausarzt beantragt eine Freigabe",
      ],
    };

    this.handleClickNotification = this.handleClickNotification.bind(this);
    this.handleClickProfile = this.handleClickProfile.bind(this);
    this.handleLoginProfile = this.handleLoginProfile.bind(this);
  }

  handleClickNotification = (event) => {
    if (
      this.state.openNotification &&
      this.state.openNotification.contains(event.target)
    ) {
      this.setOpenNotification(null);
    } else {
      this.setOpenNotification(event.currentTarget);
    }
  };

  setProfile = (value) => {
    this.setState({
      profileActive: value,
    });
  };

  setOpenNotification = (value) => {
    this.setState({
      openNotification: value,
    });
  };

  setOpenProfile = (value) => {
    this.setState({
      openProfile: value,
    });
  };

  handleCloseNotification = () => {
    this.setOpenNotification(null);
  };
  handleClickProfile = (event) => {
    if (
      this.state.openProfile &&
      this.state.openProfile.contains(event.target)
    ) {
      this.setOpenProfile(null);
    } else {
      this.setOpenProfile(event.currentTarget);
    }
  };

  handleLoginProfile = () => {
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
        this.setProfile(user);
        console.log("user logged in");
        // window.user = user;
        // ...
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

    this.handleCloseProfile();
  };

  handleLogoutProfile = () => {
    var provider = new firebase.auth.GoogleAuthProvider();

    var auth = firebase.auth();
    var currentUser = auth.currentUser;

    firebase
      .auth()
      .signOut()
      .then(() => {
        window.user = null;
        console.log("logged out");
        // todo: PopUp
        // Sign-out successful.
        this.setProfile(null);
      })
      .catch((error) => {
        console.log("error while logging out");
        // An error happened.
      });
    this.handleCloseProfile();
  };

  handleCloseProfile = () => {
    this.setOpenProfile(null);
  };

  // When child (NotificationData) triggers change -> this function is called
  notificationDataChange = (newList) => {
    this.setState({
      notificationList: newList,
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <div>
        <div className={classes.searchWrapper}>
          <NotificationData
            onNotificationDataChange={this.notificationDataChange}
          />
          <CustomInput
            formControlProps={{
              className: classes.margin + " " + classes.search,
            }}
            inputProps={{
              placeholder: "Search",
              inputProps: {
                "aria-label": "Search",
              },
            }}
          />
          <Button color="white" aria-label="edit" justIcon round>
            <Search />
          </Button>
        </div>
        <Button
          color={window.innerWidth > 959 ? "transparent" : "white"}
          justIcon={window.innerWidth > 959}
          simple={!(window.innerWidth > 959)}
          aria-label="Dashboard"
          className={classes.buttonLink}
        >
          <Dashboard className={classes.icons} />
          <Hidden mdUp implementation="css">
            <p className={classes.linkText}>Dashboard</p>
          </Hidden>
        </Button>
        <div className={classes.manager}>
          <Button
            color={window.innerWidth > 959 ? "transparent" : "white"}
            justIcon={window.innerWidth > 959}
            simple={!(window.innerWidth > 959)}
            aria-owns={
              this.state.openNotification ? "notification-menu-list-grow" : null
            }
            aria-haspopup="true"
            onClick={this.handleClickNotification}
            className={classes.buttonLink}
          >
            <Notifications className={classes.icons} />
            <span className={classes.notifications}>
              {this.state.notificationList.length}
            </span>
            {/*todo: count notifications */}
            <Hidden mdUp implementation="css">
              <p
                onClick={this.handleCloseNotification}
                className={classes.linkText}
              >
                Notification
              </p>
            </Hidden>
          </Button>
          <Poppers
            open={Boolean(this.state.openNotification)}
            anchorEl={this.state.openNotification}
            transition
            disablePortal
            className={
              classNames({
                [classes.popperClose]: !this.state.openNotification,
              }) +
              " " +
              classes.popperNav
            }
          >
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                id="notification-menu-list-grow"
                style={{
                  transformOrigin:
                    placement === "bottom" ? "center top" : "center bottom",
                }}
              >
                <Paper>
                  <ClickAwayListener onClickAway={this.handleCloseNotification}>
                    <Link
                      style={{ textDecoration: "none" }}
                      to="/admin/notifications"
                    >
                      <MenuList role="menu">
                        {this.state.notificationList.map((notificationItem) => (
                          <Link
                            style={{ textDecoration: "none" }}
                            to="/admin/notifications"
                          >
                            <MenuItem
                              //todo add link
                              className={classes.dropdownItem}
                            >
                              {notificationItem}
                            </MenuItem>
                          </Link>
                        ))}
                      </MenuList>
                    </Link>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Poppers>
        </div>
        <div className={classes.manager}>
          <Button
            color={window.innerWidth > 959 ? "transparent" : "white"}
            justIcon={window.innerWidth > 959}
            simple={!(window.innerWidth > 959)}
            aria-owns={this.state.openProfile ? "profile-menu-list-grow" : null}
            aria-haspopup="true"
            onClick={this.handleClickProfile}
            className={classes.buttonLink}
          >
            <Person className={classes.icons} />
            <Hidden mdUp implementation="css">
              <p className={classes.linkText}>Profile</p>
            </Hidden>
          </Button>
          <Poppers
            open={Boolean(this.state.openProfile)}
            anchorEl={this.state.openProfile}
            transition
            disablePortal
            className={
              classNames({ [classes.popperClose]: !this.state.openProfile }) +
              " " +
              classes.popperNav
            }
          >
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                id="profile-menu-list-grow"
                style={{
                  transformOrigin:
                    placement === "bottom" ? "center top" : "center bottom",
                }}
              >
                <Paper>
                  <ClickAwayListener onClickAway={this.handleCloseProfile}>
                    <MenuList role="menu">
                      {this.state.profileActive ? (
                        <div>
                          <Link
                            style={{ textDecoration: "none" }}
                            to="/admin/user"
                          >
                            <MenuItem
                              onClick={this.handleCloseProfile}
                              className={classes.dropdownItem}
                            >
                              Profile
                            </MenuItem>
                          </Link>

                          <MenuItem
                            onClick={this.handleCloseProfile}
                            className={classes.dropdownItem}
                          >
                            Settings
                          </MenuItem>
                          <Divider light />
                          <MenuItem
                            onClick={
                              (this.handleCloseProfile,
                              this.handleLogoutProfile)
                            }
                            className={classes.dropdownItem}
                          >
                            Logout
                          </MenuItem>
                        </div>
                      ) : (
                        <div>
                          <MenuItem
                            onClick={
                              (this.handleCloseProfile, this.handleLoginProfile)
                            }
                            className={classes.dropdownItem}
                          >
                            Login
                          </MenuItem>
                        </div>
                      )}
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Poppers>
        </div>
      </div>
    );
  }
}

AdminNavbarLinks.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AdminNavbarLinks);
