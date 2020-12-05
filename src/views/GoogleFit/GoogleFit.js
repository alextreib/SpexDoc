import { bugs, server, website } from "variables/general.js";
import { dailySalesChart, emailsSubscriptionChart } from "variables/charts.js";

import { readDBData, writeDBData } from "components/Internal/DBFunctions.js";
import { checkUser, getUserEmail } from "components/Internal/Checks.js";
import { loginRedux, logoutRedux } from "components/Internal/Redux.js";
import { loginUser, logoutUser } from "components/Internal/LoginFunctions.js";

import AccessTime from "@material-ui/icons/AccessTime";
import Accessibility from "@material-ui/icons/Accessibility";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import Assignment from "@material-ui/icons/Assignment";
import BugReport from "@material-ui/icons/BugReport";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import ChartistGraph from "react-chartist";
import Cloud from "@material-ui/icons/Cloud";
import Code from "@material-ui/icons/Code";
import CustomTabs from "components/CustomTabs/CustomTabs.js";
import Danger from "components/Typography/Danger.js";
import DateRange from "@material-ui/icons/DateRange";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Icon from "@material-ui/core/Icon";
import LocalOffer from "@material-ui/icons/LocalOffer";
import React from "react";
import Store from "@material-ui/icons/Store";
import Success from "components/Typography/Success.js";
import TestComp from "components/VisuComps/TestComp.js";
import Table from "components/Table/Table.js";
import Tasks from "components/Tasks/Tasks.js";
import Update from "@material-ui/icons/Update";
import Warning from "@material-ui/icons/Warning";
import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import axios from "axios";
import { withStyles } from "@material-ui/core/styles";
var Chartist = require("chartist");

var delays = 80,
  durations = 500;
var delays2 = 80,
  durations2 = 500;

const useStyles = makeStyles(styles);

// we need to return [{Today}, {Yesterday} .... {7 days back}]
// Each object has : {"Calories" : value, "Heart": value ... , "Date": }
const baseObj = {
  Calories: 0,
  Heart: 0,
  Move: 0,
  Steps: 0,
  Sleep: 0,
  Weight: 0,
  Blood_Pressure: 0,
};

// Blood pressure
const dataValues = [
  {
    title: "Calories",
    type: "com.google.calories.expended",
  },
  {
    title: "Heart",
    type: "com.google.heart_minutes",
  },
  {
    title: "Move",
    type: "com.google.active_minutes",
  },
  {
    title: "Steps",
    type: "com.google.step_count.delta",
  },
  {
    // Not working - why?
    title: "Sleep",
    type: "com.google.sleep.segment",
  },
  {
    title: "Weight",
    type: "com.google.weight",
  },
  {
    title: "Blood_Pressure",
    type: "com.google.blood_pressure",
  },
];

