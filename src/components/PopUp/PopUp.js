import React from "react";

import "firebase/storage";
import "firebase/firestore";
import { withStyles } from "@material-ui/core/styles";

import Card from "@material-ui/core/Card";

// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Snackbar from "components/Snackbar/Snackbar.js";
import AddAlert from "@material-ui/icons/AddAlert";

import PropTypes from "prop-types";

const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0",
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF",
    },
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1",
    },
  },
};

// Class for displaying a PopUp
class PopUp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: this.props.popUp.openPopUp,
      tl: false,
      tc: false,
      tr: false,
      bl: false,
      bc: false,
      br: false,
      duration: 2500, //ms
      message: "Test Message",
      type: "info", //info, success, warning, danger, primary
      position: "tc", // default position
    };

    this.checkAction = this.checkAction.bind(this);
    this.showgenericPopUp = this.showgenericPopUp.bind(this);
  }

  // Listens to own and assigned parent state
  componentDidUpdate(prevProps) {
    // Is called when the corresponding state is changed in parent class (indirect trigger)
    // Is also called a 2nd time when setState{open:true} is called inside this function
    if (prevProps != this.props) {
      this.state.open = this.props.popUp.openPopUp;
      this.checkAction();
    }
  }

  componentDidMount() {
    // Not on the beginning because this.state is not available yet
    this.checkAction();
  }

  // Open or close PopUp
  checkAction = () => {
    if (this.state.open) {
      this.showgenericPopUp();
    }
  };

  handleClose = (position) => {
    this.setState({ open: false });
    this.setState({ [position]: false });

    this.props.popUp.openPopUp = false;
  };

  showgenericPopUp = () => {
    this.showPopUp(this.state.position);
  };

  showPopUp = (position) => {
    if (!this.state.$place) {
      this.setState({ [position]: true });
      setTimeout(() => {
        this.handleClose(position);
      }, this.state.duration);
    }
  };

  render() {
    return (
      <Card>
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={10} lg={8}>
            <GridContainer>
              <GridItem xs={12} sm={12} md={4}>
                <Snackbar
                  place="tl"
                  color="info"
                  icon={AddAlert}
                  message={this.state.message}
                  open={this.state.tl}
                  closeNotification={() => this.handleClose("tl")}
                  close
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={4}>
                <Snackbar
                  place="tc"
                  color="info"
                  icon={AddAlert}
                  message={this.props.popUp.message}
                  open={this.state.tc}
                  closeNotification={() => this.handleClose("tc")}
                  close
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={4}>
                <Snackbar
                  place="tr"
                  color="info"
                  icon={AddAlert}
                  message={this.props.popUp.message}
                  open={this.state.tr}
                  closeNotification={() => this.handleClose("tr")}
                  close
                />
              </GridItem>
            </GridContainer>
          </GridItem>
        </GridContainer>
        <GridContainer justify={"center"}>
          <GridItem xs={12} sm={12} md={10} lg={8}>
            <GridContainer>
              <GridItem xs={12} sm={12} md={4}>
                <Snackbar
                  place="bl"
                  color="info"
                  icon={AddAlert}
                  message={this.state.message}
                  open={this.state.bl}
                  closeNotification={() => this.handleClose("bl")}
                  close
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={4}>
                <Snackbar
                  place="bc"
                  color="info"
                  icon={AddAlert}
                  message={this.state.message}
                  open={this.state.bc}
                  closeNotification={() => this.handleClose("bc")}
                  close
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={4}>
                <Snackbar
                  place="br"
                  color="info"
                  icon={AddAlert}
                  message={this.state.message}
                  open={this.state.br}
                  closeNotification={() => this.handleClose("br")}
                  close
                />
              </GridItem>
            </GridContainer>
          </GridItem>
        </GridContainer>
      </Card>
    );
  }
}

PopUp.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PopUp);
