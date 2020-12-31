/*eslint-disable*/
import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import Hidden from "@material-ui/core/Hidden";

// core components
import styles from "assets/jss/material-dashboard-react/components/footerStyle.js";

const useStyles = makeStyles(styles);

function footerContent(props) {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div className={classes.left}>
        <List className={classes.list}>
          <ListItem className={classes.inlineBlock}>
            <a href="https://spexdoc.net" className={classes.block}>
              Home
            </a>
          </ListItem>
          <ListItem className={classes.inlineBlock}>
            <a href="https://spexdoc.net/about-us" className={classes.block}>
              Über uns
            </a>
          </ListItem>
        </List>
      </div>
      <p className={classes.right}>
        <span>
          &copy; {1900 + new Date().getYear()}{" "}
          <a href="https://spexdoc.net" target="_blank" className={classes.a}>
            SpexDoc
          </a>
        </span>
      </p>
    </div>
  );
}

export default function Footer(props) {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Hidden mdUp>
        {/* Mobile version */}
        <footer className={classes.mobilefooter}>{footerContent()}</footer>
      </Hidden>

      <Hidden smDown implementation="css">
        {/* Desktop version */}

        <footer className={classes.footer}>{footerContent()}</footer>
      </Hidden>
    </React.Fragment>
  );
}
