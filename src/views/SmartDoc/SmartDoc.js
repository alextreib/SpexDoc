import { checkUser } from "components/Internal/Checks.js";
import { getUserID } from "components/Internal/Checks.js";
import { readDBData, writeDBData } from "components/Internal/DBFunctions.js";
import VisuComp from "components/Internal/VisuComp.js";
import VisuComp from "components/Internal/Firebase.js";
import PlainTable from "components/EditableTableReport/PlainTable.js";

import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import EditableTableReport from "components/EditableTableReport/EditableTableReport.js";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import PropTypes from "prop-types";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import React from "react";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import * as admin from "firebase-admin";

import { green, blue } from "@material-ui/core/colors";
import Button from "@material-ui/core/Button";

import Box from "@material-ui/core/Box";

const GreenRadio = withStyles({
  root: {
    "&$checked": {
      color: green[600],
    },
  },
  checked: {},
})((props) => <Radio color="default" {...props} />);

const BlueRadio = withStyles({
  root: {
    "&$checked": {
      color: blue[600],
    },
  },
  checked: {},
})((props) => <Radio color="default" {...props} />);

const styles = {
  margin: {
    margin: "0",
  },
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
  ref: "https://google.de",
};

// Source: https://www.apotheken-umschau.de/Laborwerte
const LabKeyToUnit = {
  1: "mmol/l",
  2: "mg/dl",
  3: "mg/dl",
  4: "μg/dl",
  5: "Millionen/μl",
  6: "μg/l",
  7: "μg/dl",
  8: "U/l",
  9: "Prozent",
  10: "g/dl",
  11: "mmol/molHb",
  12: "µg/l",
  13: "mg/dl",
  14: "Leu/µl",
  15: "mmol/l",
  16: "µg/l",
  17: "mmol/l",
  18: "µg/l",
  19: "ng/ml",
  20: "µg/l",
  21: "Tausend/μl",
  22: "ng/l",
  23: "µg/l",
};
const limits = {
  1: [2.2, 2.65],
  2: [40, 1000],
  3: [0, 160],
  4: [65, 180],
  5: [4.1, 5.1],
  6: [3, 20],
  7: [3, 20],
  8: [0, 50],
  9: [38, 50],
  10: [12, 16],
  11: [0, 30],
  12: [45, 225],
  13: [0, 1.2],
  14: [74, 131],
  15: [4000, 10000],
  16: [0.7, 1.1],
  17: [135, 145],
  18: [1.0, 3.35],
  19: [0, 2.5],
  20: [2.41, 8.27],
  21: [140, 360],
  22: [200, 1000],
  23: [70, 150],
};

const labKeyToNameMapping = {
  1: "Calcium (Kalzium)",
  2: "Cholesterin-HDL",
  3: "Cholesterin-LDL",
  4: "Eisen",
  5: "Erythrozyten",
  6: "Ferritin",
  7: "Folsäure",
  8: "Gamma-GT (GGT)",
  9: "Hämatokrit (Hk)",
  10: "Hämoglobin (Hb)",
  11: "HbA1c (Hämoglobin A1c)",
  12: "Kortisol (Cortisol)",
  13: "Kreatinin",
  14: "Kupfer (Cu)",
  15: "Leukozyten",
  16: "Magnesium (Mg)",
  17: "Natrium (Na)",
  18: "Progesteron",
  19: "Prostataspezifisches Antigen (PSA)",
  20: "Testosteron",
  21: "Thrombozyten",
  22: "Vitamin B12",
  23: "Zink",
};

function labKeyToNameUnit(number) {
  return labKeyToNameMapping[number] + " in " + LabKeyToUnit[number];
}

// function getLookUps(){
//   labKeyToNameMapping.forEach((element) => {
//   console.log("test")
//   });
//   return "";

// }

class SmartDoc extends VisuComp {
  constructor(props) {
    super(props);

    this.state = {
      OrganDonationData: {
        RadioSelection: "Nein",
        TextBoxJAAusnahme: "",
        TextBoxJANur: "",
        TextBoxNeinNachlass: "",
      },
      bloodValueTable: {
        //todo: capsulate and parameterize
        name: "bloodValueTable",
        editable: {
          onRowAdd: (newData) =>
            new Promise((resolve) => {
              resolve(this.onRowAdd(newData, "bloodValueTable"));
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve) => {
              resolve(this.onRowUpdate(newData, oldData, "bloodValueTable"));
            }),
          onRowDelete: (oldData) =>
            new Promise((resolve) => {
              resolve(this.onRowDelete(oldData, "bloodValueTable"));
            }),
        },
        columns: [
          {
            title: "Laborwert",
            field: "labKey",
            lookup: {
              //todo: getall
              1: labKeyToNameUnit(1),
              2: labKeyToNameUnit(2),
              3: labKeyToNameUnit(3),
              4: labKeyToNameUnit(4),
              5: labKeyToNameUnit(5),
              6: labKeyToNameUnit(6),
              7: labKeyToNameUnit(7),
              8: labKeyToNameUnit(8),
              9: labKeyToNameUnit(9),
              10: labKeyToNameUnit(10),
              11: labKeyToNameUnit(11),
              12: labKeyToNameUnit(12),
              13: labKeyToNameUnit(13),
              14: labKeyToNameUnit(14),
              15: labKeyToNameUnit(15),
              16: labKeyToNameUnit(16),
              17: labKeyToNameUnit(17),
              18: labKeyToNameUnit(18),
              19: labKeyToNameUnit(19),
              20: labKeyToNameUnit(20),
              21: labKeyToNameUnit(21),
              22: labKeyToNameUnit(22),
              23: labKeyToNameUnit(23),
            },
          },
          //todo: type: 'numeric' without layout problems
          { title: "Wert", field: "value" },
          //todo: unit is dependent on the layKey -> should be updated accordingly
          // { title: "Einheit", field: "unit", editable: "never" },
        ],
        data: [
          {
            labKey: 1,
            value: "9",
            unit: "test",
          },
        ],
      },
      medicationTable: {
        name: "EmergencyMedication",
        columns: [
          { title: "Medikament", field: "medication" },
          { title: "Rhythmus", field: "rythme" },
        ],
        data: [
          {
            medication: "IbuHEXAL",
            rythme: "2x Täglich",
          },
        ],
      },
      contactTable: {
        name: "EmergencyContacts",
        columns: [
          { title: "Name", field: "name" },
          { title: "Beziehung", field: "relation" },
          { title: "Telefonnummer", field: "phone" },
          { title: "Adresse", field: "address" },
        ],
        data: [
          {
            name: "Nora Tilmann",
            relation: "Mutter",
            rythme: "01522722892",
            rythme: "Seestraße 24, München",
          },
        ],
      },
    };
  }

