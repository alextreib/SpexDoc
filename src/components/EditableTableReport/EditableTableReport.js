import React from "react";
import MaterialTable from "material-table";

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/database";

import Button from "components/CustomButtons/Button.js";
class EditableTableReport extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      columns: [
        { title: "Name", field: "name" },
        { title: "Vorname", field: "surname" },
        { title: "Geburtsjahr", field: "birthYear" },
        {
          title: "Geburtsort",
          field: "birthCity",
        },
      ],
      // Default data
      data: [
        {
          name: "Max",
          surname: "Mustermann",
          birthYear: "1995",
          birthCity: "Berlin",
        },
        {
          name: "Alexa",
          surname: "Zimmer",
          birthYear: "2002",
          birthCity: "Hamburg",
        },
      ],
    };
    
    this.init= this.init.bind(this);
    this.tableChanged = this.tableChanged.bind(this);
    this.fetchTable = this.fetchTable.bind(this);
    
    this.init();
  }

  init()
  {
    this.fetchTable();
  }

  // Is called when table is changed
  tableChanged() {
    // Working
    console.log("table changed");

    var user = firebase.auth().currentUser;
    if (user == null) {
      return;
    }
    var user_id = user.uid;
    firebase
      .database()
      .ref("users/" + user_id)
      .set([this.state.data]);
    // this.updateTable();
  }

  // Fetch the table from Firebase (Original data)
  fetchTable() {
    //todo: Check login + call at beginning
    console.log("update table");

    var user = firebase.auth().currentUser;
    if (user == null) {
      return;
    }
    var user_id = user.uid;
    // Reading
    firebase
      .database()
      .ref("users/" + user_id)
      .once("value")
      .then((snapshot) => {
        console.log(snapshot.val());
        return snapshot.val();
      })
      .then((snapshot_data) => {
        if (this.state.data != snapshot_data) {
          this.setState({ data: snapshot_data[0] });
        }
      });
  }

  componentDidUpdate(prevProps) {
    // Why do I need this?
    // this.setState({ showFileParams: this.props.showFileParams });
  }

  render() {
    return (
      <div>
        <MaterialTable
          title=""
          columns={this.state.columns}
          options={{
            headerStyle: {
              color: '#9c27b0'
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

export default EditableTableReport;
