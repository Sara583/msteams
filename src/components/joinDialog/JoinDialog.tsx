import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import classes from "./JoinDialog.module.css";
import { ChangeEvent, useState } from "react";
import { useMutation } from "@tanstack/react-query";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "none",
  boxShadow: 24,
  p: 4,
};

const joinGroup = async (data: {
  user: { email: string; username: string };
  order: string;
  groupId: string;
}) => {
  const response = await fetch(
    `https://ms-teams-app-ba042-default-rtdb.firebaseio.com/groups/${data.groupId}/groupUsers.json`,
    {
      method: "POST",
      body: JSON.stringify({ user: data.user, order: data.order }),
    }
  );
};

export default function JoinDialog(props: {
  open: boolean;
  id: string;
  closeJoinDialog: Function;
}) {
  const [order, setOrder] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const closeDialogHandler = () => {
    props.closeJoinDialog();
  };

  const { mutate, isLoading, isError } = useMutation({
    mutationFn: (data: {
      groupId: string;
      user: { email: string; username: string };
      order: string;
    }) => joinGroup(data),
    onSuccess() {
      props.closeJoinDialog();
    },
  });

  const changeOrderHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setOrder(event.target.value);
  };

  const confirmHandler = () => {
    setIsSubmitted(true);
    if (order.length === 0) {
      return;
    }
    // TODO FAKE USER

    const fakeUser = {
      username: "Fake",
      email: "fakeUser@gmail.com",
    };
    mutate({ user: fakeUser, order, groupId: props.id });
  };
  return (
    <>
      <div>
        <Dialog
          PaperProps={{ className: classes.dialog }}
          open={props.open}
          fullWidth
          onClose={closeDialogHandler}
        >
          {isLoading && <h1>Loading...</h1>}
          {!isLoading && (
            <>
              <DialogTitle className={classes.title}>Join Group</DialogTitle>
              <DialogContent className={classes.dialogContent}>
                <TextField
                  error={order.length === 0 && isSubmitted}
                  autoFocus
                  margin="dense"
                  id="order"
                  label="Your Order"
                  type="text"
                  fullWidth
                  onChange={changeOrderHandler}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={confirmHandler} variant="contained">
                  Confirm
                </Button>
              </DialogActions>
            </>
          )}
        </Dialog>
      </div>
    </>
  );
}
