const { promisify } = require("util");
const jwt = require("jsonwebtoken");

// const { createCollection } = require("../Models/RestaurantModel");
const Restaurant = require("../Models/RestaurantModel");

const isEmpty = (obj) => {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) return false;
  }
  return true;
};

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.signInToStore = async (req, res) => {
  try {
    const restaurant = await Restaurant.find({
      registerNumber: req.body.number,
    });
    if (isEmpty(restaurant)) {
      const newStore = await Restaurant.create({
        registerNumber: req.body.number,
      });

      const token = signToken(newStore._id);

      res.status(201).json({
        status: "success",
        message: "New Store Created",
        storeId: newStore._id,
        token,
      });
    } else if (!isEmpty(restaurant)) {
      const token = signToken(restaurant[0]._id);
      res.status(201).json({
        status: "success",
        message: "Restaurant found",
        storeId: restaurant[0]._id,
        token,
      });
    }
  } catch (err) {
    res.status(400).json({
      status: "Error",
      message: "Internel Server Error",
      error: err,
    });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const newProfile = {
      name: req.body.name,
      pic: req.body.pic,
      background: req.body.background,

      address: {
        number: req.body.address.number,
        email: req.body.address.email,
        country: req.body.address.country,
        state: req.body.address.state,
        city: req.body.address.city,
        area: req.body.address.area,
        pinCode: req.body.address.pinCode,
        landMark: req.body.address.landMark,
      },
    };

    const updateProfile = await Restaurant.findOneAndUpdate(
      { _id: req.body.id },
      { profile: newProfile },
      {
        new: true,
      }
    );
    res.status(200).json({
      status: "success",
      message: "Store Profile Updated",
      profile: updateProfile.profile,
    });
  } catch (err) {
    res.status(400).json({
      status: "Error",
      message: "Internel Server Error",
      error: err,
    });
  }
};

