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

import AddAlert from "@material-ui/icons/AddAlert";
import Button from "components/CustomButtons/Button.js";
import SnackbarContent from "components/Snackbar/SnackbarContent.js";
import Snackbar from "components/Snackbar/Snackbar.js";

import PropTypes from "prop-types";
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
  ref: "https://google.de",
};

class Emergency extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      external: {
        tableOptions: {
          name: "Emergency",
          columns: [
            { title: "Vorerkrankung", field: "predisposition" },
            { title: "Diagnose seit", field: "diagnosis_year" },
          ],
          data: [
            {
              predisposition: "Kreislaufschwäche",
              diagnosis_year: "2010",
            },
            {
              predisposition: "Beispielerkrankung",
              diagnosis_year: "1997",
            },
          ],
        },
      },
    };


    // // Create a Redux store holding the state of your app.
    // // Its API is { subscribe, dispatch, getState }.
    // let store = createStore(counterReducer);

    // // You can use subscribe() to update the UI in response to state changes.
    // // Normally you'd use a view binding library (e.g. React Redux) rather than subscribe() directly.
    // // There may be additional use cases where it's helpful to subscribe as well.

    // store.subscribe(() => console.log(store.getState()));

    // // The only way to mutate the internal state is to dispatch an action.
    // // The actions can be serialized, logged or stored and later replayed.
    // store.dispatch({ type: "counter/incremented" });
    // // {value: 1}

    // console.log(store);

  }

  componentDidMount() {
    console.log("now");
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
                tableOptions={this.state.external.tableOptions}
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
              <Table
                tableHeaderColor="primary"
                tableHead={["Medikament", "Wirkstoff", "Rhythmus"]}
                tableData={[
                  ["IbuHEXAL", "Ibuprofen", "Täglich"],
                  ["L-Thyroxin Henning", "Levothyroxin", "2x Täglich"],
                ]}
              />
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
              <Table
                tableHeaderColor="primary"
                tableHead={["Name", "Beziehung", "Telefonnummer", "Adresse"]}
                tableData={[
                  ["Nora", "Mutter", "01522789126", "Seestraße 14, Berlin"],
                  ["Luca", "Bruder", "01522712312", "Seestraße 14, Berlin"],
                ]}
              />
            </CardBody>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="rose">
              <h4 className={classes.cardTitleWhite}>Organspende</h4>
              <p className={classes.cardCategoryWhite}>Untertitel</p>
            </CardHeader>
            <CardBody>JA</CardBody>
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
