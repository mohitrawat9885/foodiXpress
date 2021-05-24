const { promisify } = require("util");
const jwt = require("jsonwebtoken");

const Customer = require("../models/CustomerModel");
const Restaurant = require("../Models/RestaurantModel");
const { nextTick } = require("process");

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

exports.Getin = async (req, res) => {
  try {
    req.body.number = String(req.body.number).replace(/[^0-9]/g, "");

    const customer = await Customer.findOne({
      number: req.body.number,
    });
    // console.log("Customer ", customer);
    if (customer === null || customer === undefined || customer === "") {
      const newCustomer = await Customer.create({
        number: req.body.number,
      });
      const token = signToken(newCustomer._id);
      res.status(201).json({
        status: "success",
        action: "signup",
        message: "New Account Created",
        token,
      });
    } else {
      const token = signToken(customer._id);
      res.status(201).json({
        status: "success",
        action: "signin",
        message: "Login Successfully",
        firstName: customer.firstName,
        lastName: customer.lastName,
        token,
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

exports.signupUpdate = async (req, res) => {
  try {
    const updatedCustomer = await Customer.findOneAndUpdate(
      { _id: req.body.id },
      {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
      },
      {
        new: true,
      }
    );

    res.status(200).json({
      status: "success",
      message: "Detail Updated",
      firstName: updatedCustomer.firstName,
      lastName: updatedCustomer.lastName,
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

// exports.signup = async (req, res) => {
//   req.body.number = String(req.body.number).replace(/[^0-9]/g, "");
//   console.log(req.body);
//   try {
//     const customer = await Customer.find({
//       number: req.body.number,
//     });
//     if (isEmpty(customer)) {
//       const newCustomer = await Customer.create({
//         firstName: req.body.firstName,
//         lastName: req.body.lastName,
//         number: req.body.number,
//         email: req.body.email,
//         password: req.body.password,
//       });

//       const token = signToken(newCustomer[0]._id);

//       res.status(201).json({
//         status: "success",
//         message: "New Account Created",
//         token,
//       });
//     } else if (!isEmpty(customer)) {
//       res.status(201).json({
//         status: "already",
//         message: "Account Already Present",
//       });
//     }
//   } catch (err) {
//     console.log(err);
//     res.status(400).json({
//       status: "Error",
//       message: "Internel Server Error",
//       error: err,
//     });
//   }
// };

// exports.signin = async (req, res) => {
//   req.body.id = String(req.body.id).replace(/[^0-9]/g, "");
//   console.log(req.body);
//   try {
//     const customer = await Customer.find({
//       number: req.body.id,
//       password: req.body.password,
//     });

//     if (!isEmpty(customer)) {
//       // console.log(customer)
//       // console.log(customer._id)
//       const token = signToken(customer[0]._id);

//       res.status(201).json({
//         status: "success",
//         message: "Successfully Signin",
//         token,
//       });
//     } else if (isEmpty(customer)) {
//       res.status(201).json({
//         status: "error",
//         message: "No User Found",
//       });
//     }
//   } catch (err) {
//     console.log(err);
//     res.status(400).json({
//       status: "Error",
//       message: "Internel Server Error",
//       error: err,
//     });
//   }
// };

exports.getFoods = async (req, res) => {
  try {
    const restaurant = await Restaurant.find({});

    // console.log(restaurant[0].foods);
    let foods = restaurant[0].foods;
    for (let i in restaurant[1].foods) {
      foods.push(restaurant[1].foods[i]);
    }
    // foods.pushAll(restaurant[1].foods);
    // console.log(restaurant[1].foods);
    res.status(200).json({
      status: "success",
      message: "Reataurant Menu",
      foods: {
        foods: foods,
      },
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

exports.addToCart = async (req, res) => {
  try {
    const cart = (await Customer.find({ _id: req.body.id }))[0].cart;

    for (let i in cart) {
      let food_id = cart[i].foodId;

      if (food_id === req.body.foodId) {
        let qty = cart[i].quantity;
        await Customer.findOneAndUpdate(
          { "cart._id": cart[i]._id },
          {
            $set: {
              "cart.$.quantity": Number(qty) + 1,
            },
          },
          {
            new: true,
          }
        );
        res.status(200).json({
          status: "success",
          message: "Added to Cart",
        });
        return;
      }
    }
    await Customer.findOneAndUpdate(
      { _id: req.body.id },
      {
        $push: {
          cart: { foodId: req.body.foodId, quantity: req.body.quantity },
        },
      },
      {
        new: true,
      }
    );
    res.status(200).json({
      status: "success",
      message: "Added to Cart",
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

exports.changeCartQuantity = async (req, res) => {
  try {
    // console.log(req.body);
    let newQuantity;
    if (req.body.quantity >= 1) {
      newQuantity = req.body.quantity;
    } else if (req.body.quantity == 0) {
      newQuantity = 0;
    }

    let newCart;

    if (newQuantity >= 1) {
      newCart = await Customer.findOneAndUpdate(
        { "cart._id": req.body.cartId },
        {
          $set: {
            "cart.$.quantity": newQuantity,
          },
        },
        {
          new: true,
        }
      );
    } else if (newQuantity == 0) {
      // console.log(newQuantity);
      newCart = await Customer.findOneAndUpdate(
        { _id: req.body.id },
        {
          $pull: {
            cart: {
              _id: req.body.cartId,
            },
          },
        },
        {
          new: true,
        }
      );
      // console.log(newCart);
    }
    // console.log(newCart);

    res.status(200).json({
      status: "success",
      message: "Cart Quantity Changed",
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

exports.getCartFoods = async (req, res) => {
  try {
    let tempFood = {
      name: "",
      craft_qty: 0,
      price: 0,
      image: "",
    };
    let cartFoods = [];
    const cart = (await Customer.findOne({ _id: req.body.id })).cart;

    for (let i in cart) {
      let cart_food = cart[i].foodId;
      let food = (await Restaurant.findOne({ "foods._id": cart[i].foodId }))
        .foods;
      for (let j in food) {
        let restaurant_food = food[j]._id;
        if (cart_food == restaurant_food) {
          tempFood = {
            _id: cart[i]._id,
            name: food[j].name,
            quantity: cart[i].quantity,
            price: food[j].price,
            image: food[j].images[0],
          };
        }
      }
      cartFoods[i] = tempFood;
    }
    // console.log(cartFoods);

    res.status(200).json({
      status: "success",
      message: "Added to Cart",
      cartFoods: cartFoods,
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

exports.customerCheckout = async (req, res) => {
  try {
    let orderDate = new Date();
    let tempFood = {
      name: "",
      craft_qty: 0,
      price: 0,
      image: "",
    };
    let restaurantOrders = {};
    let cartFoods = [];
    const customerData = await Customer.findOne({ _id: req.body.id });
    const customer = {
      name: customerData.firstName + " " + customerData.lastName,
      number: customerData.number,
      address: customerData.addresses[req.body.addressIndex],
    };
    const cart = customerData.cart;
    for (let i in cart) {
      let cart_food = cart[i].foodId;
      // console.log(cart[i]);
      let restaurant = await Restaurant.findOne({
        "foods._id": cart[i].foodId,
      });
      let resId = restaurant._id;
      let food = restaurant.foods;
      for (let j in food) {
        let restaurant_food = food[j]._id;
        if (cart_food == restaurant_food) {
          tempFood = {
            name: food[j].name,
            image: food[j].images[0],
            price: food[j].price,
            quantity: cart[i].quantity,
            status: "Ordered",
          };
        }
      }
      if (restaurantOrders[resId] == null || restaurantOrders[resId] === "") {
        restaurantOrders[resId] = [tempFood];
      } else {
        restaurantOrders[resId].push(tempFood);
      }
      cartFoods[i] = tempFood;
    }

    let newOrder = {};

    for (let i in restaurantOrders) {
      let food = restaurantOrders[i];

      newOrder = {
        foods: food,
        customer: customer,
        orderDate: orderDate,
      };

      await Restaurant.findOneAndUpdate(
        { _id: i },
        {
          $push: {
            newOrders: newOrder,
          },
        }
      );

      io.sockets.in(global.channels[i]).emit("message", "Grand New Order");
    }
    // console.log(cartFoods);
    await Customer.findOneAndUpdate(
      { _id: req.body.id },
      {
        $pullAll: { cart },
        $push: {
          newOrders: {
            foods: cartFoods,
            orderDate: orderDate,
          },
        },
      }
    );

    res.status(200).json({
      status: "success",
      message: "Checkout Successfully",
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

exports.addAddress = async (req, res) => {
  try {
    const newAddress = {
      number: req.body.number,
      state: req.body.state,
      city: req.body.city,
      area: req.body.area,
      pincode: req.body.pincode,
      landmark: req.body.landmark,
    };

    if (req.body.action === "edit") {
      await Customer.findOneAndUpdate(
        { "addresses._id": req.body.editId },
        {
          $set: {
            "addresses.$.number": req.body.number,
            "addresses.$.state": req.body.state,
            "addresses.$.city": req.body.city,
            "addresses.$.area": req.body.area,
            "addresses.$.pincode": req.body.pincode,
            "addresses.$.landmark": req.body.landmark,
          },
        },
        {
          new: true,
        }
      );
      res.status(200).json({
        status: "success",
        message: "Address Saved",
      });
    } else if (req.body.action === "add") {
      await Customer.findOneAndUpdate(
        { _id: req.body.id },
        {
          $push: {
            addresses: newAddress,
          },
        },
        {
          new: true,
        }
      );
      res.status(200).json({
        status: "success",
        message: "New Address Added",
      });
    } else if (req.body.action === "remove") {
      await Customer.findOneAndUpdate(
        { _id: req.body.id },
        {
          $pull: {
            addresses: {
              _id: req.body.editId,
            },
          },
        },
        {
          new: true,
        }
      );
      res.status(200).json({
        status: "success",
        message: "Address Removed",
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

exports.getAddresses = async (req, res) => {
  try {
    const customerData = await Customer.findOne({ _id: req.body.id });

    res.status(200).json({
      status: "success",
      message: "Customer Addresses",
      addresses: customerData.addresses,
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

exports.trigSocket = async (req, res, next) => {
  console.log("Triging Socket...");
  // res.send("Triging Socket...");
  res.send("Trigring..");
  io.sockets
    .in(global.channels["60967cfaf26ab626cc77221d"])
    .emit("message", "New Order");
  // io.sockets.emit("message", "This is Global");
};
