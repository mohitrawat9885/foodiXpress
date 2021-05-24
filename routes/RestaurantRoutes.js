const express = require("express");
const { route } = require("../app");
const RestaurantFunctions = require("../Functions/RestaurantFunctions");
const Functions = require("../functions/Functions");
const router = express.Router();

router.route("/signInToStore").post(RestaurantFunctions.signInToStore);

router
  .route("/updateProfile")
  .patch(Functions.checkToken, RestaurantFunctions.updateProfile);
router
  .route("/createFoodCategory")
  .post(Functions.checkToken, RestaurantFunctions.createFoodCategory);

router
  .route("/editFoodCategory")
  .patch(Functions.checkToken, RestaurantFunctions.editFoodCategory);
router
  .route("/editFood")
  .patch(Functions.checkToken, RestaurantFunctions.editFood);

router
  .route("/removeFood")
  .delete(Functions.checkToken, RestaurantFunctions.removeFood);

router
  .route("/removeFoodCategory")
  .delete(Functions.checkToken, RestaurantFunctions.removeFoodCategory);

router
  .route("/createNewFood")
  .post(Functions.checkToken, RestaurantFunctions.createNewFood);

router.route("/getMenu/:id").get(RestaurantFunctions.getMenu);
router.route("/getProfile/:id").get(RestaurantFunctions.getProfile);
router.route("/getGallery/:id").get(RestaurantFunctions.getGallery);

router
  .route("/addGalleryImage")
  .post(Functions.checkToken, RestaurantFunctions.addGalleryImage);
router
  .route("/removeGalleryImage")
  .post(Functions.checkToken, RestaurantFunctions.removeGalleryImage);
router.route("/uploadImage").post(Functions.checkToken, Functions.uploadImage);

router
  .route("/getNewOrders")
  .post(Functions.checkToken, RestaurantFunctions.getNewOrders);
router
  .route("/getCanceledOrders")
  .post(Functions.checkToken, RestaurantFunctions.getCanceledOrders);

router
  .route("/getDeliveredOrders")
  .post(Functions.checkToken, RestaurantFunctions.getDeliveredOrders);

router
  .route("/getAllOrders")
  .post(Functions.checkToken, RestaurantFunctions.getAllOrders);
router
  .route("/setOrderStatus")
  .post(Functions.checkToken, RestaurantFunctions.setOrderStatus);

router
  .route("/changeActivityStatus")
  .post(Functions.checkToken, RestaurantFunctions.changeActivityStatus);

module.exports = router;
