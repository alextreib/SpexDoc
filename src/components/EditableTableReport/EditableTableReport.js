import React from "react";
import MaterialTable from "material-table";

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/database";

import Button from "components/CustomButtons/Button.js";
import {
  writeDBData,
  readDBData,
  displayLogin,
} from "components/Internal/DBFunctions.js";
import { getPublicKey } from "components/Internal/Extraction.js";

import { connect } from "react-redux";
import { openLoginAlert } from "components/Internal/VisuElements";
import { openPopUp } from "components/Internal/VisuElements";

class EditableTableReport extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // Default data
      data: this.props.tableOptions.data,
      additionalComp:null,
    };

    this.init = this.init.bind(this);
    this.tableChanged = this.tableChanged.bind(this);
    this.fetchTable = this.fetchTable.bind(this);
    this.magicFunc = this.magicFunc.bind(this);

    this.init();
  }

  init = () => {
    this.fetchTable();
  };

  // Fetch the table from Firebase (Original data)
  // Is called when table is changed
  fetchTable = () => {
    return readDBData(
      this.props.tableOptions.name,
      this.props.tableOptions.name == "Emergency"
    ).then((doc_data) => {
      if (doc_data == null)
        // Cannot get data -> set default data from parent class
        this.setState({ data: this.props.tableOptions.data });
      else this.setState({ data: doc_data });
    });
  };

  // Is called when table is changed
  tableChanged = () => {
    writeDBData(this.props.tableOptions.name, this.state.data);
  };

  magicFunc = () =>{
    console.log("magicFunc")
    // this.setState({ additionalComp: openLoginAlert() });
    this.setState({ additionalComp: openPopUp() });
  }

  // Will trigger update from e.g. Emergency->linkAccess that will be triggered after componentdidmount
  componentDidUpdate(prevProps) {
    if (prevProps == this.props) {
      // No change from above (currently nothing else is needed)
      return;
    } else {
      this.fetchTable();
    }

    // Why do I need this?
    // this.setState({ showFileParams: this.props.showFileParams });
  }

  render() {
    return (
      <div>
          <Button
                onClick={this.magicFunc}
              >
                Download free!
              </Button>
              {this.state.additionalComp}
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

const mapStateToProps = (state) => ({
  loginState: state.loginState,
});

const EditableTableReportWithRedux = connect(mapStateToProps)(
  EditableTableReport
);

export default EditableTableReportWithRedux;
