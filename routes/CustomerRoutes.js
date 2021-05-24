const express = require("express");
const { route } = require("../app");
const CustomerFunctions = require("../Functions/CustomerFunctions");
const Functions = require("../functions/Functions");
const router = express.Router();

// router.route("/signup").post(CustomerFunctions.signup);
// router.route("/signin").post(CustomerFunctions.signin);
router.route("/Getin").post(CustomerFunctions.Getin);
router.route("/getFoods").get(CustomerFunctions.getFoods);
router
  .route("/getCartFoods")
  .get(Functions.checkToken, CustomerFunctions.getCartFoods);
router
  .route("/signupUpdate")
  .patch(Functions.checkToken, CustomerFunctions.signupUpdate);
router
  .route("/addToCart")
  .post(Functions.checkToken, CustomerFunctions.addToCart);
router
  .route("/changeCartQuantity")
  .post(Functions.checkToken, CustomerFunctions.changeCartQuantity);

router
  .route("/customerCheckout")
  .post(Functions.checkToken, CustomerFunctions.customerCheckout);

router
  .route("/addAddress")
  .post(Functions.checkToken, CustomerFunctions.addAddress);
router
  .route("/getAddresses")
  .get(Functions.checkToken, CustomerFunctions.getAddresses);

router.route("/trigSocket").get(CustomerFunctions.trigSocket);
module.exports = router;
