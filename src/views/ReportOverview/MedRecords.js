import React from "react";
// @material-ui/core components
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";

import ShowFileList from "components/VisuComps/ShowFileList.js";

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

// import FileBrowser from "react-keyed-file-browser";

const firebaseConfig = {
  apiKey: "AIzaSyCpS3fCBYZcehmfwhs6ma_6uyhw6FKmYfM",
  authDomain: "spexdoc.firebaseapp.com",
  databaseURL: "https://spexdoc.firebaseio.com",
  projectId: "spexdoc",
  storageBucket: "spexdoc.appspot.com",
  messagingSenderId: "890835351206",
  appId: "1:890835351206:web:78e087ece687649ae8e667",
  measurementId: "G-20H8X0HLQ9",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

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
  fab: {
    margin: 0,
    top: "auto",
    right: 20,
    bottom: 20,
    left: "auto",
    position: "fixed",
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

class MedRecords extends React.Component {
  constructor(props) {
    super(props);

    //Bindings
    this.loadDoc = this.loadDoc.bind(this);
  }

  componentDidUpdate(prevProps) {
    console.log("update MedRecords")
  }

  loadDoc() {
    console.log("loadDoc");
    var defaultDatabase = firebase.firestore();

    var docRef = defaultDatabase.collection("userStorage").doc("docLinks");

    var user = firebase.auth().currentUser;
    if (user == null) {
      return;
    }
    var user_id = user.uid;

    var docLinks = [];

    docRef
      .get()
      .then(function (doc) {
        if (doc.exists) {
          for (const docLink of doc.data()[user_id]) {
            docLinks.push(docLink);
          }
          return docLinks;
        }
      })
      .then((docLinks) => {
        console.log(docLinks);
        this.setState({ showFiles: docLinks });
      });
  }

  render() {
    const { classes } = this.props;
    return (
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Hochgeladene Befunde</h4>
              <p className={classes.cardCategoryWhite}>
                Verwalte und teile deine Befunde
              </p>
            </CardHeader>
            <CardBody>
                <ShowFileList/>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    );
  }
}

MedRecords.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MedRecords);
