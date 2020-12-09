import { loginRedux, logoutRedux } from "components/Internal/Redux.js";
import { readDBData, writeDBData } from "components/Internal/DBFunctions.js";

import Badge from "@material-ui/core/Badge";
import Button from "components/CustomButtons/Button.js";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import CommonComps from "components/Internal/CommonComps.js";
import { CommonCompsData } from "components/Internal/DefaultData.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Dashboard from "@material-ui/icons/Dashboard";
import Divider from "@material-ui/core/Divider";
import Grow from "@material-ui/core/Grow";
import Hidden from "@material-ui/core/Hidden";
import { Link } from "react-router-dom";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import NotificationData from "components/NotificationData/NotificationData.js";
import NotificationIcon from "@material-ui/icons/Notifications";
import Paper from "@material-ui/core/Paper";
import Person from "@material-ui/icons/Person";
import Popper from "@material-ui/core/Popper";
import ProfileButton from "components/Navbars/ProfileButton.js";
import PropTypes from "prop-types";
import React from "react";
import Search from "@material-ui/icons/Search";
import classNames from "classnames";
import { connect } from "react-redux";
import grey from "@material-ui/core/colors/grey";
import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/material-dashboard-react/components/headerLinksStyle.js";
import { withStyles } from "@material-ui/core/styles";

class AdminNavbarLinks extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      openNotification: null,
      notificationList: [],
      commonProps: { ...CommonCompsData, updateComp: this.updateComp },
    };

    this.handleClickNotification = this.handleClickNotification.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (prevProps == this.props) {
      // No change from above (currently nothing else is needed)
      return;
    }
    this.updateComp();
  }

  componentDidMount() {
    this.updateComp();
  }

  
  // Required from CommonProps
  updateComp = () => {
    this.fetchTable();
  };

  fetchTable = () => {
    return readDBData("Notifications", false).then((doc_data) => {
      if (doc_data == null) return;
      // Cannot get data -> set default data from parent class
      // this.setState({ data: this.props.tableOptions.data });
      else this.setState({ notificationList: doc_data });
    });
  };

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

  render() {
    const { classes } = this.props;

    return (
      <Hidden smDown implementation="css">
        <CommonComps commonProps={this.state.commonProps} />

        <div>
          <div className={classes.searchWrapper}>
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

          <Link to="/dashboard" style={{ color: "inherit" }}>
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
            <Link className={classes.LinkNotification} to="/notifications">
              <Badge
                badgeContent={this.state.notificationList.length}
                color="secondary"
              >
                <NotificationIcon />
              </Badge>
            </Link>

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
            <Link style={{ color: "inherit" }} to="/user">
              <ProfileButton />
            </Link>
          </div>
        </div>
      </Hidden>
    );
  }
}

AdminNavbarLinks.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(AdminNavbarLinks);
