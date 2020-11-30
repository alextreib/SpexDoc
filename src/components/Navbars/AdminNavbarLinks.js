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
import Popper from "@material-ui/core/Popper";
import Divider from "@material-ui/core/Divider";
// @material-ui/icons
import Person from "@material-ui/icons/Person";
import NotificationIcon from "@material-ui/icons/Notifications";
import Dashboard from "@material-ui/icons/Dashboard";
import Search from "@material-ui/icons/Search";
// core components
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import ProfileButton from "components/Navbars/ProfileButton.js";
import NotificationData from "components/NotificationData/NotificationData.js";

import styles from "assets/jss/material-dashboard-react/components/headerLinksStyle.js";

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

import grey from "@material-ui/core/colors/grey";

import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import { Link } from "react-router-dom";

import { connect } from "react-redux";
import { loginRedux, logoutRedux } from "components/Internal/Redux.js";

const useStyles = makeStyles(styles);

class AdminNavbarLinks extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      openNotification: null,
      notificationList: [
        "Neuer Befund von Hausarzt Kölmer",
        "Dermatologie möchte Termin vereinbaren",
      ],
    };

    this.handleClickNotification = this.handleClickNotification.bind(this);
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

  setOpenNotification = (value) => {
    this.setState({
      openNotification: value,
    });
  };

  handleCloseNotification = () => {
    this.setOpenNotification(null);
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
      <Hidden smDown implementation="css">
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

          <Link to="/dashboard" style={{ textDecoration: "none" }}>
            <Button
              color={window.innerWidth > 959 ? "transparent" : "white"}
              justIcon={window.innerWidth > 959}
              simple={!(window.innerWidth > 959)}
              aria-label="Dashboard"
            >
              <Dashboard style={{ color: grey[700] }} />
              <Hidden mdUp implementation="css">
                <p className={classes.linkText}>Dashboard</p>
              </Hidden>
            </Button>
          </Link>
          <div className={classes.manager}>
            <Button
              color={window.innerWidth > 959 ? "transparent" : "white"}
              justIcon={window.innerWidth > 959}
              simple={!(window.innerWidth > 959)}
              aria-owns={
                this.state.openNotification
                  ? "notification-menu-list-grow"
                  : null
              }
              aria-haspopup="true"
              onClick={this.handleClickNotification}
              className={classes.buttonLink}
            >
              <NotificationIcon className={classes.icons} />
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
            <Popper
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
                    <ClickAwayListener
                      onClickAway={this.handleCloseNotification}
                    >
                      <Link
                        style={{ textDecoration: "none" }}
                        to="/notifications"
                      >
                        <MenuList role="menu">
                          {this.state.notificationList.map(
                            (notificationItem) => (
                              <Link
                                style={{ textDecoration: "none" }}
                                to="/notifications"
                              >
                                <MenuItem
                                  //todo add link
                                  className={classes.dropdownItem}
                                >
                                  {notificationItem}
                                </MenuItem>
                              </Link>
                            )
                          )}
                        </MenuList>
                      </Link>
                    </ClickAwayListener>
                  </Paper>
                </Grow>
              )}
            </Popper>
          </div>
          <div className={classes.manager}>
            <ProfileButton />
          </div>
        </div>
      </Hidden>
    );
  }
}

AdminNavbarLinks.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  loginState: state.loginState,
});

const mapDispatchToProps = {
  loginRedux,
  logoutRedux,
};

const AdminNavbarLinksWithRedux = connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminNavbarLinks);

export default withStyles(styles)(AdminNavbarLinksWithRedux);
