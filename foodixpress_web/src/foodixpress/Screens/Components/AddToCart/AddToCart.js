import React, { useContext } from "react";

import "./AddToCart.css";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import { green } from "@material-ui/core/colors";
import Button from "@material-ui/core/Button";
import GlobalState from "../../../GlobalState";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    width: "100%",
  },
  wrapper: {
    width: "100%",
    margin: theme.spacing(1),
    position: "relative",
  },
  buttonSuccess: {
    // width: "100%",
    backgroundColor: green[500],
    "&:hover": {
      // width: "100%",
      backgroundColor: green[700],
    },
  },
  buttonProgress: {
    // width: "100%",
    color: green[500],
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
}));

export default function AddToCart(props) {
  // const foodId = props.foodId;
  const [cartValue, setCartValue] = useContext(GlobalState);
  const classes = useStyles();
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);

  const addToCart = async (e) => {
    try {
      // console.log(foodId)
      const session = JSON.parse(localStorage.getItem("session"));
      console.log(session.token);
      const responce = await fetch("/Customer/addToCart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `foodi ${session.token}`,
        },
        body: JSON.stringify({
          foodId: props.foodId,
          quantity: 1,
        }),
      }).catch((err) => console.log(err));
      const res = JSON.parse(await responce.text());
      if (res.status === "success") {
        setCartValue(cartValue + 1);
        setSuccess(true);
        setLoading(false);
      } else {
        setSuccess(false);
        setLoading(false);
      }
      console.log(res);
    } catch (error) {
      setSuccess(false);
      setLoading(false);
      // setLoad(false);
    }
  };

  const buttonClassname = clsx({
    [classes.buttonSuccess]: success,
  });

  const handleAddToCart = async () => {
    if (!loading) {
      setSuccess(false);
      setLoading(true);
      await addToCart();
    }
  };

  return (
    <div className={classes.root}>
      <div className={classes.wrapper}>
        <Button
          style={{ width: "100%" }}
          variant="contained"
          color="secondary"
          className={buttonClassname}
          disabled={loading}
          onClick={handleAddToCart}
        >
          Add To Cart
        </Button>
        {loading && (
          <CircularProgress size={24} className={classes.buttonProgress} />
        )}
      </div>
    </div>
  );
}