  componentDidMount() {
    this.TableFetch("bloodValueTable");
  }

  componentDidUpdate(prevProps) {
    if (prevProps == this.props) {
      // No change from above (currently nothing else is needed)
      return;
    } else {
      this.TableFetch("bloodValueTable");

      // Only required for visu, not loading
      this.setState({
        commonProps: { ...this.state.commonProps, loginState: checkUser() },
      });
    }
  }

  result = () => {
    var returnText = "";
    this.state.bloodValueTable.data.forEach((element) => {
      var value = element.value;
      var labKey = element.labKey;
      var minValue = limits[labKey][0];
      var maxValue = limits[labKey][1];
      if (value < minValue) {
        returnText +=
          "Der Wert für " + labKeyToNameMapping[labKey] + " ist vermindert. ";
      } else if (value > maxValue) {
        returnText +=
          "Der Wert für " + labKeyToNameMapping[labKey] + " ist erhöht. ";
      } else {
        // Nothing
      }
    });
    if (returnText == "")
      returnText +=
        "Alle Werte sind in Ordnung. Es liegen keine zugrundeliegende Erkrankungen vor. ";

    return returnText;
  };

  // Required from CommonProps
  updateComp = () => {};

  // Fetch the table from Firebase (Original data)
  // Is called when table is changed
  fetchTable = () => {
    // todo: default parameter
    return readDBData("OrganDonationData", false).then((doc_data) => {
      if (doc_data != null) this.setState({ OrganDonationData: doc_data });
    });
  };

  uploadProfile = () => {
    console.log("update");
    var user_id = getUserID();
    if (user_id == null) {
      this.displayLogin();
      return false;
    }
    var success = writeDBData(
      "OrganDonationData",
      this.state.OrganDonationData
    );
    if (success == false) this.displayLogin();
  };

  // Nice function: Sets states automatically
  inputChange = async (property, event) => {
    var changedValue = event.target.value;
    this.setState(
      {
        OrganDonationData: {
          ...this.state.OrganDonationData,
          [property]: changedValue,
        },
      },
      () => {
        this.uploadProfile();
      }
    );
  };

  radioChange = (event) => {
    this.setState(
      {
        OrganDonationData: {
          ...this.state.OrganDonationData,
          RadioSelection: event.target.value,
        },
      },
      () => {
        this.uploadProfile();
      }
    );
  };

  testfunc = () => {
    // These registration tokens come from the client FCM SDKs.
    var registrationTokens = [
      "YOUR_REGISTRATION_TOKEN_1",
      // ...
      "YOUR_REGISTRATION_TOKEN_n",
    ];

    // Subscribe the devices corresponding to the registration tokens to the
    // topic.
    var topic="testTopic"
    admin
      .messaging()
      .subscribeToTopic(registrationTokens, topic)
      .then(function (response) {
        // See the MessagingTopicManagementResponse reference documentation
        // for the contents of response.
        console.log("Successfully subscribed to topic:", response);
      })
      .catch(function (error) {
        console.log("Error subscribing to topic:", error);
      });
  };

  render() {
    const { classes } = this.props;

    return (
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Blutwert Analyse</h4>
              <p className={classes.cardCategoryWhite}>
                Gehe deinen Blutwerten auf den Grund
              </p>
            </CardHeader>
            <CardBody>
              <PlainTable tableOptions={this.state.bloodValueTable} />
              <br />
              <Typography variant="h4">Auswertung</Typography>
              <br />
              <Typography variant="body1">{this.result()}</Typography>
            </CardBody>
          </Card>
        </GridItem>

        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="info">
              <h4 className={classes.cardTitleWhite}>Muttermal Analyse</h4>
              <p className={classes.cardCategoryWhite}>
                Photographiere dein Muttermal
              </p>
            </CardHeader>
            <CardBody>
              <EditableTableReport tableOptions={this.state.contactTable} />
            </CardBody>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <Button onClick={this.testfunc}>TestFunc</Button>
            <CardHeader color="warning">
              <h4 className={classes.cardTitleWhite}>Frag den Arzt</h4>
              <p className={classes.cardCategoryWhite}>
                Deine Daten werden anonym übermittelt und vertraulich behandelt.
              </p>
            </CardHeader>
            <CardBody>TestBody</CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    );
  }
}

SmartDoc.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SmartDoc);
