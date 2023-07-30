import Cards from "./cards";
import GetData from "../fetch-functions/getData";
import classes from "../App.module.css";
import { motion } from "framer-motion";
const DisplayCards = (props: {
  openJoinGroupDialog: React.MouseEventHandler;
  setGroupId: Function;
}) => {
  const dataArr = GetData();
  console.log(dataArr);
  return (
    <div className={classes.cardsContainer}>
      <div className={classes.cards}>
        {dataArr.map((item) => {
          return (
            <motion.div
              initial={{ opacity: 0.3, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
            >
              <Cards
                key={item.id}
                setGroupId={props.setGroupId}
                groupId={item.id}
                openJoinGroupDialog={props.openJoinGroupDialog}
                restaurantName={item.restaurantName}
                logo={item.restaurantLogo}
                time={item.time}
                users={item.groupUsers.length}
              />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default DisplayCards;
