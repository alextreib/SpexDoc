import IconButton from "@material-ui/core/IconButton";
import PropTypes from "prop-types";
import QRCodeComp from "components/VisuComps/QRCodeComp.js";
import React from "react";
import ReactToPrint from "react-to-print";
import ShareIcon from "@material-ui/icons/Share";
import { shareLink } from "components/Internal/Sharing";
import { withStyles } from "@material-ui/core/styles";

const styles = (theme) => ({
  card: {
    maxWidth: 345,
    marginBottom: 100,
    paddingBottom: theme.spacing(1),
  },
  media: {
    height: 140,
  },
  dialogtitle: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

class QRCodeCard extends React.Component {
  constructor(props) {
    super(props);

    // Integrate script
    this.state = {
      link: "test",
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props == prevProps) {
      return;
    }
  }

  componentDidMount() {
    this.setState({ link: this.props.link });
  }

  shareLink = () => {
    return shareLink("Hallo, schau dir das doch mal an: \n", this.state.link);
  };

  render() {
    return (
      <div>
        <ReactToPrint
          trigger={() => <a href="#">Hier ausdrucken</a>}
          content={() => this.componentRef}
        />
        <div>
          <QRCodeComp ref={(el) => (this.componentRef = el)} {...this.props} />
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <a href="#" onClick={this.shareLink}>
              {this.state.link}
            </a>
            {/* Oder einfach nur auf den Link klicken */}
            <IconButton
              onClick={this.shareLink}
              style={{ marginLeft: "auto" }}
              aria-label="share"
            >
              <ShareIcon />
            </IconButton>
          </div>
        </div>
      </div>
    );
  }
}

QRCodeCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(QRCodeCard);
