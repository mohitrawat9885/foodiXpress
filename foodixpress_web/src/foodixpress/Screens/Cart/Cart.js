import "./Cart.css";

import React, { useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";

import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import LinearProgress from "@material-ui/core/LinearProgress";
import Radio from "@material-ui/core/Radio";

import { useHistory } from "react-router-dom";
import Ripples from "react-ripples";

import GlobalState from "../../GlobalState";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";

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
    "& > *": {
      width: "100%",
      height: "6rem",
    },
  },
}));

function isEmpty(obj) {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) return false;
  }
  return true;
}

function AddAddress(props) {
  const [selectedValue, setSelectedValue] = useState();

  const handleChange = (index) => {
    setSelectedValue(index);
  };

  let history = useHistory();
  const [addresses, setAddresses] = useState([{ address: false }]);
  const [getAddress, setGetAddress] = useState(false);

  const isLogin = () => {
    let session = JSON.parse(localStorage.getItem("session"));
    if (session.token !== "") {
      return true;
    } else {
      return false;
    }
  };

  const getAddresses = async (e) => {
    try {
      const session = JSON.parse(localStorage.getItem("session"));
      const responce = await fetch("/Customer/getAddresses", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `foodi ${session.token}`,
        },
      }).catch((err) => console.log(err));
      const res = JSON.parse(await responce.text());
      if (res.status === "success") {
        setAddresses(res.addresses);
        setGetAddress(true);
        // alert("Gotted");
      } else {
        // alert("Not Gotted");
      }
    } catch (error) {
      console.log(error);
      // alert("Error");
    }
  };

  if (!isLogin()) {
    return (
      <div className="select-addres">
        <Button
          variant="outlined"
          style={{ color: "brown" }}
          onClick={() => {
            window.location.href("/Getin");
          }}
        >
          Please Login !
        </Button>
      </div>
    );
  } else if (isLogin()) {
    if (!getAddress) {
      getAddresses();
      return (
        <>
          <h3>Loading...</h3>
        </>
      );
    } else {
      if (
        addresses[0] === null ||
        addresses[0] === undefined ||
        addresses[0] === ""
      ) {
        return (
          <div className="select-addres">
            <Button
              variant="outlined"
              style={{ color: "brown" }}
              onClick={() => history.push("/Addresses")}
            >
              Add Delivery Address !
            </Button>
          </div>
        );
      } else {
        return (
          <div className="select-addres">
            <span>Delivary Address</span>
            {addresses.map((val, index) => (
              <div className="addres-div" key={index}>
                <Radio
                  checked={selectedValue === index}
                  onChange={() => {
                    props.changeAddress(index);
                    handleChange(index);
                  }}
                  value={index}
                  // name="radio-button-demo"
                  // inputProps={{ "aria-label": "B" }}
                />
                <div className="delivary-address">
                  {/* <br /> */}
                  {/* <span style={{ paddingBottom: "4%" }}>Mohit Rawat</span> */}
                  <div>
                    <p>
                      {val.area} , {val.landmark}
                    </p>
                    <p>
                      {val.city}, {val.state}
                    </p>
                    <p>{val.pincode}</p>
                    <p>{val.number}</p>
                  </div>
                </div>
              </div>
            ))}

            <Button
              variant="outlined"
              style={{ color: "brown" }}
              onClick={() => {
                history.push("/Addresses");
              }}
            >
              Change or Edit Address
            </Button>
          </div>
        );
      }
    }
  }
}