exports.changeActivityStatus = async (req, res) => {
  try {
    if (req.body.activity) {
      await Restaurant.findOneAndUpdate(
        { _id: req.body.id },
        {
          $set: {
            active: true,
          },
        }
      );
      res.status(200).json({
        status: "opened",
        message: "Restaurant Opened",
      });
    } else if (!req.body.activity) {
      await Restaurant.findOneAndUpdate(
        { _id: req.body.id },
        {
          $set: {
            active: false,
          },
        }
      );
      res.status(200).json({
        status: "closed",
        message: "Restaurant Closed",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: "Error",
      message: "Internel Server Error",
      error: err,
    });
  }
};

exports.createFoodCategory = async (req, res) => {
  try {
    console.log("Create Category....");
    const newCategory = await Restaurant.findOneAndUpdate(
      { _id: req.body.id },
      {
        $push: {
          foodCategorys: {
            name: req.body.category.name,
            image: req.body.category.image,
          },
        },
      },
      {
        new: true,
      }
    );
    res.status(200).json({
      status: "success",
      message: "New Category Created",
      category: newCategory,
    });
  } catch (err) {
    res.status(400).json({
      status: "Error",
      message: "Internel Server Error",
      error: err,
    });
  }
};

exports.addGalleryImage = async (req, res) => {
  try {
    const newGallery = await Restaurant.findOneAndUpdate(
      { _id: req.body.id },
      {
        $push: {
          gallery: req.body.image,
        },
      },
      {
        new: true,
      }
    );
    res.status(200).json({
      status: "success",
      message: "New Category Created",
      gallery: newGallery.gallery,
    });
  } catch (err) {
    res.status(400).json({
      status: "Error",
      message: "Internel Server Error",
      error: err,
    });
  }
};

exports.removeGalleryImage = async (req, res) => {
  try {
    const newGallery = await Restaurant.findOneAndUpdate(
      { _id: req.body.id },
      {
        $pull: {
          gallery: req.body.image,
        },
      },
      {
        new: true,
      }
    );
    res.status(200).json({
      status: "success",
      message: "New Category Created",
      gallery: newGallery.gallery,
    });
  } catch (err) {
    res.status(400).json({
      status: "Error",
      message: "Internel Server Error",
      error: err,
    });
  }
};

exports.editFoodCategory = async (req, res) => {
  try {
    console.log("Data ", req.body);
    const newCategory = await Restaurant.findOneAndUpdate(
      { "foodCategorys._id": req.body.categoryId },
      {
        $set: {
          "foodCategorys.$.name": req.body.category.name,
          "foodCategorys.$.image": req.body.category.image,
        },
      },
      {
        new: true,
      }
    );
    console.log(newCategory);
    res.status(200).json({
      status: "success",
      message: "Category saved",
      category: newCategory,
    });
  } catch (err) {
    res.status(400).json({
      status: "Error",
      message: "Internel Server Error",
      error: err,
    });
  }
};

exports.removeFoodCategory = async (req, res) => {
  try {
    // console.log("Data ", req.body);
    const newCategory = await Restaurant.findOneAndUpdate(
      { _id: req.body.id },
      {
        $pull: {
          foodCategorys: {
            _id: req.body.categoryId,
          },
        },
      },
      {
        new: true,
      }
    );
    // console.log(newCategory);
    res.status(200).json({
      status: "success",
      message: "Category saved",
      // category: newCategory,
    });
  } catch (err) {
    res.status(400).json({
      status: "Error",
      message: "Internel Server Error",
      error: err,
    });
  }
};

// exports.createNewFood = async (req, res) => {
//   try {
//     // console.log("New food..");
//     // console.log(req.body);
//     const newFood = await Restaurant.findOneAndUpdate(
//       { "menu._id": req.body.categoryId },
//       {
//         $push: {
//           "menu.$.food": {
//             // categoryId: req.body.category,
//             name: req.body.food.name,
//             images: [req.body.food.images],
//             price: req.body.food.price,
//             description: req.body.food.description,
//           },
//         },
//       },
//       {
//         new: true,
//       }
//     );
//     res.status(200).json({
//       status: "success",
//       message: "New Food Created",
//       food: newFood,
//     });
//   } catch (err) {
//     res.status(400).json({
//       status: "error",
//       message: "Internel Server Error",
//       error: err,
//     });
//   }
// };

exports.createNewFood = async (req, res) => {
  try {
    // console.log("New food..");
    // console.log(req.body);
    const newFood = await Restaurant.findOneAndUpdate(
      { _id: req.body.id },
      {
        $push: {
          foods: {
            categoryId: req.body.food.categoryId,
            name: req.body.food.name,
            images: [req.body.food.image],
            price: req.body.food.price,
            description: req.body.food.description,
          },
        },
      },
      {
        new: true,
      }
    );
    res.status(200).json({
      status: "success",
      message: "New Food Created",
      // food: newFood,
    });
  } catch (err) {
    res.status(400).json({
      status: "error",
      message: "Internel Server Error",
      error: err,
    });
  }
};

exports.editFood = async (req, res) => {
  try {
    console.log(req.body);
    const newFood = await Restaurant.findOneAndUpdate(
      { "foods._id": req.body.foodId },
      {
        $set: {
          "foods.$.categoryId": req.body.food.categoryId,
          "foods.$.name": req.body.food.name,
          "foods.$.images": [req.body.food.images],
          "foods.$.price": req.body.food.price,
          "foods.$.description": req.body.food.description,
        },
      },
      {
        new: true,
      }
    );
    console.log(newFood);
    res.status(200).json({
      status: "success",
      message: "Food saved",
      // food: newFood,
    });
  } catch (err) {
    res.status(400).json({
      status: "Error",
      message: "Internel Server Error",
      error: err,
    });
  }
};

exports.removeFood = async (req, res) => {
  try {
    const newFood = await Restaurant.findOneAndUpdate(
      { _id: req.body.id },
      {
        $pull: {
          foods: {
            _id: req.body.foodId,
          },
        },
      },
      {
        new: true,
      }
    );
    // console.log(newFood.foods);
    res.status(200).json({
      status: "success",
      message: "Food Removed",
      // food: newFood,
    });
  } catch (err) {
    res.status(400).json({
      status: "Error",
      message: "Internel Server Error",
      error: err,
    });
  }
};

exports.getMenu = async (req, res) => {
  try {
    // console.log("Menu....");
    const restaurant = await Restaurant.find({ _id: req.params.id });

    // console.log(restaurant[0].menu);
    res.status(200).json({
      status: "success",
      message: "Reataurant Menu",
      menu: {
        foodCategorys: restaurant[0].foodCategorys,
        foods: restaurant[0].foods,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "Error",
      message: "Internel Server Error",
      error: err,
    });
  }
};

exports.getProfile = async (req, res) => {
  try {
    var restaurant = await Restaurant.findOne({ _id: req.params.id });

    if (
      restaurant.registerEmail === "" ||
      restaurant.registerEmail === null ||
      restaurant.registerEmail === undefined
    ) {
      restaurant.registerEmail = "Email not Registered";
    }
    res.status(200).json({
      status: "success",
      message: "Reataurant Profile",
      profile: restaurant.profile,
      registerNumber: restaurant.registerNumber,
      registerEmail: restaurant.registerEmail,
      verified: restaurant.verified,
      active: restaurant.active,
    });
  } catch (err) {
    res.status(400).json({
      status: "Error",
      message: "Internel Server Error",
      error: err,
    });
  }
};

exports.getGallery = async (req, res) => {
  try {
    const restaurant = await Restaurant.find({ _id: req.params.id });
    res.status(200).json({
      status: "success",
      message: "Reataurant Gallery",
      gallery: restaurant[0].gallery,
    });
  } catch (err) {
    res.status(400).json({
      status: "Error",
      message: "Internel Server Error",
      error: err,
    });
  }
};

exports.getNewOrders = async (req, res) => {
  try {
    const restaurant = await Restaurant.findOne({ _id: req.body.id });
    // console.log(restaurant.newOrders);
    res.status(200).json({
      status: "success",
      message: "New Orders",
      newOrders: restaurant.newOrders,
    });
  } catch (err) {
    res.status(400).json({
      status: "Error",
      message: "Internel Server Error",
      error: err,
    });
  }
};

exports.getCanceledOrders = async (req, res) => {
  try {
    const restaurant = await Restaurant.findOne({ _id: req.body.id });
    // console.log(restaurant.newOrders);
    res.status(200).json({
      status: "success",
      message: "Canceled Orders",
      canceledOrders: restaurant.canceledOrders,
    });
  } catch (err) {
    res.status(400).json({
      status: "Error",
      message: "Internel Server Error",
      error: err,
    });
  }
};

exports.getDeliveredOrders = async (req, res) => {
  try {
    const restaurant = await Restaurant.findOne({ _id: req.body.id });
    // console.log(restaurant.newOrders);
    res.status(200).json({
      status: "success",
      message: "Canceled Orders",
      canceledOrders: restaurant.completedOrders,
    });
  } catch (err) {
    res.status(400).json({
      status: "Error",
      message: "Internel Server Error",
      error: err,
    });
  }
};
exports.getAllOrders = async (req, res) => {
  try {
    const restaurant = await Restaurant.findOne({ _id: req.body.id });
    let allOrders = restaurant.newOrders;

    for (let i in restaurant.completedOrders) {
      allOrders.push(restaurant.completedOrders[i]);
    }
    for (let i in restaurant.canceledOrders) {
      allOrders.push(restaurant.canceledOrders[i]);
    }
    res.status(200).json({
      status: "success",
      message: "All Orders",
      allOrders: allOrders,
    });
  } catch (err) {
    res.status(400).json({
      status: "Error",
      message: "Internel Server Error",
      error: err,
    });
  }
};

exports.setOrderStatus = async (req, res) => {
  try {
    // console.log("Status...", req.body);
    let status;
    if (req.body.action === "Processing") {
      status = "Processing";
    } else if (req.body.action === "Un Process") {
      status = "Ordered";
    } else if (req.body.action === "Cancel") {
      status = "Canceled";
    }
    // console.log(status);
    if (req.body.action === "Processing" || req.body.action === "Un Process") {
      await Restaurant.findOneAndUpdate(
        { "newOrders._id": req.body.orderId },
        {
          $set: {
            "newOrders.$.status": status,
          },
        },
        {
          new: true,
        }
      );
    } else if (req.body.action === "Cancel") {
      const restaurant = await Restaurant.findOne({ _id: req.body.id });
      let newOrders = restaurant.newOrders;

      let cancelOrder;
      for (let i in newOrders) {
        if (newOrders[i]._id == req.body.orderId) {
          cancelOrder = newOrders[i];
          cancelOrder.status = "Canceled";
        }
      }

      await Restaurant.findOneAndUpdate(
        { "newOrders._id": req.body.orderId },
        {
          $pull: {
            newOrders: {
              _id: req.body.orderId,
            },
          },
        }
      );

      await Restaurant.findOneAndUpdate(
        { _id: req.body.id },
        {
          $push: {
            canceledOrders: cancelOrder,
          },
        }
      );
    }

    res.status(200).json({
      status: "success",
      message: "Status Updated",
      // food: newFood,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: "Error",
      message: "Internel Server Error",
      error: err,
    });
  }
};
