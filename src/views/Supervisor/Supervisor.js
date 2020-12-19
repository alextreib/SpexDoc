import {
  labKeyToNameMapping,
  labKeyToNameUnit,
  limits,
} from "views/SmartDoc/SmartDoc_Data.js";

import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import CardHeader from "components/Card/CardHeader.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import PlainTable from "components/EditableTableReport/PlainTable.js";
import PropTypes from "prop-types";
import React from "react";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";

import VisuComp from "components/Internal/VisuComp.js";
import { checkUser } from "components/Internal/Checks.js";
import { withStyles } from "@material-ui/core/styles";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

import {
  writeRequest,
  writeNotification,
  getRequests,
} from "components/Internal/DBFunctions.js";
import { CommonCompsData } from "components/Internal/DefaultData.js";
import CommonComps from "components/Internal/CommonComps.js";

const styles = (theme) => ({
  margin: {
    margin: "0",
  },
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
  submitButton: {
    marginRight: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
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

class Supervisor extends VisuComp {
  constructor(props) {
    super(props);

    this.state = {
      selectedRequest: "",
      answerMessage: "",
      commonProps: { ...CommonCompsData, updateComp: this.updateComp },
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProps) {
    if (prevProps == this.props) {
      // No change from above (currently nothing else is needed)
      return;
    } else {
      // this.TableFetch("Requests");
      this.fetchData();

      // Only required for visu, not loading
      this.setState({
        commonProps: { ...this.state.commonProps, loginState: checkUser() },
      });
    }
  }

  fetchData = async () => {
    // Loading UserProfile
    this.TableFetch("UserProfile");

    // Request Loading
    var result = await getRequests();

    this.setState({
      Requests: result,
    });
  };

  // Required from CommonProps
  updateComp = () => {};

  SupervisorName = () => {
    if (this.state.UserProfile != null) {
      return (
        //todo fix data bug
        this.state.UserProfile.firstName +
        " " +
        this.state.UserProfile.lastName
      );
    } else {
      return "";
    }
  };

  submitAnswer = () => {
    // write to Requests of user
    var recipient_uid = this.getRequestData().user_id;
    // Get UserProfile
    writeNotification(
      this.state.answerMessage,
      this.SupervisorName(),
      recipient_uid
    );

    // todo: overwrite request with answered true

    this.setState({
      answerMessage: "",
    });

    this.displayPopUp("Danke, Frage beantwortet.");
  };

  getRequestData = () => {
    var returnData = "";
    this.state.Requests.forEach((request) => {
      if (request.id == this.state.selectedRequest) {
        returnData = request.data;
      }
    });
    return returnData;
  };

  testfunc = () => {
    console.log(this.state);
  };

  render() {
    const { classes } = this.props;

    return (
      <div>
        <CommonComps commonProps={this.state.commonProps} />
        <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="warning">
                <h4 className={classes.cardTitleWhite}>Befund schreiben</h4>

                <p className={classes.cardCategoryWhite}>
                  Legen Sie direkt einen Befund an.
                </p>
              </CardHeader>
              <CardBody>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    {this.state.Requests ? (
                      <div>
                        <FormControl className={classes.formControl}>
                          <Select
                            value={this.state.selectedUser}
                            onChange={(ev) =>
                              this.handlePropertyChange("selectedUser", ev)
                            }
                          >
                            {this.state.Requests.map((request) => (
                              <MenuItem value={request.id}>
                                {request.id}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                        <br />
                        <Typography variant="body1">
                          User:
                          {this.getRequestData().message}
                        </Typography>
                        <br />
                        {this.getRequestData().answered ? (
                          <Typography variant="body1">
                            UserName:
                            {this.getRequestData().answered.toString()}
                          </Typography>
                        ) : null}
                        <br />
                      </div>
                    ) : null}

                    <br />
                    <Typography variant="body1">
                      Sie antworten als {this.SupervisorName()}
                    </Typography>
                    <br />

                    <TextField
                      id="outlined-multiline-static"
                      label="Deine Antwort"
                      multiline
                      fullWidth="true"
                      rows={8}
                      defaultValue="Default Value"
                      variant="outlined"
                      inputProps={{
                        value: this.state.answerMessage,
                        onChange: (ev) =>
                          this.handlePropertyChange("answerMessage", ev),
                      }}
                    />
                  </GridItem>
                </GridContainer>
              </CardBody>
              <CardFooter>
                <Button
                  className={classes.submitButton}
                  color="primary"
                  onClick={this.submitAnswer}
                >
                  Absenden
                </Button>
              </CardFooter>
            </Card>
        </GridItem>
        
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="warning">
                <h4 className={classes.cardTitleWhite}>Patientenfragen</h4>

                <p className={classes.cardCategoryWhite}>
                  Beantworten Sie dem Patienten die Frage. Die Daten werden
                  vertraulich übermittelt.
                </p>
              </CardHeader>
              <CardBody>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    {this.state.Requests ? (
                      <div>
                        <FormControl className={classes.formControl}>
                          <Select
                            value={this.state.selectedRequest}
                            onChange={(ev) =>
                              this.handlePropertyChange("selectedRequest", ev)
                            }
                          >
                            {this.state.Requests.map((request) => (
                              <MenuItem value={request.id}>
                                {request.id}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                        <br />
                        <Typography variant="body1">
                          Message:
                          {this.getRequestData().message}
                        </Typography>
                        <br />
                        {this.getRequestData().answered ? (
                          <Typography variant="body1">
                            Answered:
                            {this.getRequestData().answered.toString()}
                          </Typography>
                        ) : null}
                        <br />
                        <Typography variant="body1">
                          User_id:
                          {this.getRequestData().user_id}
                        </Typography>
                        <br />
                      </div>
                    ) : null}

                    <br />
                    <Typography variant="body1">
                      Sie antworten als {this.SupervisorName()}
                    </Typography>
                    <br />

                    <TextField
                      id="outlined-multiline-static"
                      label="Deine Antwort"
                      multiline
                      fullWidth="true"
                      rows={8}
                      defaultValue="Default Value"
                      variant="outlined"
                      inputProps={{
                        value: this.state.answerMessage,
                        onChange: (ev) =>
                          this.handlePropertyChange("answerMessage", ev),
                      }}
                    />
                  </GridItem>
                </GridContainer>
              </CardBody>
              <CardFooter>
                <Button
                  className={classes.submitButton}
                  color="primary"
                  onClick={this.submitAnswer}
                >
                  Absenden
                </Button>
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

Supervisor.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Supervisor);
