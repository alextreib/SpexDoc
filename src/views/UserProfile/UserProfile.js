import { readDBData, writeDBData } from "components/Internal/DBFunctions.js";
import { checkUser, getUserEmail } from "components/Internal/Checks.js";
import {
  loginRedux,
  logoutRedux,
  setAccessToken,
} from "components/Internal/Redux.js";
import { loginUser, logoutUser } from "components/Internal/LoginFunctions.js";
import VisuComp from "components/Internal/VisuComp.js";
import { CommonCompsData } from "components/Internal/DefaultData.js";

import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import CardHeader from "components/Card/CardHeader.js";
import CommonComps from "components/Internal/CommonComps.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import GridContainer from "components/Grid/GridContainer.js";
import AssignmentIndIcon from "@material-ui/icons/AssignmentInd";

// @material-ui/core components
// core components
import GridItem from "components/Grid/GridItem.js";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import React from "react";
import Switch from "@material-ui/core/Switch";
import avatar from "assets/img/faces/profile_white.png";
import { connect } from "react-redux";
import { getUserID, getUser } from "components/Internal/Checks.js";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const styles = (theme) => ({
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
  cardAvatar: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
});

class UserProfile extends VisuComp {
  constructor(props) {
    super(props);
    this.state = {
      Switches: {
        AGB: false,
        DSGVO: false,
      },
      commonProps: { ...CommonCompsData, updateComp: this.updateComp },
      userProfile: {
        email: "",
        firstName: "",
        lastName: "",
        plz: "",
        city: "",
        street: "",
        birthDate: "",
        insurance: "",
        aboutMe: "",
      },
    };
  }

  componentDidMount() {
    console.log(this.props);
    this.updateComp();
  }

  componentDidUpdate(prevProps) {
    if (prevProps == this.props) {
      // No change from above (currently nothing else is needed)
      return;
    } else {
      this.fetchTable();
      // Only required for visu, not loading
      this.setState({
        commonProps: { ...this.state.commonProps, loginState: checkUser() },
      });
    }
  }

  // Required from CommonProps
  updateComp = () => {
    this.fetchTable();
    this.setState({
      userProfile: { ...this.state.userProfile, email: getUserEmail() },
    });
  };

  // Fetch the table from Firebase (Original data)
  // Is called when table is changed
  fetchTable = () => {
    // todo: default parameter
    return readDBData("UserProfile", false).then((doc_data) => {
      if (doc_data != null) this.setState({ userProfile: doc_data });
      // Cannot get data -> set default data from parent class
      // this.setState({ userProfile: this.state.user });
      // else ;
    });
  };

  // Is called when table is changed
  uploadProfile = () => {
    console.log("upload");
    var user_id = getUserID();
    if (user_id == null) {
      this.displayLogin();
      return false;
    }
    var success = writeDBData("UserProfile", this.state.userProfile);
    if (success == false) this.displayLogin();
  };

  // Nice function: Sets states automatically
  profileChange = (property, event) => {
    var changedValue = event.target.value;
    this.setState(
      {
        userProfile: { ...this.state.userProfile, [property]: changedValue },
      },
      () => {
        this.uploadProfile();
      }
    );
  };

