import {
  readDBData,
  uploadFile,
  writeDBData,
} from "components/Internal/DBFunctions.js";

import { DefaultCategories } from "components/Internal/DefaultData.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import PropTypes from "prop-types";
import React from "react";
import UploadFileButton from "views/MedRecords/UploadFileButton.js";
import MedRecordCard from "views/MedRecords/MedRecordCard.js";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import {
  getStringDate,
  getCurrentDate,
} from "components/Internal/VisuElements.js";
import Button from "@material-ui/core/Button";

import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import VisuComp from "components/Internal/VisuComp";
import IconButton from "@material-ui/core/IconButton";

import DeleteIcon from "@material-ui/icons/Delete";
import { CommonCompsData } from "components/Internal/DefaultData";
import CommonComps from "components/Internal/CommonComps";

const styles = (theme) => ({
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0",
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF",
    },
  },
  deleteButton: {
    position: "absolute",
    bottom: 15,
    right: 15,
    color: "white",
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1",
    },
  },
});

class MedRecordsContent extends VisuComp {
  constructor(props) {
    super(props);

    this.state = {
      dbNameMedRecords: "MedRecords",
      dbNameCategories: "CategoryList",
      MedRecords: [],
      CategoryList: DefaultCategories,
      commonProps: { ...CommonCompsData, updateComp: this.updateComp },
    };
    this.openModal = this.openModal.bind(this);
  }

  componentDidMount() {
    this.updateComp();
  }

  componentDidUpdate(prevProps) {
    if (prevProps == this.props) {
      // No change from above (currently nothing else is needed)
      return;
    }
    this.updateComp();
  }

  updateComp = () => {
    this.fetchTable();
  };

  // DB functions
  fetchTable = () => {
    this.TableFetch(this.state.dbNameMedRecords);
    this.TableFetch(this.state.dbNameCategories);
  };

  // Is called when table is changed
  uploadTable = () => {
    this.TableChanged(this.state.dbNameMedRecords, this.state.MedRecords);
    this.TableChanged(this.state.dbNameCategories, this.state.CategoryList);
  };

  uploadFile = (category, event) => {
    event.preventDefault();
    if (!this.checkLoginAndDisplay()) {
      return;
    }

    Array.from(event.target.files).forEach(async (fileToUpload) => {
      var isImage = fileToUpload.type.includes("image");
      //todo: cleaner error catching
      await uploadFile(fileToUpload).then((fileLink) => {
        var newMedRecord = {
          link: fileLink,
          isImage: isImage,
          date: getCurrentDate(),
          doctor: "Dr. Schneider",
          disease: "Erkältung",
          category: category,
          open: false,
        };

        this.addnewMedRecord(newMedRecord);
      });
    });
  };

  // Data Table changes

  addnewCategory = (newCategory) => {
    this.setState(
      (prevState) => {
        const CategoryList = [...prevState.CategoryList];
        CategoryList.push(newCategory);
        return { ...prevState, CategoryList };
      },
      () => {
        this.uploadTable();
      }
    );
  };

  removeCategory = (CategoryToRemove) => {
    if (!this.checkLoginAndDisplay()) {
      return;
    }
    this.setState(
      (prevState) => {
        const CategoryList = [...prevState.CategoryList];
        CategoryList.splice(CategoryList.indexOf(CategoryToRemove), 1);
        return { ...prevState, CategoryList };
      },
      () => {
        this.uploadTable();
      }
    );
  };

  addnewMedRecord = (newMedRecord) => {
    this.setState(
      (prevState) => {
        const MedRecords = [...prevState.MedRecords];
        MedRecords.push(newMedRecord);
        return { ...prevState, MedRecords };
      },
      () => {
        this.uploadTable();
      }
    );
  };

  changeMedRecord = (medRecord, key, value) => {
    var newData = { ...medRecord, [key]: value };

    this.setState(
      (prevState) => {
        const MedRecords = [...prevState.MedRecords];
        MedRecords[MedRecords.indexOf(medRecord)] = newData;
        return { ...prevState, MedRecords };
      },
      () => {
        this.uploadTable();
      }
    );
  };

  removeMedRecord = (MedRecordToRemove) => {
    this.setState(
      (prevState) => {
        const MedRecords = [...prevState.MedRecords];
        MedRecords.splice(MedRecords.indexOf(MedRecordToRemove), 1);
        return { ...prevState, MedRecords };
      },
      () => {
        this.uploadTable();
      }
    );
  };

  // UI functions
  //todo: not save in db, only visu
  openModal = (medRecord) => {
    this.changeMedRecord(medRecord, "open", true);
  };

  handleClose = (medRecord) => {
    this.changeMedRecord(medRecord, "open", false);
  };

  tableChanges = (medRecord, property, event) => {
    this.changeMedRecord(medRecord, property, event.target.value);
  };

  addValueToOptionList = (newValue) => {
    this.addnewCategory(newValue);
  };

  // Rendering functions
  getMedRecord = (category) => {
    var MedRecordList = [];
    this.state.MedRecords.forEach((medRecord) => {
      if (medRecord.category == category.title) {
        MedRecordList.push(medRecord);
      }
    });

    return MedRecordList;
  };

  render() {
    const { classes } = this.props;

    return (
      <div>
        <CommonComps commonProps={this.state.commonProps} />

        <GridContainer>
          {this.state.CategoryList.map((category) => (
            // this.getMedRecord(category).length>0 ?(
            <GridItem xs={12} sm={12} md={12}>
              <Card>
                <CardHeader color="primary">
                  <h4 className={classes.cardTitleWhite}>{category.title}</h4>
                  <p className={classes.cardCategoryWhite}>
                    Verwalte und teile deine Befunde
                  </p>

                  <IconButton
                    className={classes.deleteButton}
                    onClick={(e) => this.removeCategory(category, e)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </CardHeader>
                <CardBody>
                  <GridContainer>
                    {this.getMedRecord(category).map((medRecord) =>
                      medRecord.category == category.title ? (
                        <GridItem xs={12} sm={6} md={4}>
                          <MedRecordCard
                            handleClose={this.handleClose}
                            tableChanges={this.tableChanges}
                            changeMedRecord={this.changeMedRecord}
                            addValueToOptionList={this.addValueToOptionList}
                            removeMedRecord={this.removeMedRecord}
                            openModal={this.openModal}
                            CategoryList={this.state.CategoryList}
                            medRecord={medRecord}
                          />
                        </GridItem>
                      ) : null
                    )}
                  </GridContainer>
                  <UploadFileButton
                    category={category.title}
                    uploadFile={this.uploadFile}
                  />
                </CardBody>
              </Card>
            </GridItem>
          ))}
        </GridContainer>
      </div>
    );
  }
}

MedRecordsContent.propTypes = {
  classes: PropTypes.object.isRequired,
};

// Required for each component that relies on the loginState
const mapStateToProps = (state) => ({
  loginState: state.loginState,
});

const MedRecordsContentWithRedux = connect(mapStateToProps)(MedRecordsContent);

export default withStyles(styles)(MedRecordsContentWithRedux);