export default function Cart() {
  let history = useHistory();
  let totalprice = 0;

  const [, setCartValue] = useContext(GlobalState);
  const [address, setAddress] = useState("");
  const [load, setLoad] = useState(true);
  const [cartFoods, setCartFoods] = useState([]);

  const changeAddress = (index) => {
    setAddress(index);
  };
  const checkout = async (e) => {
    try {
      if (address === "" || address === null || address === undefined) {
        NotificationManager.error(
          "Select Delivery Address",
          "Delivery Address!",
          5000,
          () => {
            alert("Select Delivery Address!");
          }
        );
        return;
      }
      // console.log(foodId)
      const session = JSON.parse(localStorage.getItem("session"));
      console.log(session.token);
      const responce = await fetch("/Customer/customerCheckout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `foodi ${session.token}`,
        },
        body: JSON.stringify({
          addressIndex: address,
        }),
      }).catch((err) => console.log(err));
      const res = JSON.parse(await responce.text());
      if (res.status === "success") {
        NotificationManager.success(
          "Your Order is Received",
          "Order Received "
        );
        setTimeout(() => {
          getCartFoods();
        }, 1500);
      } else {
        NotificationManager.error(res.message, "Error!");
      }
      console.log(res);
    } catch (error) {
      // setLoad(false);
    }
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

        setCartValue(cartQty);

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

  const changeCartQuantity = async (cartId, quantity) => {
    try {
      // console.log(foodId)
      const session = JSON.parse(localStorage.getItem("session"));
      console.log(session.token);
      const responce = await fetch("/Customer/changeCartQuantity", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `foodi ${session.token}`,
        },
        body: JSON.stringify({
          cartId: cartId,
          quantity: quantity,
        }),
      }).catch((err) => console.log(err));
      const res = JSON.parse(await responce.text());
      if (res.status === "success") {
        getCartFoods();
        // alert(res.message);
      } else {
        alert(res.message);
      }
    } catch (error) {
      // setLoad(false);
    }
  };

  const classes = useStyles();
  // const theme = useTheme();

  // CheckOut function //

  if (load) {
    getCartFoods();
    return (
      <>
        <LinearProgress />
      </>
    );
  }
  if (!load) {
    if (isEmpty(cartFoods)) {
      return (
        <>
          <Ripples
            color="brown"
            during={3000}
            className="empty_cart"
            // onClick={() => history.push("/crafts")}
          >
            <h4>Empty Cart</h4>
          </Ripples>
        </>
      );
    }
    return (
      <>
        <div className="cart-body">
          <div className="cart-div">
            <div className="cart-bag">
              {cartFoods.map((food, index) => (
                <div className="cart-holder" key={index}>
                  <div className={classes.foodImg}>
                    <Paper>
                      <img
                        src={`./assets/images/${food.image}`}
                        alt={food.name}
                      />
                    </Paper>
                  </div>
                  <div className="cart-detail">
                    <div className="craft-name">
                      <span>{food.name}</span>
                    </div>
                    {/* <span className="cart-descrip">{craft.sort_detail}</span> */}
                    <div className="remove-btn">
                      <Button
                        className={classes.removeBtn}
                        startIcon={<DeleteIcon />}
                        variant="outlined"
                        color="primary"
                        onClick={() => changeCartQuantity(food._id, 0)}
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                  <div className="cart-action">
                    <ChangeQuantity
                      quantity={food.quantity}
                      cartId={food._id}
                      getCartFoods={getCartFoods}
                    />
                    <div
                      className="cart-price"
                      style={{ display: "flex", flexDirection: "column" }}
                    >
                      <div style={{ margin: 5 }}>
                        <span>$ {food.price}</span>
                      </div>
                      <div style={{ margin: 2 }}>
                        <span>Total:- </span>
                        <span>$ {food.price * food.quantity}</span>
                      </div>
                    </div>
                  </div>
                  <div style={{ display: "none" }}>
                    {
                      (totalprice =
                        Number(totalprice) +
                        Number(food.price) * Number(food.quantity))
                    }
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-checkout">
              <AddAddress changeAddress={changeAddress} />
              <div className="cout-holder">
                <span className="total-tag">TOTAL</span>
                <div className="sub-total">
                  <span>Sub-Total:-</span>
                  <span>$ {totalprice}</span>
                </div>
                <div className="delivery-price">
                  <span>Delivery:-</span>
                  <span>$ 5.00</span>
                </div>
                <div className="total-price">
                  <span>Grand Total:-</span>
                  <span>$ {totalprice + 5}</span>
                </div>
                <div style={{ display: "none" }}></div>
                <Button
                  className="cout-btn"
                  variant="contained"
                  color="secondary"
                  onClick={() => checkout()}
                >
                  checkout
                </Button>
              </div>
            </div>
          </div>
        </div>
        <NotificationContainer />
      </>
    );
  }
}
