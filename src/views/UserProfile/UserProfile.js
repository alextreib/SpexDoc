import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import Switch from '@material-ui/core/Switch';

import LoginAlert from "components/LoginAlert/LoginAlert.js";

import avatar from "assets/img/faces/profile_white.png";

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0",
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
  },
};

const useStyles = makeStyles(styles);

// Display Login Screen here -> Login from Profile NavBar should also point here
class UserProfile extends React.Component {
  constructor(props) {
    super(props);

    // const [profileActive, setProfile] = React.useState(null);
    // var [email, setEmail] = React.useState("");
    // var [firstName, setfirstName] = React.useState("");

    this.state = {
      email: "",
      firstName: "",
      lastName: "",
      plz: "",
      city: "",
      street: "",
      aboutMe: "",
    };
  }

  // handleLoginProfile = () => {
  //   var provider = new firebase.auth.GoogleAuthProvider();

  //   firebase
  //     .auth()
  //     .signInWithPopup(provider)
  //     .then(function (result) {
  //       // This gives you a Google Access Token. You can use it to access the Google API.
  //       var token = result.credential.accessToken;
  //       // The signed-in user info.
  //       var user = result.user;

  //       // setProfile(user);
  //       this.setState({ email: user.email });
  //       this.setState({ firstName: user.displayName });

  //       console.log(user);
  //       console.log("user logged in");
  //       // window.user = user;
  //       // ...
  //     })
  //     .catch(function (error) {
  //       // Handle Errors here.
  //       var errorCode = error.code;
  //       var errorMessage = error.message;
  //       // The email of the user's account used.
  //       var email = error.email;
  //       // The firebase.auth.AuthCredential type that was used.
  //       var credential = error.credential;
  //       console.log("error: " + errorCode + ":" + errorMessage);
  //       // ...
  //     });
  // };

  // Nice function: Sets states automatically 
  handleChange(property, event) {
    console.log("handleChange")
var changedValue=event.target.value;
    this.setState({ [property]: changedValue });
  };

  updateProf = () => {
    console.log("updateProf");

    var user = firebase.auth().currentUser;

    console.log(user);
    // updateProfile()
    // Updates the user attributes:
    user
      .updateProfile({
        email: this.state.email,
        displayName: this.state.firstName,
        // photoURL: "https://example.com/jane-q-user/profile.jpg",
      })
      .then(
        function () {
          // Profile updated successfully!
          // "Jane Q. User"
          var displayName = user.displayName;
          // "https://example.com/jane-q-user/profile.jpg"
          var photoURL = user.photoURL;
        },
        function (error) {
          // An error happened.
        }
      );
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={8}>
            <Card>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>Edit Profil</h4>
                <p className={classes.cardCategoryWhite}>
                  Complete your profile
                </p>
              </CardHeader>
              <CardBody>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      labelText="Email"
                      id="email"
                      inputProps={{
                        onChange: (e) => this.handleChange("email", e),
                      }}
                      formControlProps={{
                        fullWidth: true,
                        color: "secondary",
                      }}
                      />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      labelText="Vorname"
                      id="firstName"
                      inputProps={{
                        onChange: (e) => this.handleChange("firstName", e),
                      }}
                      formControlProps={{
                        fullWidth: true,
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                      labelText="Nachname"
                      id="lastName"
                      inputProps={{
                        onChange: (e) => this.handleChange("lastName", e),
                      }}
                      formControlProps={{
                        fullWidth: true,
                        color: "secondary",
                      }}
                      />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                      labelText="Postleitzahl"
                      id="plz"
                      inputProps={{
                        onChange: (e) => this.handleChange("plz", e),
                      }}
                      formControlProps={{
                        fullWidth: true,
                        color: "secondary",
                      }}
                      />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                      labelText="Wohnort"
                      id="city"
                      inputProps={{
                        onChange: (e) => this.handleChange("city", e),
                      }}
                      formControlProps={{
                        fullWidth: true,
                        color: "secondary",
                      }}
                      />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                      labelText="Straße"
                      id="street"
                      inputProps={{
                        onChange: (e) => this.handleChange("street", e),
                      }}
                      formControlProps={{
                        fullWidth: true,
                        color: "secondary",
                      }}
                      />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <CustomInput
                      labelText="Über mich"
                      id="aboutMe"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        onChange: (e) => this.handleChange("aboutMe", e),
                        multiline: true,
                        rows: 5,
                      }}
                    />
                  </GridItem>
                </GridContainer>
              </CardBody>
              <CardFooter>
                <Button color="primary" onClick={this.updateProf} round>
                  Speichern
                </Button>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <Card profile>
              <CardAvatar profile>
                <a href="#pablo" onClick={(e) => e.preventDefault()}>
                  <img src={avatar} alt="..." />
                </a>
              </CardAvatar>
              <CardBody profile>
                <h6 className={classes.cardCategory}>Patient</h6>
                <h4 className={classes.cardTitle}>{this.state.firstName} {this.state.lastName}</h4>
                <h4 className={classes.cardTitle}>{this.state.city}</h4>
                <p className={classes.description}>
                {this.state.aboutMe}
                </p>
                <Button color="primary" onClick={this.updateProf} round>
                  Share
                </Button>
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

UserProfile.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UserProfile);
