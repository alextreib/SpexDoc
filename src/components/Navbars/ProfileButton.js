import { useState, useEffect } from "react";
import { readDBData, writeDBData } from "components/Internal/DBFunctions.js";
import Avatar from "@material-ui/core/Avatar";
import { checkUser, getUserEmail } from "components/Internal/Checks.js";

import {
  loginRedux,
  logoutRedux,
  setAccessToken,
  removeAccessToken,
} from "components/Internal/Redux.js";
import {
  loginUser,
  loginUserWithFit,
  logoutUser,
} from "components/Internal/LoginFunctions.js";
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
// import styles from "assets/jss/material-dashboard-react/components/headerLinksStyle.js";
import { withStyles } from "@material-ui/core/styles";
import { grey, red } from "@material-ui/core/colors";
import { CommonCompsData } from "components/Internal/DefaultData.js";
import CommonComps from "components/Internal/CommonComps.js";
import VisuComp from "components/Internal/VisuComp";

const styles = (theme) => ({
  avatar: {
    backgroundColor: red[500],
  },
  avatarMobile: {
    height: 30,
    width: 30,
    backgroundColor: red[500],
  },
  buttonLink: {
    height: 30,
    width: 30,
  },
});

class ProfileButton extends VisuComp {
  constructor(props) {
    super(props);

    this.state = {
      // List of additional rendered components (several concurrently)
      anchorEl: null,
      mobileMoreAnchorEl: null,
      isMenuOpen: null,
      isMobileMenuOpen: null,
      commonProps: { ...CommonCompsData, updateComp: this.updateComp },
    };
  }

  componentDidMount() {
    console.log(this.props);
    this.updateComp();
  }

  componentDidUpdate(prevProps) {
    if (prevProps == this.props) {
      // No change from above (currently nothing else is needed)
      return;
    } else {
      this.updateComp();
      // Only required for visu, not loading
      this.setState({
        commonProps: { ...this.state.commonProps, loginState: checkUser() },
      });
    }
  }

  // Required from CommonProps
  updateComp = () => {
    this.TableFetch("UserProfile");
  };

  // Currently all functions are silent because component is only navlink

  handleLoginProfile = () => {
    console.log("login process");
    // loginUser()
    //   .then((result) => {
    //     console.log(result);
    //     // This gives you a Google Access Token. You can use it to access the Google API.
    //     var access_token = result.credential.accessToken;
    //     // setUserToken(access_token);
    //     var user = result.user;
    //     this.setState({ loginState: true });

    //     console.log("User successfully logged in ");
    //     dispatch(loginRedux({ user_id: user.uid }));
    //     dispatch(loginRedux({ user_id: user.uid }));
    //     dispatch(setAccessToken(access_token));
    //   })
    //   .catch((error) => {
    //     // Handle Errors here.
    //     var errorCode = error.code;
    //     var errorMessage = error.message;
    //     // The email of the user's account used.
    //     var email = error.email;
    //     // The firebase.auth.AuthCredential type that was used.
    //     var credential = error.credential;
    //     console.log("error: " + errorCode + ":" + errorMessage);
    //     // ...
    //   });
    this.handleMenuClose();
  };

  handleLogoutProfile = () => {
    // logoutUser()
    //   .then(() => {
    //     window.user = null;
    //     console.log("User successfully logged out");
    //     // todo: PopUp
    //     // Sign-out successful.
    //     this.setState({ loginState: false });

    //     dispatch(logoutRedux());
    //     dispatch(removeAccessToken());
    //   })
    //   .catch((error) => {
    //     console.log("error while logging out");
    //     // An error happened.
    //   });
    this.handleMenuClose();
  };

  handleProfileMenuOpen = (event) => {
    console.log("click");
    // // Not logged in:
    if (this.state.commonProps.loginState == false) {
      this.handleLoginProfile();
    } else {
      console.log("currenttarget");
      console.log(event.currentTarget);
      this.setState({ anchorEl: event.currentTarget });
    }
  };

  handleMobileMenuClose = () => {
    this.setState({ mobileMoreAnchorEl: null });
  };

  handleMenuClose = () => {
    this.handleMobileMenuClose();
    this.setState({ anchorEl: null });
  };

  handleMobileMenuOpen = (event) => {
    this.setState({ mobileMoreAnchorEl: event.currentTarget });
  };

  render() {
    const { classes } = this.props;

    return (
      <div>
        <CommonComps commonProps={this.state.commonProps} />

        <Hidden mdUp implementation="css">
          {/* Mobile Version */}
          <IconButton
            aria-label="account of current user"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
            onClick={this.handleProfileMenuOpen}
            className={classes.buttonLink}
          >
            {this.state.UserProfile != null ? (
              <Avatar aria-label="recipe" className={classes.avatarMobile}>
                {this.state.UserProfile.firstName.charAt(0)}
              </Avatar>
            ) : (
              <AccountCircle />
            )}
          </IconButton>
        </Hidden>

        <Hidden smDown implementation="css">
          {/* Desktop Version */}

          {this.state.commonProps.loginState != false &&
          this.state.UserProfile != null ? (
            <Avatar className={classes.avatar}>
              {this.state.UserProfile.firstName.charAt(0)}
            </Avatar>
          ) : (
            <Person fontSize="large" />
          )}
        </Hidden>

        <Popper
          open={this.state.isMenuOpen}
          anchorEl={this.state.anchorEl}
          transition
          disablePortal
          className={
            classNames({
              [classes.popperClose]: !this.state.isMenuOpen,
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
                <ClickAwayListener onClickAway={this.handleMenuClose}>
                  <MenuList role="menu">
                    <Link style={{ textDecoration: "none" }} to="/user">
                      <MenuItem
                        onClick={this.handleMenuClose}
                        className={classes.dropdownItem}
                      >
                        Profile
                      </MenuItem>
                    </Link>
                    <Divider light />
                    <MenuItem
                      onClick={this.handleLogoutProfile}
                      className={classes.dropdownItem}
                    >
                      Logout
                    </MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    );
  }
}

ProfileButton.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  loginState: state.loginState,
  access_token: state.access_token,
});

const mapDispatchToProps = {
  loginRedux,
  logoutRedux,
};

const ProfileButtonWithRedux = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileButton);

export default withStyles(styles)(ProfileButton);
