import React from "react";
import "./Restaurants.css";
import { RestaurantDiv2 } from "../Components/RestaurantDiv";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

const Data = require("../../data");

export default function Restaurants() {
  return (
    <>
      <div className="restaurants_div">
        {Data.restaurantList.map((restaurant, index) => (
          <RestaurantDiv2
            key={index}
            backgroundImg={`./assets/images/${restaurant.background}`}
            profileImg={`./assets/images/${restaurant.pic}`}
            restaurantName={restaurant.name}
            restaurantAddress={
              restaurant.address.area +
              " " +
              restaurant.address.city +
              " " +
              restaurant.address.state +
              " " +
              restaurant.address.pinCode
            }
            rating="4"
          />
        ))}
      </div>
    </>
  );
}
