import React from "react";
import "./Home.css";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
// import { Carousel } from "react-responsive-carousel";\
import Carousel from "react-multi-carousel";
import RestaurantDiv from "../Components/RestaurantDiv";
import LinearProgress from "@material-ui/core/LinearProgress";
import FoodDiv from "../Components/FoodDiv";
import "react-multi-carousel/lib/styles.css";

const Data = require("../../data");

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 4,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

export default function Home() {
  const [loading, setLoading] = React.useState(true);
  const [foods, setFoods] = React.useState([]);
  const getFoods = async (e) => {
    try {
      const responce = await fetch("/Customer/getFoods").catch((err) =>
        console.log(err)
      );
      const res = JSON.parse(await responce.text());
      if (res.status === "success") {
        setFoods(res.foods.foods);
        // console.log("Food List", res);
        setLoading(false);
      } else {
        console.log("Error .......");
        setLoading(false);
      }
    } catch (err) {
      // alert(err);
      console.log("Error", err);
      setLoading(false);
      console.log("Server Error");
    }
  };
  if (loading) {
    getFoods();
    return (
      <>
        <LinearProgress />
      </>
    );
  }
  return (
    <div className="home_div">
      <div className="popular_restaurants_tag">
        <div>
          <p>Popular Brands</p>
          <span>
            Top Restaurants, cafes, pubs, and bars in Karela based on trends
          </span>
        </div>
      </div>
      <br />

      <Carousel
        responsive={responsive}
        showStatus={false}
        autoPlay={false}
        infiniteLoop={true}
      >
        {Data.restaurantList.map((restaurant, index) => (
          <RestaurantDiv
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
      </Carousel>

      <div className="popular_food_tag">
        <div>
          <p>Top Foods</p>
          <span>
            Top Foods from Top Reviews of Restaurants, cafes, pubs, and bars in
            Karela based on trends
          </span>
        </div>
      </div>
      <br />

      <div className="food_div">
        {foods.map((food, index) => (
          <FoodDiv
            key={index}
            foodImg={`./assets/images/${food.images[0]}`}
            foodName={`${food.name}`}
            foodPrice={food.price}
            foodId={food._id}
            rating="4"
          />
        ))}
      </div>
    </div>
  );
}
