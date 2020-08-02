import React from "react";
import ReactDOM from "react-dom";

import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
// import ReactTestTable from "components/ReactTestTable/Test.js";
import CardBody from "components/Card/CardBody.js";
import Test from "views/Test/Test.js";
import IconButton from "@material-ui/core/IconButton";
import Icon from "@material-ui/core/Icon";
import MaterialTable from 'material-table';

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

    constructor(props) {
        super(props);


        this.state={
            columns: [
              { title: 'Name', field: 'name' },
              { title: 'Surname', field: 'surname' },
              { title: 'Birth Year', field: 'birthYear', type: 'numeric' },
              {
                title: 'Birth Place',
                field: 'birthCity',
                lookup: { 34: 'İstanbuld', 63: 'Şanlıurfa' },
              },
            ],
            data: [
              { name: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63 },
              {
                name: 'Zerya Betül',
                surname: 'Baran',
                birthYear: 2017, 
                birthCity: 34,
              },
            ],
          };

        

        // this.state = {
        //     students: [
        //         [
        //             "232efr", "Dr. Haut", "24.07.2020", "Offenburg"
        //         ],
        //         [
        //             "asj2ef", "Dr. med. Hornung", "12.03.2020", "Freibaurg"
        //         ],
        //     ]
        // }
    }

    render() {
        return (

            <MaterialTable
            title="Editable Example"
            columns={this.state.columns}
            data={this.state.data}
            editable={{
              onRowAdd: (newData) =>
                new Promise((resolve) => {
                  setTimeout(() => {
                    resolve();
                    this.setState((prevState) => {
                      const data = [...prevState.data];
                      data.push(newData);
                      return { ...prevState, data };
                    });
                  }, 600);
                }),
              onRowUpdate: (newData, oldData) =>
                new Promise((resolve) => {
                  setTimeout(() => {
                    resolve();
                    if (oldData) {
                      this.setState((prevState) => {
                        const data = [...prevState.data];
                        data[data.indexOf(oldData)] = newData;
                        return { ...prevState, data };
                      });
                    }
                  }, 600);
                }),
              onRowDelete: (oldData) =>
                new Promise((resolve) => {
                  setTimeout(() => {
                    resolve();
                    this.setState((prevState) => {
                      const data = [...prevState.data];
                      data.splice(data.indexOf(oldData), 1);
                      return { ...prevState, data };
                    });
                  }, 600);
                }),
            }}
          />


        )
    }
}

export default TodoApp;
// ReactDOM.render(<TodoApp />, document.querySelector("#app"))
