/* eslint-disable no-use-before-define */
import React from "react";
import TextField from "@material-ui/core/TextField";
import VisuComp from "components/Internal/VisuComp.js";
import Autocomplete, {
  createFilterOptions,
} from "@material-ui/lab/Autocomplete";

import CircularProgress from "@material-ui/core/CircularProgress";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import { withStyles } from "@material-ui/core/styles";
import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

import { usePromiseTracker } from "react-promise-tracker";
import Loader from "react-promise-loader";

const filter = createFilterOptions();

class ProgressModal extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { classes } = this.props;

    return (
      <Loader
        promiseTracker={usePromiseTracker}
        color={"#3d5e61"}
        background={"rgba(255,255,255,.5)"}
      />
    );
  }
}
export default withStyles(styles)(ProgressModal);
