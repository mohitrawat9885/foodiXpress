import React from "react";
import { RestaurantDiv3 } from "../Components/RestaurantDiv";
import { FoodDiv3 } from "../Components/FoodDiv";

const Data = require("../../data");

export default function Restaurant() {
  return (
    <>
      <RestaurantDiv3
        backgroundImg={`./assets/images/b1.jpg`}
        profileImg={`./assets/images/p1.jpg`}
        restaurantName="Restaurant Name"
        restaurantAddress={"Najibabad Uttarpradesh"}
        rating="4"
      />
      {Data.foods.map((food, index) => (
        <FoodDiv3
          key={index}
          foodImg={`./assets/images/${food.images[0]}`}
          foodName={`Paneer Bhurji${food.name}`}
          foodPrice={food.price}
          rating="4"
        />
      ))}
    </>
  );
}
