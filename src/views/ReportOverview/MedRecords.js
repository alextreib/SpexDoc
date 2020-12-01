import React from "react";
// @material-ui/core components
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";

import ShowFileList from "components/VisuComps/ShowFileList.js";



import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

// import FileBrowser from "react-keyed-file-browser";



const styles = {
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
  fab: {
    margin: 0,
    top: "auto",
    right: 20,
    bottom: 20,
    left: "auto",
    position: "fixed",
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
  ref: "https://google.de",
};

class MedRecords extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidUpdate(prevProps) {
    console.log("update MedRecords")
  }

  render() {
    const { classes } = this.props;
    return (
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Hochgeladene Befunde</h4>
              <p className={classes.cardCategoryWhite}>
                Verwalte und teile deine Befunde
              </p>
            </CardHeader>
            <CardBody>
                <ShowFileList/>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    );
  }
}

MedRecords.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MedRecords);
