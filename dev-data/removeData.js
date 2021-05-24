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

const deleteData = async () => {
  try {
    console.log("Data Deleting...");
    await Restaurants.deleteMany();
    console.log("Data Deleted");
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

deleteData();
