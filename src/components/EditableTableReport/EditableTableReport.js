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
    var user = firebase.auth().currentUser;
    if (user == null) {
      return;
    }
    var user_id = user.uid;

    firebase
      .firestore()
      .collection("userStorage")
      .doc("users")
      .collection(user_id)
      .doc(this.props.tableOptions.name)
      .set({
        tableData: this.state.data, // Required because array cannot be pushed
      });
  };

  // Fetch the table from Firebase (Original data)
  // Is called when table is changed
  fetchTable = () => {
    //todo: Check login + call at beginning
    var user_id;
    if (
      this.props.tableOptions.name == "Emergency" &&
      this.props.tableOptions.publicKey != null
    ) {
      // Get user information from link
      user_id = this.props.tableOptions.publicKey;
    } else {
      // Read information from logged in user
      var user = firebase.auth().currentUser;
      if (user == null) {
        // No login -> return
        return;
      }
      user_id = user.uid;
    }

    var docRef = firebase
      .firestore()
      .collection("userStorage")
      .doc("users")
      .collection(user_id)
      .doc(this.props.tableOptions.name);

    docRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          return doc.data();
        }
      })
      .then((doc_data) => {
        this.setState({ data: doc_data["tableData"] });
      });
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
        <Button onClick={this.handleClickNotification}>TestButton</Button>
        <MaterialTable
          title=""
          columns={this.props.tableOptions.columns}
          options={{
            headerStyle: {
              color: "#9c27b0",
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
