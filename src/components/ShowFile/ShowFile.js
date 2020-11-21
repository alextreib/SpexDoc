import React from "react";
import ReactDOM from "react-dom";
import Button from "components/CustomButtons/Button.js";

import firebase from "firebase/app";
import "firebase/storage";
import "firebase/firestore";
import { makeStyles } from "@material-ui/core/styles";
import { withStyles } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

import ModalFile from "components/ModalFile/ModalFile.js";

// const { FloatingActionButton, SvgIcon, MuiThemeProvider, getMuiTheme } = MaterialUI;
import IconButton from "@material-ui/core/IconButton";
import Icon from "@material-ui/core/Icon";
import AddIcon from "@material-ui/icons/Add";

import Fab from "@material-ui/core/Fab";

import PropTypes from "prop-types";


const styles = (theme) => ({
  root: {
    maxWidth: 345,
  },
});


class ShowFile extends React.Component {
  constructor(props) {
    const script = document.createElement("script");

    script.src =
      "https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js";
    script.async = true;

    document.body.appendChild(script);
    // highlight-range{3}
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    // this.fileInput = React.createRef();
    // Data pipeline to child class ModalFile
    this.propName="testName";
    // this.child = React.createRef();

  }

  onChangeHandler = (event) => {
    // this.child.current.openModal(event);

    console.log("fired");
    console.log(this.propName)
  };

  handleSubmit(event) {
    // highlight-range{3}
    event.preventDefault();

    console.log("fired");

    var fileToUpload=event.target.files[0];
    var fileName=fileToUpload.name;

    console.log(fileToUpload);
    alert(`Uploaded file - ${fileName}`);

    // Create a root reference
    var storageRef = firebase.storage().ref();

    var uploadTask = storageRef
      .child(fileName)
      .put(fileToUpload)
      .then(function (snapshot) {
        console.log("Uploaded file!");
      });

  }

  render() {
    const { classes } = this.props;

    return (
      
      <Card className={classes.root} >
      <ModalFile testProp={this.propName}/>
      <CardActionArea onClick={this.onChangeHandler}>
        <CardMedia 
          component="img"
          alt="Contemplative Reptile"
          square image="https://firebasestorage.googleapis.com/v0/b/spexdoc.appspot.com/o/digital-doctor.jpg?alt=media&token=8aaa0e5a-c75f-4047-9e39-c6a99e4de451"
          title="Contemplative Reptile"
        />
        <CardContent >
          <Typography gutterBottom variant="h5" component="h2">
            Dr. Wilder
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            20.11.2020
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Stuttgart
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions >
        <Button size="small" color="primary">
          Teilen
        </Button>
      </CardActions>
    </Card>
    );
  }
}

ShowFile.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ShowFile);
