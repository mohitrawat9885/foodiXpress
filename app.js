const express = require("express");
const http = require("http");
const path = require("path");
const restaurantRoutes = require("./Routes/RestaurantRoutes");
const customerRoutes = require("./Routes/CustomerRoutes");
const app = express();
const server = http.createServer(app);
const cors = require("cors");

global.io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.use(cors());
require("./Communication/Communication");

app.use(express.static(path.join(__dirname, "foodixpress_web/build")));
app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "foodixpress_web/build/", "index.html"));
  res.end();
});

app.use("/Restaurant", restaurantRoutes);
app.use("/Customer", customerRoutes);

module.exports = server;
