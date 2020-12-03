import { readDBData, writeDBData } from "components/Internal/DBFunctions.js";

import Button from "components/CustomButtons/Button.js";
import CommonComps from "components/Internal/CommonComps.js";
import MaterialTable from "material-table";
import { Paper } from "@material-ui/core";
import React from "react";
import { connect } from "react-redux";
import { getPublicKey } from "components/Internal/Extraction.js";
import Switch from "@material-ui/core/Switch";
import { useState, useEffect } from "react";



export default function EditableSwitch(props) {
  const [checked, setState] = React.useState(    true  );

  const [name] = React.useState(props.switchOptions.name);

  useEffect(() => {
    console.log("use")
    fetchTable();
  });

    // Fetch the table from Firebase (Original data)
  // Is called when table is changed
 const fetchTable = () => {
    return readDBData(
      name,false
    ).then((doc_data) => {
      if (doc_data == null)
      return;
        // Cannot get data -> set default data from parent class
        // this.setState({ data: this.props.tableOptions.data });
      else setState(doc_data);
    });
  };

  // Is called when table is changed
  const uploadTable = (value) => {
    return  writeDBData(name,value);
  };


  const handleChange = (event) => {
    uploadTable(event.target.checked);
    setState(event.target.checked );
  };

  return (
      <Switch
        checked={checked}
        onChange={handleChange}
        name="checkedA"
        inputProps={{ 'aria-label': 'secondary checkbox' }}
      />
  );
}      




// class EditableSwitch extends React.Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       // Default data
//       name: this.props.switchOptions.name,
//       data: this.props.switchOptions.data, // checked
//     };

//     this.uploadTable = this.uploadTable.bind(this);
//     this.fetchTable = this.fetchTable.bind(this);
//   }

//   // Will trigger update from e.g. Emergency->linkAccess that will be triggered after componentdidmount
//   componentDidUpdate(prevProps) {
   
//     console.log(this.props.switchOptions);
//     if (prevProps == this.props) {
//       // No change from above (currently nothing else is needed)
//       return;
//     } else {
//       // this.fetchTable();
//     }
//     console.log(this.props.switchOptions);
//   }

//   componentDidMount() {
//     console.log(this.props.switchOptions);
//     this.setState({name: this.props.switchOptions.name});
//       this.setState({data: this.props.switchOptions.data});

//     this.fetchTable();
//   }

//   // Fetch the table from Firebase (Original data)
//   // Is called when table is changed
//   fetchTable = () => {
//     return readDBData(this.state.name, false).then((doc_data) => {
//       if (doc_data == null) return;
//       // Cannot get data -> set default data from parent class
//       // this.setState({ data: this.props.tableOptions.data });
//       else this.setState({ data: doc_data });
//     });
//   };

//   // Is called when table is changed
//   uploadTable = () => {
//     var success = writeDBData(this.state.name, this.state.data);
//     if (success == false) return false;
//   };

//   handleSwitchChange = async (property, event) => {
//     var checked = event.target.checked;

//     console.log(checked);
//     this.setState({
//       data: { checked },
//     });

//     // Upload
//     // this.uploadTable();
//   };

//   render() {
//     return (
//       <Switch
//         checked={this.state.data}
//         onChange={(ev) => this.handleSwitchChange("organ_donation", ev)}
//         color="primary"
//         name="Emergency_switch"
//         inputProps={{ "aria-label": "secondary checkbox" }}
//       />
//     );
//   }
// }

// export default EditableSwitch;
