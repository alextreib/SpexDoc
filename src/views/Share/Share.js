import { readDBData, writeDBData } from "components/Internal/DBFunctions.js";

import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CommonComps from "components/Internal/CommonComps.js";
import { CommonCompsData } from "components/Internal/DefaultData.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import PropTypes from "prop-types";
import QRCodeCard from "components/VisuComps/QRCodeCard.js";
import React from "react";
import Switch from "@material-ui/core/Switch";
import { connect } from "react-redux";
import { getShortLink } from "components/Internal/Checks";
import { getUserID } from "components/Internal/Checks";
import { withStyles } from "@material-ui/core/styles";


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

// Display Login Screen here -> Login from Profile NavBar should also point here
class Share extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      commonProps: { ...CommonCompsData, updateComp: this.updateComp },

      data: {
        emergency: {
          QRCodeactive: false,
          Switchactive: false,
          shortLink: "",
        },
        medRecords: {
          QRCodeactive: false,
          Switchactive: false,
          shortLink: "",
        },
      },
    };

    //Bindings
    this.handleSwitchChange = this.handleSwitchChange.bind(this);
  }

  // For redux and others
  componentDidUpdate(prevProps) {
    if (prevProps == this.props) {
      // No change from above (currently nothing else is needed)
      return;
    } else {
      this.updateComp();
    }
  }

  componentDidMount() {
    this.updateComp();
  }

  // Required from CommonProps
  updateComp = async () => {
    this.fetchTable();
  };

  // Fetch the table from Firebase (Original data)
  fetchTable = () => {
    return readDBData("Share", false).then((doc_data) => {
      if (doc_data != null) this.setState({ data: doc_data });
    });
  };

  upload = () => {
    var user_id = getUserID();
    if (user_id == null) {
      this.displayLogin();
      return false;
    }
    var success = writeDBData("Share", this.state.data);
    if (success == false) this.displayLogin();
  };

  handleSwitchChange = async (property, event) => {
    console.log("handleSwitch");
    var checked = event.target.checked;

    var user_id = getUserID();
    if (user_id == null) {
      this.displayLogin();
      return false;
    }

    var shortLink = await getShortLink(property);

    this.setState({
      data: {
        ...this.state.data,
        [property]: {
          shortLink: shortLink,
          Switchactive: checked,
          QRCodeactive: checked,
        },
      },
    });

    // Upload
    this.upload();
  };

  // todo: Find a way to cluster/extract it to a common place
  displayLogin = () => {
    // This is how a function in CommonProps is called
    this.setState({
      commonProps: {
        LoginAlertProps: { openLoginRequired: true, FuncParams: "test" },
      },
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <Card>
        <CommonComps commonProps={this.state.commonProps} />
        <CardHeader color="primary">
          <h4 className={classes.cardTitleWhite}>Freigaben</h4>
          <p className={classes.cardCategoryWhite}>
            Verwalte und teile deine Freigaben
          </p>
        </CardHeader>
        <CardBody>
          Jeder kann in eine Notsituation kommen. Zeigen Sie ihm einfach den
          folgenden QR Code und der Notfallsanitärer bekommt Zugriff auf Ihre
          Notfalldaten. Drucken Sie am besten den Code aus.
          <GridContainer>
            <GridItem xs={12} sm={6} md={4}>
              <Card>
                <CardHeader color="info">
                  <h4 className={classes.cardTitleWhite}>Notfalldaten</h4>
                </CardHeader>
                <CardBody>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Switch
                      checked={this.state.data.emergency.Switchactive}
                      onChange={(ev) =>
                        this.handleSwitchChange("emergency", ev)
                      }
                      color="primary"
                      name="Emergency_switch"
                      inputProps={{ "aria-label": "secondary checkbox" }}
                    />
                  </div>
                  {/* todo: Layout without br and maybe one component */}
                  {this.state.data.emergency.QRCodeactive ? (
                    <QRCodeCard link={this.state.data.emergency.shortLink} />
                  ) : null}
                </CardBody>
              </Card>
            </GridItem>
            <GridItem xs={12} sm={6} md={4}>
              <Card>
                <CardHeader color="info">
                  <h4 className={classes.cardTitleWhite}>Befunde</h4>
                </CardHeader>
                <CardBody>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Switch
                      checked={this.state.data.medRecords.Switchactive}
                      onChange={(ev) =>
                        this.handleSwitchChange("medRecords", ev)
                      }
                      color="primary"
                      name="medRecords_switch"
                      inputProps={{ "aria-label": "secondary checkbox" }}
                    />
                  </div>
                  {this.state.data.medRecords.QRCodeactive ? (
                    <div>
                      <QRCodeCard link={this.state.data.medRecords.shortLink} />
                    </div>
                  ) : null}
                </CardBody>
              </Card>
            </GridItem>
          </GridContainer>
        </CardBody>
      </Card>
    );
  }
}

Share.propTypes = {
  classes: PropTypes.object.isRequired,
};

// Required for each component that relies on the loginState
const mapStateToProps = (state) => ({
  loginState: state.loginState,
});

const ShareWithRedux = connect(mapStateToProps)(Share);

export default withStyles(styles)(ShareWithRedux);
