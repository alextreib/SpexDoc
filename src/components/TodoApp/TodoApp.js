import React from "react";
import ReactDOM from "react-dom";

import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import MaterialTableDemo from "components/Test/Test.js";
// import ReactTestTable from "components/ReactTestTable/ReactTestTable.js";
import CardBody from "components/Card/CardBody.js";
import Test from "views/Test/Test.js";
import IconButton from "@material-ui/core/IconButton";
import Icon from "@material-ui/core/Icon";

import {makeStyles} from "@material-ui/core/styles";


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


class TodoApp extends React.Component {

    editStatus(event, index) {
        console.log("edit status clicket");
        console.log(event.target.id);
        this.setState({isStatusClicked: index})
    }
    constructor(props) {

        super(props)
        this.state = {
            students: [
                [
                    "232efr", "Dr. Haut", "24.07.2020", "Offenburg"
                ],
                [
                    "asj2ef", "Dr. med. Hornung", "12.03.2020", "Freibaurg"
                ],
            ]
        }
    }

    render() {
        return (

            <MaterialTableDemo/>


        )
    }
}

export default TodoApp;
// ReactDOM.render(<TodoApp />, document.querySelector("#app"))
