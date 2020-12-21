import {
  DialogActions,
  DialogContent,
  DialogTitle,
} from "components/VisuComps/Dialog.js";
import {
  readDBData,
  uploadFile,
  writeDBData,
} from "components/Internal/DBFunctions.js";

import AddIcon from "@material-ui/icons/Add";
import AutoCompletionForm from "components/VisuComps/AutoCompletionForm.js";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardBody from "components/Card/CardBody.js";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "components/Card/CardHeader.js";
import CardMedia from "@material-ui/core/CardMedia";
import CustomButton from "components/CustomButtons/Button.js";
import UploadImage from "components/VisuComps/UploadImage.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import { DefaultCategories } from "components/Internal/DefaultData.js";
import DeleteIcon from "@material-ui/icons/Delete";
import DescriptionIcon from "@material-ui/icons/Description";
import Dialog from "@material-ui/core/Dialog";
import Fab from "@material-ui/core/Fab";
import GetAppIcon from "@material-ui/icons/GetApp";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import IconButton from "@material-ui/core/IconButton";
import PropTypes from "prop-types";
import React from "react";
import ShareIcon from "@material-ui/icons/Share";
import Typography from "@material-ui/core/Typography";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";

const styles = (theme) => ({
  card: {
    maxWidth: 345,
    marginBottom: 100,
    paddingBottom: theme.spacing(1),
  },
  media: {
    height: 140,
  },
  dialogtitle: {
    margin: 0,
    padding: theme.spacing(2),
  },
  rightToolbar: {
    position: "relative",
    minHeight: 100,
  },
  menuButton: {
    marginRight: 16,
    marginLeft: -12,
  },
  fab: {
    position: "absolute",
    bottom: 15,
    right: 15,
  },
  downloadButton: {
    position: "relative",
    left: "50%",
    height: 150,
    width: 150,
    color: "grey",
  },
});

class MedRecordDialog extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { classes } = this.props;

    return (
      <Dialog
        fullWidth={true}
        maxWidth={"xl"}
        onClose={(e) => this.props.handleClose(this.props.medRecord, e)}
        aria-labelledby="customized-dialog-title"
        open={this.props.medRecord.open}
      >
        <DialogTitle
          id="customized-dialog-title"
          onClose={(e) => this.props.handleClose(this.props.medRecord, e)}
        >
          Befund
        </DialogTitle>
        <DialogContent dividers>
          <Card>
            <CardBody>
              {this.props.medRecord.isImage ? (
                <div>
                  <CardMedia
                    component="img"
                    image={this.props.medRecord.link}
                    title="Befund"
                  />
                  <a href={this.props.medRecord.link} download>
                    Expandieren
                  </a>
                </div>
              ) : (
                <a href={this.props.medRecord.link} download>
                  <GetAppIcon className={classes.downloadButton} />
                </a>
              )}
              <UploadImage {...this.props}/>
            </CardBody>
          </Card>

          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Details</h4>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Datum"
                    id="date"
                    inputProps={{
                      value: this.props.medRecord.date,
                      onChange: (e) =>
                        this.props.tableChanges(
                          this.props.medRecord,
                          "date",
                          e
                        ),
                    }}
                    formControlProps={{
                      fullWidth: true,
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Arzt"
                    id="doctor"
                    inputProps={{
                      value: this.props.medRecord.doctor,
                      onChange: (e) =>
                        this.props.tableChanges(
                          this.props.medRecord,
                          "doctor",
                          e
                        ),
                    }}
                    formControlProps={{
                      fullWidth: true,
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Krankheit"
                    id="disease"
                    inputProps={{
                      value: this.props.medRecord.disease,
                      onChange: (e) =>
                        this.props.tableChanges(
                          this.props.medRecord,
                          "disease",
                          e
                        ),
                    }}
                    formControlProps={{
                      fullWidth: true,
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <AutoCompletionForm
                    addValueToOptionList={this.props.addValueToOptionList}
                    medRecord={this.props.medRecord}
                    value={this.props.medRecord.category}
                    changeMedRecord={this.props.changeMedRecord}
                    optionList={this.props.CategoryList}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <CustomInput
                    labelText="Symptome"
                    id="moreInfo"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      value: this.props.medRecord.symptoms,
                      onChange: (e) =>
                        this.props.tableChanges(
                          this.props.medRecord,
                          "symptoms",
                          e
                        ),
                      multiline: true,
                      rows: 5,
                    }}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <CustomInput
                    labelText="Diagnose"
                    id="moreInfo"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      value: this.props.medRecord.diagnosis,
                      onChange: (e) =>
                        this.props.tableChanges(
                          this.props.medRecord,
                          "diagnosis",
                          e
                        ),
                      multiline: true,
                      rows: 5,
                    }}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <CustomInput
                    labelText="Weiteres"
                    id="moreInfo"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      value: this.props.medRecord.moreInfo,
                      onChange: (e) =>
                        this.props.tableChanges(
                          this.props.medRecord,
                          "moreInfo",
                          e
                        ),
                      multiline: true,
                      rows: 5,
                    }}
                  />
                </GridItem>
              </GridContainer>
            </CardBody>
          </Card>
          {/* todo: Add QR Code to share */}
        </DialogContent>
        <DialogActions>
          <CustomButton
            autoFocus
            onClick={(e) => this.props.handleClose(this.props.medRecord, e)}
            color="primary"
          >
            Close
          </CustomButton>
        </DialogActions>
      </Dialog>
    );
  }
}

MedRecordDialog.propTypes = {
  classes: PropTypes.object.isRequired,
};

// Required for each component that relies on the loginState
const mapStateToProps = (state) => ({
  loginState: state.loginState,
});

const MedRecordDialogWithRedux = connect(mapStateToProps)(MedRecordDialog);

export default withStyles(styles)(MedRecordDialogWithRedux);
