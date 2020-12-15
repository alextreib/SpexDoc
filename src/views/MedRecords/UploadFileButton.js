
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import PropTypes from "prop-types";
import React from "react";
import { withStyles } from "@material-ui/core/styles";

const styles = () => ({
  rightToolbar: {
    position: "relative",
    minHeight: 100,
  },
  fab: {
    position: "absolute",
    bottom: 15,
    right: 15,
  },
});

class UploadFileButton extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.rightToolbar}>
        <input
          id="myInput"
          type="file"
          ref={(ref) => (this.myInput = ref)}
          style={{ display: "none" }}
          onChange={this.props.uploadFile}
        />

        {/* Only button */}
        <Fab
          className={classes.fab}
          color="primary"
          aria-label="add"
          onClick={() => this.myInput.click()}
        >
          <AddIcon />
        </Fab>
      </div>
    );
  }
}

UploadFileButton.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UploadFileButton);
