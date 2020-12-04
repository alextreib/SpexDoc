import { readDBData, writeDBData } from "components/Internal/DBFunctions.js";

import IconButton from "@material-ui/core/IconButton";
import PropTypes from "prop-types";
import QRCode from "qrcode.react";
import React from "react";
import ShareIcon from "@material-ui/icons/Share";
import { getUserID } from "components/Internal/Checks";
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
  
  componentDidMount()
  {
    this.setState({ link: this.props.link });
  }

  shareLink(){
    return shareLink("Hallo, schau dir das doch mal an: \n", this.state.link);
  }

  render() {
    return (
      <div>
        <QRCode
          value={this.props.link}
          size={200}
          bgColor={"#ffffff"}
          fgColor={"#000000"}
          level={"L"}
          includeMargin={true}
          renderAs={"svg"}
          imageSettings={{
            src:
              "https://spexdoc.net/wp-content/uploads/2020/07/SpexDoc_logo_png.png",
            x: null,
            y: null,
            height: 20,
            width: 20,
            excavate: true,
          }}
        />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <a href={this.state.link}>{this.state.link}</a>
          {/* Oder einfach nur auf den Link klicken */}
          <IconButton style={{ marginLeft: "auto" }} aria-label="share">
            <ShareIcon onClick={this.shareLink()} />
          </IconButton>
        </div>
      </div>
    );
  }
}

QRCodeCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(QRCodeCard);
