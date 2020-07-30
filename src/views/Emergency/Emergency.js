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
import Test from "views/Test/Test.js";

import AddAlert from "@material-ui/icons/AddAlert";
import Button from "components/CustomButtons/Button.js";
import SnackbarContent from "components/Snackbar/SnackbarContent.js";
import Snackbar from "components/Snackbar/Snackbar.js";

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

const useStyles = makeStyles(styles);

export default function Emergency() {
  const classes = useStyles();
  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Vorerkrankungen</h4>
            <p className={classes.cardCategoryWhite}>Untertitel</p>
          </CardHeader>
          <CardBody>
            <Table
              tableHeaderColor="primary"
              tableHead={["Erkrankung", "Erstdiagnose Datum"]}
              tableData={[
                ["Leberzirrose", "2010"],
                ["Diabetes", "2013"],
              ]}
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
