import { useState, useEffect } from "react";
import { readDBData, writeDBData } from "components/Internal/DBFunctions.js";
import Avatar from "@material-ui/core/Avatar";
import { loginRedux, logoutRedux } from "components/Internal/Redux.js";
import { loginUser, logoutUser } from "components/Internal/LoginFunctions.js";
import { useDispatch, useSelector } from "react-redux";

import AccountCircle from "@material-ui/icons/AccountCircle";
import Button from "components/CustomButtons/Button.js";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Divider from "@material-ui/core/Divider";
import Grow from "@material-ui/core/Grow";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import { Link } from "react-router-dom";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import Paper from "@material-ui/core/Paper";
import Person from "@material-ui/icons/Person";
import Popper from "@material-ui/core/Popper";
import PropTypes from "prop-types";
import React from "react";
import classNames from "classnames";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/material-dashboard-react/components/headerLinksStyle.js";
import { withStyles } from "@material-ui/core/styles";
import { grey, red } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  avatar: {
    backgroundColor: red[500],
    height: 35,
    width: 35,
  },
}));

function ProfileButton() {
  const classes = useStyles();

  const [loginState, setUserLogin] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [userProfile, setUserProfile] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  // Redux
  const loginStateRedux = useSelector((state) => state.loginStateRedux);
  const dispatch = useDispatch();

  const menuId = "primary-search-account-menu";

  useEffect(() => {
    fetchTable();
  });

  const fetchTable = () => {
    readDBData("UserProfile", false).then((doc_data) => {
      if (doc_data == null) {
        return;
      } else {
        setUserProfile(doc_data);
      }
    });
  };

  const handleLoginProfile = () => {
    console.log("login process");
    loginUser()
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        setUserLogin(true);
        console.log("User successfully logged in ");
        dispatch(loginRedux({ user_id: user.uid }));
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
    handleMenuClose();
  };

  const handleLogoutProfile = () => {
    logoutUser()
      .then(() => {
        window.user = null;
        console.log("User successfully logged out");
        // todo: PopUp
        // Sign-out successful.
        setUserLogin(false);
        dispatch(logoutRedux());
      })
      .catch((error) => {
        console.log("error while logging out");
        // An error happened.
      });
    handleMenuClose();
  };
  const handleProfileMenuOpen = (event) => {
    // Not logged in:
    if (loginState == false) {
      handleLoginProfile();
    } else {
      setAnchorEl(event.currentTarget);
    }
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const renderPopper = (
    <Popper
      open={isMenuOpen}
      anchorEl={anchorEl}
      transition
      disablePortal
      className={
        classNames({
          [classes.popperClose]: !isMenuOpen,
        }) +
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
            <ClickAwayListener onClickAway={handleMenuClose}>
              {renderMenuList}
            </ClickAwayListener>
          </Paper>
        </Grow>
      )}
    </Popper>
  );

  // MenuList
  const renderMenuList = (
    <MenuList role="menu">
      <Link style={{ textDecoration: "none" }} to="/user">
        <MenuItem onClick={handleMenuClose} className={classes.dropdownItem}>
          Profile
        </MenuItem>
      </Link>
      <Divider light />
      <MenuItem onClick={handleLogoutProfile} className={classes.dropdownItem}>
        Logout
      </MenuItem>
    </MenuList>
  );

  return (
    <div>
      <Hidden mdUp implementation="css">
        {/* Mobile Version */}
        <IconButton
          edge="end"
          aria-label="account of current user"
          aria-controls={menuId}
          aria-haspopup="true"
          onClick={handleProfileMenuOpen}
          color="inherit"
        >
          {userProfile != null ? (
            <Avatar aria-label="recipe" className={classes.avatar}>
              {userProfile.firstName.charAt(0)}
            </Avatar>
          ) : (
            <AccountCircle />
          )}
        </IconButton>
      </Hidden>

      <Hidden smDown implementation="css">
        {/* Desktop Version */}
        <Button
          color={window.innerWidth > 959 ? "transparent" : "white"}
          justIcon={window.innerWidth > 959}
          simple={!(window.innerWidth > 959)}
          aria-owns="profile-menu-list-grow"
          aria-haspopup="true"
          onClick={handleProfileMenuOpen}
          className={classes.buttonLink}
        >
          {userProfile != null ? (
            <Avatar aria-label="recipe" className={classes.avatar}>
              {userProfile.firstName.charAt(0)}
            </Avatar>
          ) : (
            <Person className={classes.icons} />
          )}
        </Button>
      </Hidden>

      {renderPopper}
    </div>
  );
}

ProfileButton.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  loginState: state.loginState,
});

const mapDispatchToProps = {
  loginRedux,
  logoutRedux,
};

const ProfileButtonWithRedux = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileButton);

export default withStyles(styles)(ProfileButtonWithRedux);
