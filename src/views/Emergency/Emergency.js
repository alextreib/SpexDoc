import Box from "@material-ui/core/Box";
import React from "react";
import ReactDOM from "react-dom";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";

import EditableTableReport from "components/EditableTableReport/EditableTableReport.js";
import CommonComps from "components/Internal/CommonComps.js";

import AddAlert from "@material-ui/icons/AddAlert";
import Button from "components/CustomButtons/Button.js";
import SnackbarContent from "components/Snackbar/SnackbarContent.js";
import Snackbar from "components/Snackbar/Snackbar.js";

import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import EditableSwitch from "components/EditableTableReport/EditableSwitch";

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
  ref: "https://google.de",
};

class Emergency extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      predispositionTable: {
        name: "Predisposition",
        columns: [
          { title: "Vorerkrankung", field: "predisposition" },
          { title: "Diagnose seit", field: "diagnosis_year" },
        ],
        data: [
          {
            predisposition: "Kreislaufschwäche",
            diagnosis_year: "2010",
          },
        ],
      },
      medicationTable: {
        name: "Medication",
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
        name: "Contacts",
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
      organSwitch: {
        name: "organ_donation",
        data: false,
      },
    };
  }

  render() {
    const { classes } = this.props;

    return (
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Vorerkrankungen</h4>
              <p className={classes.cardCategoryWhite}>Untertitel</p>
            </CardHeader>
            <CardBody>
              <EditableTableReport
                tableOptions={this.state.predispositionTable}
              />
            </CardBody>
          </Card>
        </GridItem>

        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="warning">
              <h4 className={classes.cardTitleWhite}>Medikamente</h4>
              <p className={classes.cardCategoryWhite}>Untertitel</p>
            </CardHeader>
            <CardBody>
              <EditableTableReport tableOptions={this.state.medicationTable} />
            </CardBody>
          </Card>
        </GridItem>

        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="info">
              <h4 className={classes.cardTitleWhite}>Angehörige</h4>
              <p className={classes.cardCategoryWhite}>Kontaktdaten</p>
            </CardHeader>
            <CardBody>
              <EditableTableReport tableOptions={this.state.contactTable} />
            </CardBody>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="rose">
              <h4 className={classes.cardTitleWhite}>Organspende</h4>
              <p className={classes.cardCategoryWhite}>Untertitel</p>
            </CardHeader>
            <CardBody>
              <EditableSwitch switchOptions={this.state.organSwitch} />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    );
  }
}

Emergency.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Emergency);
