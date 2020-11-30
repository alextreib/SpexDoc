import React from "react";
import MaterialTable from "material-table";

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/database";

import Button from "components/CustomButtons/Button.js";
import { writeDBData, readDBData } from "components/Internal/DBFunctions.js";
import { getPublicKey } from "components/Internal/Extraction.js";
import CommonComps from "components/Internal/CommonComps.js";

import { Paper } from "@material-ui/core";

import { connect } from "react-redux";

class EditableTableReport extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // Default data
      data: this.props.tableOptions.data,
      commonProps: {
        LoginAlertProps: {
          openLoginRequired: false,
          FuncParams: "test",
        },
        update: false,
      },
    };

    this.tableChanged = this.tableChanged.bind(this);
    this.fetchTable = this.fetchTable.bind(this);
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

  componentDidMount() {
    this.fetchTable();
  }

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
    var success = writeDBData(this.props.tableOptions.name, this.state.data);
    if (success == false) this.displayLogin();
  };

  // todo: Find a way to cluster/extract it to a common place
  displayLogin = () => {
    // This is how a function in CommonProps is called
    this.setState({
      commonProps: {
        LoginAlertProps: { openLoginRequired: true, FuncParams: "test" },
      },
    });
  };

  render() {
    return (
      <div>
        <CommonComps commonProps={this.state.commonProps} />
        <MaterialTable
          boxShadow={0}
          components={{
            Container: (props) => <Paper {...props} elevation={0} />,
          }}
          title=""
          columns={this.props.tableOptions.columns}
          options={{
            headerStyle: {
              color: "#9c27b0",
              padding: 15,
              paddingLeft: 5,
            },
            actionsColumnIndex: 10,
            cellStyle: {
              padding: 5,
              paddingLeft: 5,
            },
            rowStyle: {
              fontSize: 13,
              fontWeight:300
            }
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

// Required for each component that relies on the loginState
const mapStateToProps = (state) => ({
  loginState: state.loginState,
});

const EditableTableReportWithRedux = connect(mapStateToProps)(
  EditableTableReport
);

export default EditableTableReportWithRedux;
