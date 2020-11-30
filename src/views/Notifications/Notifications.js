/*eslint-disable*/
import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import AddAlert from "@material-ui/icons/AddAlert";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Button from "components/CustomButtons/Button.js";
import SnackbarContent from "components/Snackbar/SnackbarContent.js";
import Snackbar from "components/Snackbar/Snackbar.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Grid from "@material-ui/core/Grid";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";

import { withStyles } from "@material-ui/core/styles";

import NotificationData from "components/NotificationData/NotificationData.js";

const styles = (theme) => ({
  card: {
    maxWidth: 345,
    marginBottom: 100,
    paddingBottom: theme.spacing(1),
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

class Notifications extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      profileActive: null,
      openNotification: null,
      openProfile: null,
      notificationList: [
        "Dermatologie möchte Termin vereinbaren",
        "Hausarzt beantragt eine Freigabe",
      ],
    };

    this.notificationDataChange = this.notificationDataChange.bind(this);
  }

  // When child (NotificationData) triggers change -> this function is called
  notificationDataChange = (newList) => {
    this.setState({
      notificationList: newList,
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <Card>
        <NotificationData
          onNotificationDataChange={this.notificationDataChange}
        />
        <CardHeader color="primary">
          <h4 className={classes.cardTitleWhite}>Benachrichtigungen</h4>
          <p className={classes.cardCategoryWhite}>
            Sehen Sie hier was Dich neues erwartet
          </p>
        </CardHeader>
        <CardBody>
          <Grid container>
            {this.state.notificationList.map((noficiation) => (
              <Grid key={noficiation} item md={6}>
                <Card className={classes.card}>
                  <CardContent>
                    <Typography
                      className={classes.title}
                      color="textSecondary"
                      gutterBottom
                    >
                      Neue Benachrichtigung
                    </Typography>
                    <Typography variant="h5" component="h2">
                      {noficiation}
                    </Typography>
                    <Typography className={classes.pos} color="textSecondary">
                      21.20.2020
                    </Typography>
                    <Typography variant="body2" component="p">
                      Stuttgart
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      onClick={this.magicFunc}
                      style={{ marginLeft: "auto" }}
                    >
                      Gelesen
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </CardBody>
      </Card>
    );
  }
}

Notifications.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Notifications);
