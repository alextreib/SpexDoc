import { bugs, server, website } from "variables/general.js";
import {
  completedTasksChart,
  dailySalesChart,
  emailsSubscriptionChart,
} from "variables/charts.js";

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
import Table from "components/Table/Table.js";
import Tasks from "components/Tasks/Tasks.js";
import Update from "@material-ui/icons/Update";
import SmartDocIcon from "@material-ui/icons/TabletMac";

import Warning from "@material-ui/icons/Warning";
import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(styles);

export default function Dashboard() {
  const fetchData = () => {
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

  
  const askUserPermission = async () => {
    return await Notification.requestPermission();
  };

  const classes = useStyles();
  return (
    <div>
      <GridContainer>
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
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="info" stats icon>
              <CardIcon color="info">
                <Accessibility />
                {/* Syringe Icon */}
              </CardIcon>
              <p className={classes.cardCategory}>Impfungen</p>
              <h3 className={classes.cardTitle}>15 aktiv</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <Update />
                Insgesamt
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="warning" stats icon>
              <CardIcon color="warning">
                <SmartDocIcon />
              </CardIcon>
              <p className={classes.cardCategory}>Nutzung Smart Doc</p>
              <h3 className={classes.cardTitle}>3</h3>
            </CardHeader>
            <CardFooter stats>
            <div className={classes.stats}>
                <Assignment>
                  <Warning />
                </Assignment>
                Analysiertv 
              </div>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
      
    </div>
  );
}