  handleLoginProfile = () => {
    console.log("login process");
    loginUser()
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        // setUserLogin(true);
        console.log("User successfully logged in ");
        // dispatch(loginRedux({ user_id: user.uid }));
        console.log(this.props);
        this.props.loginRedux({ user_id: user.uid });
      })
      .catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        console.log("error: " + errorCode + ":" + errorMessage);
        // ...
      });
    // handleMenuClose();
  };

  handleLogoutProfile = () => {
    logoutUser()
      .then(() => {
        window.user = null;
        console.log("User successfully logged out");
        // todo: PopUp
        // Sign-out successful.
        // setUserLogin(false);
        // dispatch(logoutRedux());
        this.props.logoutRedux();
      })
      .catch((error) => {
        console.log("error while logging out");
        // An error happened.
      });
    // handleMenuClose();
  };

  handleSwitchChange = async (property, event) => {
    console.log("handleSwitch");
    var checked = event.target.checked;

    this.setState({
      Switches: {
        ...this.state.Switches,
        [property]: checked,
      },
    });
  };

  testfunc = () => {
    console.log("testfunc");
    this.displayLogin();
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <CommonComps commonProps={this.state.commonProps} />
        <Button onClick={this.handleLogoutProfile}>Logout</Button>
        <GridContainer>
          <GridItem xs={12} sm={12} md={8}>
            <Card>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>Profil</h4>
                <p className={classes.cardCategoryWhite}></p>
              </CardHeader>
              {!this.state.commonProps.loginState ? (
                <CardBody>
                  <Typography variant="h4" component="h2">
                    <Switch
                      checked={this.state.Switches.AGB}
                      onChange={(ev) => this.handleSwitchChange("AGB", ev)}
                      color="primary"
                      name="Emergency_switch"
                      inputProps={{ "aria-label": "secondary checkbox" }}
                    />
                    AGB
                  </Typography>
                  <Typography variant="h4" component="h2">
                    <Switch
                      checked={this.state.Switches.DSGVO}
                      onChange={(ev) => this.handleSwitchChange("DSGVO", ev)}
                      color="primary"
                      name="Emergency_switch"
                      inputProps={{ "aria-label": "secondary checkbox" }}
                    />
                    DSGVO
                  </Typography>
                  <Button
                    disabled={
                      !(this.state.Switches.AGB && this.state.Switches.DSGVO)
                    }
                    onClick={this.handleLoginProfile}
                    color="primary"
                    round
                  >
                    Login
                  </Button>
                </CardBody>
              ) : (
                <div>
                  <CardBody>
                    <GridContainer>
                      <GridItem xs={12} sm={12} md={4}>
                        <CustomInput
                          labelText="Email"
                          id="email"
                          inputProps={{
                            value: this.state.userProfile.email,
                            onChange: (e) => this.profileChange("email", e),
                          }}
                          formControlProps={{
                            fullWidth: true,
                          }}
                        />
                      </GridItem>
                      <GridItem xs={12} sm={12} md={4}>
                        <CustomInput
                          labelText="Vorname"
                          id="firstName"
                          inputProps={{
                            value: this.state.userProfile.firstName,
                            onChange: (e) => this.profileChange("firstName", e),
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
                            value: this.state.userProfile.lastName,
                            onChange: (e) => this.profileChange("lastName", e),
                          }}
                          formControlProps={{
                            fullWidth: true,
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
                            value: this.state.userProfile.plz,
                            onChange: (e) => this.profileChange("plz", e),
                          }}
                          formControlProps={{
                            fullWidth: true,
                          }}
                        />
                      </GridItem>
                      <GridItem xs={12} sm={12} md={4}>
                        <CustomInput
                          labelText="Wohnort"
                          id="city"
                          inputProps={{
                            value: this.state.userProfile.city,
                            onChange: (e) => this.profileChange("city", e),
                          }}
                          formControlProps={{
                            fullWidth: true,
                          }}
                        />
                      </GridItem>
                      <GridItem xs={12} sm={12} md={4}>
                        <CustomInput
                          labelText="Straße"
                          id="street"
                          inputProps={{
                            value: this.state.userProfile.street,
                            onChange: (e) => this.profileChange("street", e),
                          }}
                          formControlProps={{
                            fullWidth: true,
                          }}
                        />
                      </GridItem>
                    </GridContainer>
                    <GridContainer>
                      <GridItem xs={12} sm={12} md={6}>
                        <CustomInput
                          labelText="Geburtstag"
                          id="birthDate"
                          inputProps={{
                            value: this.state.userProfile.birthDate,
                            onChange: (e) => this.profileChange("birthDate", e),
                          }}
                          formControlProps={{
                            fullWidth: true,
                          }}
                        />
                      </GridItem>
                      <GridItem xs={12} sm={12} md={6}>
                        <CustomInput
                          labelText="Krankenkasse"
                          id="insurance"
                          inputProps={{
                            value: this.state.userProfile.insurance,
                            onChange: (e) => this.profileChange("insurance", e),
                          }}
                          formControlProps={{
                            fullWidth: true,
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
                            value: this.state.userProfile.aboutMe,
                            onChange: (e) => this.profileChange("aboutMe", e),
                            multiline: true,
                            rows: 5,
                          }}
                        />
                      </GridItem>
                    </GridContainer>
                  </CardBody>
                  <CardFooter>
                    <Link className={classes.Home} to="/dashboard">
                      <Button color="primary" round>
                        Ok
                      </Button>
                    </Link>
                  </CardFooter>
                </div>
              )}
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
                <h4 className={classes.cardTitle}>
                  {this.state.userProfile.firstName}{" "}
                  {this.state.userProfile.lastName}
                </h4>
                <h4 className={classes.cardTitle}>
                  {this.state.userProfile.city}
                </h4>
                <p className={classes.description}>
                  {this.state.userProfile.aboutMe}
                </p>
                <Button color="primary" onClick={this.shareProfile} round>
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

const mapStateToProps = (state) => ({
  loginState: state.loginState,
  access_token: state.access_token,
});

const mapDispatchToProps = {
  loginRedux,
  logoutRedux,
};

const UserProfileWithRedux = connect(
  mapStateToProps,
  mapDispatchToProps
)(UserProfile);

export default withStyles(styles)(UserProfileWithRedux);
