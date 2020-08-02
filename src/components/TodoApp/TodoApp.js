import React from "react";
import ReactDOM from "react-dom";

import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import ReactTestTable from "components/Test/Test.js";
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

            <CardBody>
                <Table tableHeaderColor="primary"
                    tableHead={
                        ["ID", "Arzt", "Datum", "Ort"]
                    }
                    tableData={
                        this.state.students
                    }/> {/* {
                this.state.students.map((item, key) => {

                    const editField = (value, index) => { // Clone students data before mutation
                        const students = this.state.students.map(item => ({
                            ...item
                        }))

                        // Update field by index of current student
                        students[key][index] = value

                        // Trigger re-render
                        this.setState({students})
                    }

                    return (
                        <tr key={key}
                            className={
                                item.editing ? 'editing' : ''
                            }
                            onClick={
                                () => { // Clone students data before mutation
                                    const students = this.state.students.map(i => ({
                                        ...i,
                                        editing: item.editing && i === item
                                    }))

                                    // Toggle editing flag of this current student (ie table row)
                                    students[key].editing = true;

                                    // Trigger re-render
                                    this.setState({
                                        clientIsEditing: true, // This might not be needed ?
                                        students
                                    })
                                }
                        }>
                            <td>{
                                item.editing ? <input value={
                                        item[1]
                                    }
                                    onChange={
                                        e => editField(e.target.value, 1)
                                    }/> : <span>{
                                    item[1]
                                }</span>
                            }</td>
                            <td>{
                                item.editing ? <input value={
                                        item[2]
                                    }
                                    onChange={
                                        e => editField(e.target.value, 2)
                                    }/> : <span>{
                                    item[2]
                                }</span>
                            }</td>
                            <td>{
                                item.editing ? <input value={
                                        item[3]
                                    }
                                    onChange={
                                        e => editField(e.target.value, 3)
                                    }/> : <span>{
                                    item[3]
                                }</span>
                            }</td>
                            <td>{
                                item.editing ? <input value={
                                        item[4]
                                    }
                                    onChange={
                                        e => editField(e.target.value, 4)
                                    }/> : <span>{
                                    item[4]
                                }</span>
                            }</td>
                        </tr>
                    )
                })
            }  */} </CardBody>


        )
    }
}

export default TodoApp;
// ReactDOM.render(<TodoApp />, document.querySelector("#app"))
