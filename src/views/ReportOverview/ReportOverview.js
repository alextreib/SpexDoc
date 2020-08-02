import React from "react";
import ReactDOM from "react-dom";
// @material-ui/core components
import {makeStyles} from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import EditableTableReport from "components/EditableTableReport/EditableTableReport.js";
import CardBody from "components/Card/CardBody.js";
import IconButton from "@material-ui/core/IconButton";
import Icon from "@material-ui/core/Icon";

import UploadFile from "components/UploadFile/UploadFile.js";
import MaterialTable from 'material-table';


import AddAlert from "@material-ui/icons/AddAlert";
import SnackbarContent from "components/Snackbar/SnackbarContent.js";
import Snackbar from "components/Snackbar/Snackbar.js";

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

// import FileBrowser from "react-keyed-file-browser";

const firebaseConfig = {
    apiKey: "AIzaSyCpS3fCBYZcehmfwhs6ma_6uyhw6FKmYfM",
    authDomain: "spexdoc.firebaseapp.com",
    databaseURL: "https://spexdoc.firebaseio.com",
    projectId: "spexdoc",
    storageBucket: "spexdoc.appspot.com",
    messagingSenderId: "890835351206",
    appId: "1:890835351206:web:78e087ece687649ae8e667",
    measurementId: "G-20H8X0HLQ9"
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
            marginBottom: "0"
        },
        "& a,& a:hover,& a:focus": {
            color: "#FFFFFF"
        }
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
            lineHeight: "1"
        }
    },
    ref: "https://google.de"
};

const useStyles = makeStyles(styles);

export default function ReportOverview() {
    const [fileName, setFileName] = React.useState();
    const [selectedFile, setSelectedFile] = React.useState();

    const handleFilePicker = async (e) => {
        console.log("go");
        let file = e.target.files[0];
        // read data from the blob objects(file)
        let reader = new FileReader();
        // reads the binary data and encodes it as base64 data url
        reader.readAsDataURL(file);
        // reads it finish with either success or failure
        reader.onloadend = () => { // reader.result is the result of the reading in base64 string
            setFileName(file.name);
            setSelectedFile(reader.result);
        };
        this.sendImageData();
    };

    var mount = document.querySelectorAll("div.browser-mount");

    const classes = useStyles();
    return (
        <GridContainer>
            <GridItem xs={12}
                sm={12}
                md={12}>
                <Card>
                    <CardHeader color="primary">
                        <h4 className={
                            classes.cardTitleWhite
                        }>Dermatologie</h4>
                        <p className={
                            classes.cardCategoryWhite
                        }>Untertitel</p>
                    </CardHeader>
                    <CardBody>
                        <Table tableHeaderColor="primary"
                            tableHead={
                                ["ID", "Arzt", "Datum", "Ort"]
                            }
                            tableData={
                                [
                                    [
                                        "213aer", "Dr. Wilder", "24.03.2020", "Stuttgart"
                                    ],
                                    [
                                        "234aef", "Dr. med. Fechtele", "12.03.2020", "Berl ain"
                                    ],
                                ]
                            }/>
                    </CardBody>
                    <IconButton style={
                        {
                            marginRight: "4vw",
                            alignSelf: "flex-end"
                        }
                    }>
                        <Icon fontSize="large" className="fa fa-plus-circle" color="primary"/>
                    </IconButton>
                </Card>
            </GridItem>
            <GridItem xs={12}
                sm={12}
                md={12}>
                <Card>
                    <CardHeader color="primary">
                        <h4 className={
                            classes.cardTitleWhite
                        }>Allergologie</h4>
                        <p className={
                            classes.cardCategoryWhite
                        }>Untertitel</p>
                    </CardHeader>
                    <CardBody>
                        <Table tableHeaderColor="primary"
                            tableHead={
                                ["ID", "Arzt", "Datum", "Ort"]
                            }
                            tableData={
                                [
                                    [
                                        "232efr", "Dr. Haut", "24.07.2020", "Offenburg"
                                    ],
                                    [
                                        "asj2ef", "Dr. med. Hornung", "12.03.2020", "Freiburg"
                                    ],
                                ]
                            }/>
                    </CardBody>
                </Card>

            </GridItem>
            <GridItem xs={12}
                sm={12}
                md={12}>
                <Card>
                    <CardHeader color="primary">
                        <h4 className={
                            classes.cardTitleWhite
                        }>Allergologie</h4>
                        <p className={
                            classes.cardCategoryWhite
                        }>Untertitel</p>
                    </CardHeader>
                    <CardBody>
                        <EditableTableReport/>
                    </CardBody>
                </Card>
            </GridItem>
            <UploadFile/>
        </GridContainer>
    );
}
