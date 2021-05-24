import React, { useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import ListSubheader from "@material-ui/core/ListSubheader";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import DraftsIcon from "@material-ui/icons/Drafts";
import SendIcon from "@material-ui/icons/Send";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import StarBorder from "@material-ui/icons/StarBorder";
import DeleteIcon from "@material-ui/icons/Delete";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import ChangeQuantity from "../Components/ChangeQuantity/ChangeQuantity";

const useStyles = makeStyles((theme) => ({
  removeBtn: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "red",
    borderColor: "red",
    padding: 5,
  },
  foodImg: {
    display: "flex",
    flexWrap: "wrap",
    // "& > *": {
    //   width: "6rem",
    //   height: "6rem",
    // },
  },
}));

export default function NestedList() {
  const [open, setOpen] = React.useState(true);
  let totalprice = 0;
  const [address, setAddress] = useState("");
  const [load, setLoad] = useState(true);
  const [cartFoods, setCartFoods] = useState([]);
  const classes = useStyles();
  const handleClick = () => {
    setOpen(!open);
  };

  const getCartFoods = async (e) => {
    try {
      const session = JSON.parse(localStorage.getItem("session"));
      const responce = await fetch("/Customer/getCartFoods", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `foodi ${session.token}`,
        },
      }).catch((err) => console.log(err));
      const res = JSON.parse(await responce.text());
      if (res.status === "success") {
        setCartFoods(res.cartFoods);
        let cartQty = 0;
        for (let i in res.cartFoods) {
          cartQty = Number(cartQty) + Number(res.cartFoods[i].quantity);
          // totalprice =
          //   Number(totalPrice) +
          //   Number(res.cartFoods[i].quantity) * Number(res.cartFoods[i].price);
        }
        // setTotalPrice(totalprice);
        totalprice = 0;

        setLoad(false);

        // alert("Gotted");
      } else {
        setLoad(false);
        // alert("Not Gotted");
      }
    } catch (error) {
      setLoad(false);
      console.log(error);
      // alert("Error");
    }
  };

  if (load) {
    getCartFoods();
    return <h1>Loading...</h1>;
  }
  return (
    <List style={{ width: "100%", backgroundColor: "white" }}>
      <ListItem onClick={handleClick}>
        <div
          style={{
            width: "100%",
          }}
        >
          <h1>This are Order</h1>
        </div>
        <br />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <div>
          <div className="cart-holder">
            <div>
              <img
                style={{
                  width: "6rem",
                  height: "6rem",
                  borderRadius: "3rem",
                }}
                src={`./assets/images/f7.jpg`}
                alt="fo"
              />
            </div>
            <div className="cart-detail">
              <div className="craft-name">
                <span>Stauberry</span>
              </div>
              {/* <span className="cart-descrip">{craft.sort_detail}</span> */}
              {/* <div className="remove-btn">
                <Button
                  className={classes.removeBtn}
                  startIcon={<DeleteIcon />}
                  variant="outlined"
                  color="primary"
                >
                  Remove
                </Button>
              </div> */}
            </div>
            <div className="cart-action">
              <span>Quantity:- 7</span>
              <div
                className="cart-price"
                style={{ display: "flex", flexDirection: "column" }}
              >
                <div style={{ margin: 5 }}>
                  <span>$ 2</span>
                </div>
                <div style={{ margin: 2 }}>
                  <span>Total:- </span>
                  <span>$ 89</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Collapse>
    </List>
  );
}
