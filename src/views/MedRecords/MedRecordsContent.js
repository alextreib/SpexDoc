import {
  readDBData,
  uploadFile,
  writeDBData,
} from "components/Internal/DBFunctions.js";

import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import { DefaultCategories } from "components/Internal/DefaultData.js";
import DeleteIcon from "@material-ui/icons/Delete";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import IconButton from "@material-ui/core/IconButton";
import MedRecordDialog from "views/MedRecords/MedRecordDialog.js";
import PropTypes from "prop-types";
import React from "react";
import ShareIcon from "@material-ui/icons/Share";
import Typography from "@material-ui/core/Typography";
import UploadFileButton from "views/MedRecords/UploadFileButton.js";
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
  menuButton: {
    marginRight: 16,
    marginLeft: -12,
  },
  downloadButton: {
    position: "relative",
    left: "50%",
    height: 150,
    width: 150,
    color: "grey",
  },
});

class MedRecordsContent extends React.Component {
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
  };

  uploadFile = (event) => {
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
        date: "2011",
        doctor: "Dr. Müller",
        disease: "Hüftprobleme",
        category: "Test",
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
    var newItem = { title: newValue, year: 2000 };
    this.addnewCategory(newItem);
  };

  render() {
    const { classes } = this.props;

    return (
      <div>
        <GridContainer>
          {this.state.data.map((medRecord) => (
            <GridItem xs={12} sm={6} md={4}>
              <Card className={classes.card}>
                <CardActionArea onClick={(e) => this.openModal(medRecord, e)}>
                  {medRecord.isImage ? (
                    <CardMedia
                      className={classes.media}
                      component="img"
                      image={medRecord.link}
                      title="Befund"
                    />
                  ) : (
                    <CardMedia
                      className={classes.media}
                      component="img"
                      image="https://img.pngio.com/file-png-image-royalty-free-stock-png-images-for-your-design-file-png-256_256.png"
                      title="Befund"
                    />
                  )}
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      {medRecord.disease}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      {medRecord.date}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      {medRecord.doctor}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <IconButton
                    onClick={(e) => this.removeMedRecord(medRecord, e)}
                    aria-label="test"
                  >
                    <DeleteIcon />
                  </IconButton>
                  <IconButton style={{ marginLeft: "auto" }} aria-label="share">
                    <ShareIcon />
                  </IconButton>
                </CardActions>
                <MedRecordDialog
                  handleClose={this.handleClose}
                  tableChanges={this.tableChanges}
                  changeMedRecord={this.changeMedRecord}
                  addValueToOptionList={this.addValueToOptionList}
                  categoryList={this.state.categoryList}
                  medRecord={medRecord}
                  {...this.props}
                />
              </Card>
            </GridItem>
          ))}
        </GridContainer>

        <UploadFileButton uploadFile={this.uploadFile} />
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
