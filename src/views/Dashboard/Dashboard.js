import { checkUser, getUserEmail } from "components/Internal/Checks.js";
import { readDBData, writeDBData } from "components/Internal/DBFunctions.js";

import Accessibility from "@material-ui/icons/Accessibility";
import Assignment from "@material-ui/icons/Assignment";
import Button from "@material-ui/core/Button";
import Card from "components/Card/Card.js";
import CardFooter from "components/Card/CardFooter.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CommonComps from "components/Internal/CommonComps.js";
import { CommonCompsData } from "components/Internal/DefaultData.js";
import DateRange from "@material-ui/icons/DateRange";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Icon from "@material-ui/core/Icon";
import LocalOffer from "@material-ui/icons/LocalOffer";
import React from "react";
import SmartDocIcon from "@material-ui/icons/TabletMac";
import Store from "@material-ui/icons/Store";
import Update from "@material-ui/icons/Update";
import VisuComp from "components/Internal/VisuComp.js";
import Warning from "@material-ui/icons/Warning";
import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(styles);
class Dashboard extends VisuComp {
  constructor(props) {
    super(props);

    this.state = {
      // List of additional rendered components (several concurrently)
      commonProps: { ...CommonCompsData, updateComp: this.updateComp },
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
      this.updateComp();
    }
  }

  // Required from CommonProps
  updateComp = async () => {
    var fetchArray = [
      "UserProfile",
      "Vaccination",
      "EmergencyPredisposition",
      "EmergencyMedication",
      "EmergencyContacts",
      "OrganDonation",
      "Share",
      "medRecords",
    ];
    fetchArray.forEach(async (fetchElement) => {
      this.fetchTable(fetchElement);
    });
    this.calculateProperties();
  };

  // Required from CommonProps
  calculateProperties = async () => {
    await this.timeout(750); // todo: remove hotfix, waiting for fetching data, no callback possible
    // EmergencyDataCount
    var emergencyCount = this.count([
      this.state.EmergencyPredisposition,
      this.state.EmergencyMedication,
      this.state.EmergencyContacts,
    ]);
    this.setState({
      emergencyDataCount: emergencyCount,
    });

    // Sharing
    var SharingActive = 0;
    if (this.state.Share != null) {
      if (this.state.Share.emergency.Switchactive == true) SharingActive += 1;
      if (this.state.Share.medRecords.Switchactive == true) SharingActive += 1;
    }
    this.setState({
      sharingDataCount: SharingActive,
    });
  };

  count = (arrayElements) => {
    var count = 0;
    arrayElements.forEach((arrayElement) => {
      if (arrayElement != null) {
        count += arrayElement.length;
      }
    });
    return count;
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <CommonComps commonProps={this.state.commonProps} />
        <Typography variant="h3">
          Hallo{" "}
          {this.state.UserProfile ? this.state.UserProfile.firstName : null}{" "}
          {this.state.UserProfile ? this.state.UserProfile.lastName : null}
        </Typography>
        <GridContainer>
          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="warning" stats icon>
                <CardIcon color="warning">
                  <Icon>content_copy</Icon>
                </CardIcon>
                <p className={classes.cardCategory}>Befunde</p>
                <h3 className={classes.cardTitle}>
                  {this.state.medRecords ? this.state.medRecords.length : 0}
                </h3>
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
                <p className={classes.cardCategory}>Krankenkasse</p>
                <h3 className={classes.cardTitle}>
                  {" "}
                  {this.state.UserProfile
                    ? this.state.UserProfile.insurance
                    : ""}
                </h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  <DateRange />
                  Noch nicht verknüpft
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
                <h3 className={classes.cardTitle}>
                  {this.state.emergencyDataCount}
                </h3>
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
                <h3 className={classes.cardTitle}>
                  {this.state.sharingDataCount} aktiv
                </h3>
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
                <h3 className={classes.cardTitle}>
                  {this.state.Vaccination ? this.state.Vaccination.length : 0}{" "}
                  aktiv
                </h3>
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
                  Analysiert
                </div>
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

export default withStyles(styles)(Dashboard);
