const mongoose = require("mongoose");

const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const server = require("./app");

const DB = process.env.DATABASE_LOCAL;

mongoose
  .connect(DB, {
    useCreateIndex: true,
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then((con) => {
    console.log("Database connected successfully..😀😀");
  })
  .catch((err) => {
    console.log("😌 Database Error 🎃");
    console.log(err);
  });

const PORT = process.env.PORT || 8000;

server.listen(PORT, () => {
  console.log(`😎😎Server started at port ${PORT}`);
});
