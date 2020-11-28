import React from "react";
import MaterialTable from "material-table";

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/database";

import Button from "components/CustomButtons/Button.js";
import { writeDBData, readDBData } from "components/Internal/DBFunctions.js";
import { getPublicKey } from "components/Internal/Extraction.js";

class EditableTableReport extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // Default data
      data: this.props.tableOptions.data,
    };

    this.init = this.init.bind(this);
    this.tableChanged = this.tableChanged.bind(this);
    this.fetchTable = this.fetchTable.bind(this);

    this.init();
  }

  init = () => {
    this.fetchTable();
  };

  // Is called when table is changed
  tableChanged = () => {
    writeDBData(this.props.tableOptions.name, this.state.data);
  };

  // Fetch the table from Firebase (Original data)
  // Is called when table is changed
  fetchTable = () => {
    readDBData(this.props.tableOptions.name,this.props.tableOptions.name == "Emergency")
    .then((doc_data) => {
      this.setState({ data: doc_data });
    });
    return;

  };

  // Will trigger update from e.g. Emergency->linkAccess that will be triggered after componentdidmount
  componentDidUpdate(prevProps) {
    if (prevProps == this.props) {
      // No change from above (currently nothing else is needed)
      return;
    }
    this.fetchTable();
    // Why do I need this?
    // this.setState({ showFileParams: this.props.showFileParams });
  }

  render() {
    return (
      <div>
        <MaterialTable
          title=""
          columns={this.props.tableOptions.columns}
          options={{
            headerStyle: {
              color: "#9c27b0",
              padding: 20,
              paddingLeft: 35,
            },
            actionsColumnIndex: 10,
            cellStyle: {
              padding: 20,
              paddingLeft: 35,
            },
          }}
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
                  this.tableChanged();
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
                  this.tableChanged();
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
                  this.tableChanged();
                }, 600);
              }),
          }}
        />
      </div>
    );
  }
}

export default EditableTableReport;