class GoogleFit extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      healthData: [],
      testArray: [],
      // Default data
    };
  }

  getDataPerWeek = (type, healthData) => {
    console.log(healthData);
    console.log(type);
    console.log(healthData[type]);
    var HealthTypeArray = [];
    // Returns array in the form [TypeDay1,TypeDay2,TypeDay3]
    healthData.forEach((element) => {
      HealthTypeArray.push(element[type]);
    });
    console.log(HealthTypeArray);
    return HealthTypeArray;
  };

  getCompleteTask = () => {
    const completedTasksChart = {
      data: {
        labels: ["12am", "3pm", "6pm", "9pm", "12pm", "3am", "6am", "9am"],
        series: [this.state.testArray],
      },
      options: {
        lineSmooth: Chartist.Interpolation.cardinal({
          tension: 0,
        }),
        low: 0,
        high: 10000, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
        chartPadding: {
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
        },
      },
      animation: {
        draw: function (data) {
          if (data.type === "line" || data.type === "area") {
            data.element.animate({
              d: {
                begin: 600,
                dur: 700,
                from: data.path
                  .clone()
                  .scale(1, 0)
                  .translate(0, data.chartRect.height())
                  .stringify(),
                to: data.path.clone().stringify(),
                easing: Chartist.Svg.Easing.easeOutQuint,
              },
            });
          } else if (data.type === "point") {
            data.element.animate({
              opacity: {
                begin: (data.index + 1) * delays,
                dur: durations,
                from: 0,
                to: 1,
                easing: "ease",
              },
            });
          }
        },
      },
    };

    return completedTasksChart;
  };

  // Will trigger update from e.g. Emergency->linkAccess that will be triggered after componentdidmount
  componentDidUpdate(prevProps) {
    if (prevProps == this.props) {
      // No change from above (currently nothing else is needed)
      return;
    } else {
      // this.fetchTable();
    }

    // Why do I need this?
    // this.setState({ showFileParams: this.props.showFileParams });
  }

  componentDidMount() {
    // this.fetchTable();
  }

  // Fetch the table from Firebase (Original data)
  // Is called when table is changed
  fetchTable = () => {
    return readDBData(this.state.name, false).then((doc_data) => {
      if (doc_data == null) return;
      // Cannot get data -> set default data from parent class
      // this.setState({ data: this.props.tableOptions.data });
      else this.setState({ checked: doc_data });
    });
  };

  // Is called when table is changed
  uploadTable = async () => {
    return await writeDBData(this.state.name, this.state.checked);
  };

  // Provide request headers to be attached with each function call
  getRequestHeaders = (accessToken) => {
    const requestHeaderBody = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/json",
      },
    };
    return requestHeaderBody;
  };

  getAggregatedDataBody = (dataType, endTime) => {
    console.log(endTime);
    const requestBody = {
      aggregateBy: [
        {
          dataTypeName: dataType,
        },
      ],
      bucketByTime: {
        durationMillis: 86400000,
      },
      endTimeMillis: endTime,
      startTimeMillis: endTime - 7 * 86400000,
    };
    return requestBody;
  };

  getDataFunc = async (access_token) => {
    var endTime = new Date().getTime();

    let state = [];
    let promises = [];
    for (var i = 6; i >= 0; i--) {
      var currTime = new Date(endTime - i * 86400000);
      state.push({
        ...baseObj,
        Date: currTime,
      });
    }
    dataValues.forEach((element) => {
      let body = this.getAggregatedDataBody(element.type, endTime);
      promises.push(
        axios
          .post(
            "https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate",
            body,
            this.getRequestHeaders(access_token)
          )
          .then((resp) => {
            // now, each data bucket represents exactly one day
            for (let idx = 0; idx < 7; idx++) {
              resp.data.bucket[idx].dataset[0].point.forEach((point) => {
                point.value.forEach((val) => {
                  let extract = val["intVal"] || Math.ceil(val["fpVal"]) || 0;
                  state[idx][element.title] += extract;
                });
              });
            }
          })
      );
    });
    // promises to call callback
    console.log(state);
    this.setState({ healthData: state });
    return state;
  };

  getStepsCount = () => {
    // get access_token
    var access_token = this.props.access_token;

    // read data through api
    this.getDataFunc(access_token);
  };

  handleChange = (event) => {
    console.log(this.state);
    this.setState({ checked: event.target.checked }, () => {
      this.uploadTable();
    });
  };

  fetchData = () => {
    // UserProfile
    console.log(navigator);
    console.log(navigator.share);
    if (navigator.share) {
      navigator
        .share({
          title: "Title ",
          text: `Check out this`,
          url: document.location.href,
        })
        .then(() => {
          console.log("Successfully shared");
        })
        .catch((error) => {
          console.error("Something went wrong sharing the blog", error);
        });
    }
  };
  askUserPermission = async () => {
    // console.log(this.props);
    // return await Notification.requestPermission();
    this.getStepsCount();
  };

  testFunc = () => {
    var steps = this.getDataPerWeek("Steps", this.state.healthData);
    console.log(steps);
    this.setState({ testArray: steps });
  };
  render() {
    const { classes } = this.props;

    return (
      <div>
        <GridContainer>
          <Button onClick={this.askUserPermission}>Load Data</Button>
          <Button onClick={this.testFunc}>TestFunc</Button>
          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="warning" stats icon>
                <CardIcon color="warning">
                  <Icon>content_copy</Icon>
                </CardIcon>
                <p className={classes.cardCategory}>Befunde</p>
                <h3 className={classes.cardTitle}>50</h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  <Assignment>
                    <Warning />
                  </Assignment>
                  Archiviert
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="success" stats icon>
                <CardIcon color="success">
                  <Store />
                </CardIcon>
                <p className={classes.cardCategory}>Krankenkassenkosten</p>
                <h3 className={classes.cardTitle}>Undefiniert</h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  <DateRange />
                  Letzte 12 Monate
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="danger" stats icon>
                <CardIcon color="danger">
                  <Icon>info_outline</Icon>
                </CardIcon>
                <p className={classes.cardCategory}>Notfalldaten</p>
                <h3 className={classes.cardTitle}>10</h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  <LocalOffer />
                  Nur für Notärzte verfügbar
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="info" stats icon>
                <CardIcon color="info">
                  <Accessibility />
                </CardIcon>
                <p className={classes.cardCategory}>Freigaben</p>
                <h3 className={classes.cardTitle}>15 aktiv</h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  <Update />
                  In the letzten 6 Monaten
                </div>
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>
        <GridContainer>
          <GridItem xs={12} sm={12} md={4}>
            <Card chart>
              <CardHeader color="success">
                <ChartistGraph
                  className="ct-chart"
                  data={dailySalesChart.data}
                  type="Line"
                  options={dailySalesChart.options}
                  listener={dailySalesChart.animation}
                />
              </CardHeader>
              <CardBody>
                <h4 className={classes.cardTitle}>Tägliche Bewegung</h4>
                <p className={classes.cardCategory}>
                  <span className={classes.successText}>
                    <ArrowUpward className={classes.upArrowCardCategory} /> 55%
                  </span>{" "}
                  Steigerung in dieser Woche.
                </p>
              </CardBody>
              <CardFooter chart>
                <div className={classes.stats}>
                  <AccessTime /> vor 4 Minuten aktualisiert
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <Card chart>
              <CardHeader color="warning">
                <ChartistGraph
                  className="ct-chart"
                  data={emailsSubscriptionChart.data}
                  type="Bar"
                  options={emailsSubscriptionChart.options}
                  responsiveOptions={emailsSubscriptionChart.responsiveOptions}
                  listener={emailsSubscriptionChart.animation}
                />
              </CardHeader>
              <CardBody>
                <h4 className={classes.cardTitle}>Cholesterin Werte</h4>
                <p className={classes.cardCategory}>Erbliche Veranlagung</p>
              </CardBody>
              <CardFooter chart>
                <div className={classes.stats}>
                  <AccessTime /> Kampagne vor 1,5 Jahren gestartet
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <Card chart>
              <CardHeader color="danger">
                <ChartistGraph
                  className="ct-chart"
                  data={this.getCompleteTask().data}
                  type="Line"
                  options={this.getCompleteTask().options}
                  listener={this.getCompleteTask().animation}
                />
              </CardHeader>
              <CardBody>
                <h4 className={classes.cardTitle}>Blutdruck</h4>
                <p className={classes.cardCategory}>Hypotonie Gefahr</p>
              </CardBody>
              <CardFooter chart>
                <div className={classes.stats}>
                  <AccessTime /> Kampagne vor 2 Tagen gestartet
                </div>
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>
        <GridContainer>
          <GridItem xs={12} sm={12} md={6}>
            <CustomTabs
              title="Tasks:"
              headerColor="primary"
              tabs={[
                {
                  tabName: "Bugs",
                  tabIcon: BugReport,
                  tabContent: (
                    <Tasks
                      checkedIndexes={[0, 3]}
                      tasksIndexes={[0, 1, 2, 3]}
                      tasks={bugs}
                    />
                  ),
                },
                {
                  tabName: "Website",
                  tabIcon: Code,
                  tabContent: (
                    <Tasks
                      checkedIndexes={[0]}
                      tasksIndexes={[0, 1]}
                      tasks={website}
                    />
                  ),
                },
                {
                  tabName: "Server",
                  tabIcon: Cloud,
                  tabContent: (
                    <Tasks
                      checkedIndexes={[1]}
                      tasksIndexes={[0, 1, 2]}
                      tasks={server}
                    />
                  ),
                },
              ]}
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={6}>
            <Card>
              <CardHeader color="info">
                {/* 5 letzte Benachrichtigungen hinschreiben, auch wenn gelesen? */}
                <h4 className={classes.cardTitleWhite}>Neuste Aktivitäten</h4>
                <p className={classes.cardCategoryWhite}></p>
              </CardHeader>
              <CardBody>
                <Table
                  tableHeaderColor="info"
                  tableHead={["Verantwortlich", "Benachrichtigung"]}
                  tableData={[
                    ["Patient", "Online Visite vereinbaren"],
                    ["Arzt Dr. Schieber", "Medikation prüfen"],
                  ]}
                />
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  loginState: state.loginState,
  access_token: state.access_token,
});

const mapDispatchToProps = {
  loginRedux,
  logoutRedux,
};

const GoogleFitWithRedux = connect(
  mapStateToProps,
  mapDispatchToProps
)(GoogleFit);

export default withStyles(styles)(GoogleFitWithRedux);
