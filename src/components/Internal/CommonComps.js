import React from "react";

import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import { loginUser, logoutUser } from "components/Internal/LoginFunctions.js";
import { checkUser, getUserID } from "components/Internal/Checks.js";
import { connect } from "react-redux";
import { loginRedux, logoutRedux } from "components/Internal/Redux.js";
import PopUp from "components/PopUp/PopUp.js";
import VisuComp from "components/Internal/VisuComp.js";

import { openLoginAlert } from "components/Internal/VisuElements.js";
import LoginAlert from "components/LoginAlert/LoginAlert";

const styles = () => ({
  // This group of buttons will be aligned to the right
  rightToolbar: {
    position: "relative",
    minHeight: 100,
  },
  menuButton: {
    marginRight: 16,
    marginLeft: -12,
  },
  fab: {
    position: "absolute",
    bottom: 15,
    right: 15,
  },
});

// How to integrate:
// 1) Add CommonComps to render of parent
// 2) Add commonProps: {LoginAlertProps: {openLoginRequired: false,FuncParams: "test",} to parent state
// 3) Check if Redux is required

// Component that extends each view component. Aka common component
// Should also be includable in each component (subcomponent like EditabletableReport)
class CommonComps extends VisuComp {
  constructor(props) {
    super(props);

    this.state = {
      // List of additional rendered components (several concurrently)
      additionalComp: [],
    };
  }

  componentDidMount() {
    // Weird flex -> needs timeout to load login
    this.timeout(1000).then(() => {
      if (getUserID() != null) {
        this.props.loginRedux({ user_id: getUserID() });
      }
    });

    this.props.commonProps.updateComp();
  }

  // Listens to own and assigned parent state
  componentDidUpdate(prevProps) {
    // // Call function in parent
    this.props.commonProps.updateComp();
  }

  render() {
    return (
      <div>
        <LoginAlert loginState={this.props.commonProps.LoginAlertProps} />
        <PopUp popUp={this.props.commonProps.PopUpProps} />
      </div>
    );
  }
}

CommonComps.propTypes = {
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

const CommonCompsWithRedux = connect(
  mapStateToProps,
  mapDispatchToProps
)(CommonComps);

export default withStyles(styles)(CommonCompsWithRedux);
