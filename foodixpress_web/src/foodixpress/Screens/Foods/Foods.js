import React from "react";
import { FoodDiv2 } from "../Components/FoodDiv";
import FoodDiv from "../Components/FoodDiv";
import AddToCart from "../Components/AddToCart/AddToCart";
const Data = require("../../data");

export default function SingleFood() {
  return (
    <>
      {/* <div className="food_div"> */}
      {Data.foods.map((food, index) => (
        <div key={index}>
          <FoodDiv2
            foodImg={`./assets/images/${food.images[0]}`}
            foodName={`${food.name}`}
            foodPrice={food.price}
            rating="4"
          />
        </div>
      ))}
      {/* </div> */}
    </>
  );
}
