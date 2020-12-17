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
      dbName: "medRecords",
      data: [],
      categoryList: DefaultCategories,
    };
    this.openModal = this.openModal.bind(this);
  }

  componentDidMount() {
    this.fetchTable();
  }

  componentDidUpdate(prevProps) {
    if (prevProps == this.props) {
      // No change from above (currently nothing else is needed)
      return;
    }
    // this.fetchTable();
  }

  // DB functions
  fetchTable = () => {
    readDBData(this.state.dbName, false).then((doc_data) => {
      if (doc_data == null) return;
      // Cannot get data -> set default data from parent class
      else {
        this.setState({ data: doc_data });
      }
    });

    readDBData("CategoryList", false).then((doc_data) => {
      if (doc_data == null) return;
      // Cannot get data -> set default data from parent class
      else {
        this.setState({ categoryList: doc_data });
      }
    });
  };

  // Is called when table is changed
  uploadTable = () => {
    console.log(this.state.data);
    var success = writeDBData(this.state.dbName, this.state.data);
    success &= writeDBData("CategoryList", this.state.categoryList);
  };

  uploadFile = (category, event) => {
    event.preventDefault();

    var fileToUpload = event.target.files[0];

    var isImage = fileToUpload.type.includes("image");
    //todo: cleaner error catching
    return uploadFile(fileToUpload).then((fileLink) => {
      if (fileLink == null) {
        // displayLogin
      }

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
  };

  // Data Table changes

  addnewCategory = (newCategory) => {
    this.setState(
      (prevState) => {
        const categoryList = [...prevState.categoryList];
        categoryList.push(newCategory);
        return { ...prevState, categoryList };
      },
      () => {
        this.uploadTable();
      }
    );
  };

  removeCategory = (CategoryToRemove) => {
    this.setState(
      (prevState) => {
        const categoryList = [...prevState.categoryList];
        categoryList.splice(categoryList.indexOf(CategoryToRemove), 1);
        return { ...prevState, categoryList };
      },
      () => {
        this.uploadTable();
      }
    );
  };

  addnewMedRecord = (newMedRecord) => {
    this.setState(
      (prevState) => {
        const data = [...prevState.data];
        data.push(newMedRecord);
        return { ...prevState, data };
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
        const data = [...prevState.data];
        data[data.indexOf(medRecord)] = newData;
        return { ...prevState, data };
      },
      () => {
        this.uploadTable();
      }
    );
  };

  removeMedRecord = (MedRecordToRemove) => {
    this.setState(
      (prevState) => {
        const data = [...prevState.data];
        data.splice(data.indexOf(MedRecordToRemove), 1);
        return { ...prevState, data };
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
    this.state.data.forEach((medRecord) => {
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
        <GridContainer>
          {this.state.categoryList.map((category) => (
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
                            categoryList={this.state.categoryList}
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
