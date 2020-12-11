import LoginAlert from "components/LoginAlert/LoginAlert.js";
import React from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import Button from "components/CustomButtons/Button.js";

import { readDBData, writeDBData } from "components/Internal/DBFunctions.js";
import { checkUser, getUserEmail } from "components/Internal/Checks.js";
import { loginRedux, logoutRedux } from "components/Internal/Redux.js";
import { connect } from "react-redux";

// Is more or less an abstract class that clusters
// Expect commonProps
export default class VisuComp extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidUpdate() {
    console.log("visu comp update");
  }

  fetchTable = (property) => {
    // Promis probably won't work
    return new Promise((resolve, reject) => {
      console.log("fetchTable");
      readDBData(property, false).then((doc_data) => {
        if (doc_data != null) {
          this.setState({ [property]: doc_data });
          resolve(true);
        }
      });
    });
  };

  timeout(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  // Combining the function in a way to display it everywhere the same
  displayLogin = () => {
    console.log("displaylogin");
    // This is how a function in CommonProps is called
    this.setState({
      commonProps: {
        ...this.state.commonProps,
        LoginAlertProps: { openLoginRequired: true, FuncParams: "test" },
      },
    });
    console.log("update force");
  };

  // Displaying PopUp, default sucess (blue), error: red
  displayPopUp = (message, type = "info") => {
    console.log("displayPopUp");
    // This is how a function in CommonProps is called
    this.setState({
      commonProps: {
        ...this.state.commonProps,
        PopUpProps: {
          openPopUp: true,
          message: message,
          type: type,
          FuncParams: "test",
        },
      },
    });
    console.log("update force");
  };

  // PlainTable functions
  // TableName is also property name, data required (but also from MaterialTable required)
  onRowAdd = (newData, TableName) => {
    new Promise((resolve) => {
      setTimeout(() => {
        resolve();
        this.setState((prevState) => {
          const data = [...prevState[TableName].data];
          data.push(newData);
          return {
            ...prevState,
            [TableName]: {
              ...prevState[TableName],
              data: data,
            },
          };
        });
        this.TableChanged(TableName, this.state[TableName].data);
      }, 600);
    });
  };

  onRowUpdate = (newData, oldData, TableName) => {
    new Promise((resolve) => {
      setTimeout(() => {
        resolve();
        if (oldData) {
          this.setState((prevState) => {
            TableName: {
              const data = [...prevState[TableName].data];
              console.log(data);
              data[data.indexOf(oldData)] = newData;
              return {
                ...prevState,
                [TableName]: {
                  ...prevState[TableName],
                  data: data,
                },
              };
            }
          });
        }
        console.log(newData);
        this.TableChanged(TableName, this.state[TableName].data);
      }, 600);
    });
  };

  onRowDelete = (oldData, TableName) => {
    new Promise((resolve) => {
      setTimeout(() => {
        resolve();
        this.setState((prevState) => {
          const data = [...prevState[TableName].data];
          data.splice(data.indexOf(oldData), 1);
          return {
            ...prevState,
            [TableName]: {
              ...prevState[TableName],
              data: data,
            },
          };
        });
        this.TableChanged(TableName, this.state[TableName].data);
      }, 600);
    });
  };

  // Fetch the table from Firebase (Original data)
  // Is called when table is changed
  TableFetch = (TableName) => {
    readDBData(TableName, TableName == "Emergency").then((doc_data) => {
      if (doc_data != null)
        this.setState({
          [TableName]: { ...this.state[TableName], data: doc_data },
        });
      return;
    });
  };

  // Is called when table is changed
  TableChanged = (name, data) => {
    return writeDBData(name, data);
  };

  // Rendering not possible in abstract class
}
