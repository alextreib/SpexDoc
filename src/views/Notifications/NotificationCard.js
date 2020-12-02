import { grey, red } from "@material-ui/core/colors";

import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import CloseIcon from "@material-ui/icons/Close";
import FavoriteIcon from "@material-ui/icons/Favorite";
import IconButton from "@material-ui/core/IconButton";
import React from "react";
import ShareIcon from "@material-ui/icons/Share";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  root: {
    // minWidth: 275,
    marginBottom:25 ,
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
  },
  favorite: {
    marginLeft: "auto",
  },
  share: {
    marginLeft: "auto",
    // transition: theme.transitions.create("transform", {
    //   duration: theme.transitions.duration.shortest,
    // }),
  },

  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function NotificationCard(props) {
  const classes = useStyles();
  const [favoriteActive, setFav] = React.useState(false);

  const handleCloseClick = () => {
    props.destroyCard();
  };

  const handleFavoriteClick = () => {
    setFav(!favoriteActive);
  };

  return (
  <Card className={classes.root} >
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            W
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <CloseIcon onClick={handleCloseClick} />
          </IconButton>
        }
        title="Neuer Befund"
        subheader="September 14, 2016"
      >
        Test
      </CardHeader>
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          Dr. Wilder hat einen neuen Befund für sie abgelegt.
        </Typography>
      </CardContent>
      <CardActions  disableSpacing>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <IconButton
          className={classes.favorite     }
          onClick={handleFavoriteClick}
          aria-label="show more"
        >
          <FavoriteIcon style={{ color: favoriteActive ? (red[500]) : (grey[600])  }}/>
        </IconButton>
      </CardActions>
    </Card>
  );
}
