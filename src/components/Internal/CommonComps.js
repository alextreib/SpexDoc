import React from "react";

import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";

import { openLoginAlert } from "components/Internal/VisuElements.js";

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

// Component that extends each view component. Aka common component
// Should also be includable in each component (subcomponent like EditabletableReport)
class CommonComps extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // List of additional rendered components (several concurrently)
      additionalComp: [],
    };
  }

  // Listens to own and assigned parent state
  componentDidUpdate(prevProps) {
    if (prevProps != this.props) {
      if (this.props.commonProps.LoginAlertProps.openLoginRequired == true) {
        // Append element to list, just calling openLoginAlert from VisuElements
        this.setState((prevState) => ({
          additionalComp: [
            ...prevState.additionalComp,
            openLoginAlert(this.props.commonProps.LoginAlertProps.FuncParams),
          ],
        }));
        this.props.commonProps.LoginAlertProps.openLoginRequired = false;
      }
    }
  }

  render() {

    return <div>{this.state.additionalComp.map((addComp) => addComp)}</div>;
  }
}

CommonComps.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CommonComps);
