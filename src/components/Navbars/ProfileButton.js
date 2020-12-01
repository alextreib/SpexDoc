import styles from "assets/jss/material-dashboard-react/components/headerLinksStyle.js";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
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
import Menu from "@material-ui/core/Menu";

import { useSelector, useDispatch } from "react-redux";

import { withStyles } from "@material-ui/core/styles";

import Grow from "@material-ui/core/Grow";
import { connect } from "react-redux";
import { loginRedux, logoutRedux } from "components/Internal/Redux.js";
import Popper from "@material-ui/core/Popper";
import Divider from "@material-ui/core/Divider";
import Person from "@material-ui/icons/Person";



import NotificationData from "components/NotificationData/NotificationData.js";
import {loginUser,logoutUser} from "components/Internal/LoginFunctions.js";

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
}));

function ProfileButton(props) {
  const classes = useStyles();

  const [loginState, setUserLogin] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  // Redux
  const loginStateRedux = useSelector((state) => state.loginStateRedux);
  const dispatch = useDispatch();

  const menuId = "primary-search-account-menu";

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
    <Popper open={isMenuOpen} anchorEl={anchorEl} transition disablePortal>
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
          <AccountCircle />
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
          <Person className={classes.icons} />
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
