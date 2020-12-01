import IconButton from "@material-ui/core/IconButton";
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
import Avatar from "@material-ui/core/Avatar";
import { red } from "@material-ui/core/colors";

import NotificationCard from "views/Notifications/NotificationCard.js";

import clsx from "clsx";
import CardMedia from "@material-ui/core/CardMedia";
import Collapse from "@material-ui/core/Collapse";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";

import CloseIcon from "@material-ui/icons/Close";
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
  avatar: {
    backgroundColor: red[500],
  },
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
});

class Notifications extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      profileActive: null,
      openNotification: null,
      openProfile: null,
      expanded: false,
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
      <div>
        {/* Grid */}
        <NotificationData
          onNotificationDataChange={this.notificationDataChange}
        />
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Benachrichtigungen</h4>
            <p className={classes.cardCategoryWhite}>
              Sehen Sie hier was Dich neues erwartet
            </p>
          </CardHeader>
          <CardBody>
            <GridContainer>
              {this.state.notificationList.map((noficiation) => (
                <GridItem xs={12} sm={6} md={4}>
                  <NotificationCard />
                </GridItem>
              ))}
            </GridContainer>
          </CardBody>
        </Card>
      </div>
    );
  }
}

Notifications.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Notifications);
