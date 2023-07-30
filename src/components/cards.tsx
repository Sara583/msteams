import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import classes from "../App.module.css";
import { motion } from "framer-motion";
import TimelapseIcon from "@mui/icons-material/Timelapse";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";

export default function Cards(props: {
  restaurantName: string;
  logo: string;
  time: Date;
  users: number;
  groupId: string;
  setGroupId: Function;
  openJoinGroupDialog: Function;
}) {
  const joinHandler = () => {
    props.openJoinGroupDialog();
    props.setGroupId(props.groupId);
  };

  const date = new Date(props.time);
  const hours = date.getHours();
  const minutes = date.getMinutes();

  return (
    <motion.div
      initial={{ opacity: 0.3, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Card sx={{ maxWidth: 250, minWidth: 250 }} className={classes.card}>
        <CardActionArea>
          <motion.div
            whileHover={{ scale: 1.1, opacity: 0.4 }}
            whileTap={{ scale: 0.9 }}
          >
            <CardMedia
              component="img"
              height="250"
              image={
                props.logo?.includes("https")
                  ? props.logo
                  : "https://foodal.com/wp-content/uploads/2022/08/Sprouts-Avocado-and-Cheddar-Sandwiches-Recipe.jpg"
              }
              alt="resturant"
            />
          </motion.div>
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              className={classes.name}
            >
              {props.restaurantName}
            </Typography>
            <div className={classes.cardBottom}>
              <div className={classes.cardBottom}>
                <TimelapseIcon className={classes.icon} />
                <Typography variant="body2" color="text.secondary">
                  {(hours % 12 || 12).toString() + ":" + minutes.toString()}
                </Typography>
              </div>
              <div className={classes.cardBottom}>
                <PeopleAltIcon className={classes.icon} />
                <Typography variant="body2" color="text.secondary">
                  {props.users}
                </Typography>
              </div>
            </div>
          </CardContent>
        </CardActionArea>
        <CardActions className={classes.cardBottom}>
          <Button
            className={classes.btn}
            onClick={joinHandler}
            disabled={date < new Date()}
          >
            {date < new Date() ? "Closed" : "Join"}
          </Button>

          <Typography variant="body2" color="text.secondary"></Typography>
        </CardActions>
      </Card>{" "}
    </motion.div>
  );
}
