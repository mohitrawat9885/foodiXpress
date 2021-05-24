import React from "react";
import "../AddToCart/AddToCart.css";
import "./ChangeQuantity.css";

export default function AddToCart(props) {
  // const foodId = props.foodId;

  const changeCartQuantity = async (quantity) => {
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
          cartId: props.cartId,
          quantity: quantity,
        }),
      }).catch((err) => console.log(err));
      const res = JSON.parse(await responce.text());
      if (res.status === "success") {
        props.getCartFoods();
        // alert(res.message);
      } else {
        alert(res.message);
      }
      console.log(res);
    } catch (error) {
      // setLoad(false);
    }
  };

  return (
    <>
      <div className="qty-change-btn">
        <button
          className="qty-btn1"
          onClick={() => {
            changeCartQuantity(props.quantity - 1);
          }}
        >
          -
        </button>
        <div className="qty-number">
          <span>{props.quantity}</span>
        </div>
        <button
          className="qty-btn2"
          onClick={() => {
            changeCartQuantity(Number(props.quantity) + 1);
          }}
        >
          +
        </button>
      </div>
    </>
  );
}
