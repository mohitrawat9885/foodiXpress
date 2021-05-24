const fs = require("fs");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Restaurants = require("../models/RestaurantModel");

const DB = "mongodb://localhost:27017/foodixpress";

mongoose
  .connect(DB, {
    useCreateIndex: true,
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then((con) => {
    // console.log(con.connection)
    console.log("Database Connected");
  })
  .catch((err) => console.log("Error Connecting Database"));

const RestaurantsData = JSON.parse(
  fs.readFileSync(`${__dirname}/Restaurants.json`)
);

const importData = async () => {
  try {
    console.log("Data Loading...");
    await Restaurants.create(RestaurantsData);
    console.log("Data Loaded");
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

importData();
