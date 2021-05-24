const mongoose = require("mongoose");

const RestaurantSchema = new mongoose.Schema({
  verified: { type: Boolean, default: false },
  active: { type: Boolean, default: false },
  registerNumber: {
    type: Number,
    require: true,
    unique: true,
  },
  registerEmail: {
    type: String,
    default: "",
  },
  profile: {
    name: { type: String, default: "" },
    pic: { type: String, default: "pic.png" },
    background: { type: String, default: "background.jpg" },

    address: {
      number: { type: Array, default: [] },
      email: { type: Array, default: [] },
      country: { type: String, default: "" },
      state: { type: String, default: "" },
      city: { type: String, default: "" },
      area: { type: String, default: "" },
      pinCode: { type: String, default: "" },
      landMark: { type: String, default: "" },
    },
  },
  gallery: [
    {
      type: Object,
    },
  ],
  foodCategorys: [
    {
      name: { type: String },
      image: { type: String },
    },
  ],
  foods: [
    {
      categoryId: { type: String },
      name: { type: String },
      images: { type: Array },
      price: { type: Number },
      description: { type: String },
    },
  ],
  newOrders: [
    {
      foods: [
        {
          name: { type: String },
          image: { type: String },
          price: { type: Number },
          quantity: { type: Number },
          status: { type: String, default: "Ordered" },
        },
      ],
      customer: {
        name: { type: String },
        number: { type: Number },
        address: { type: Object },
      },
      orderDate: {
        type: Date,
      },
      status: { type: String, default: "Ordered" },
    },
  ],
  completedOrders: [
    {
      foods: [
        {
          name: { type: String },
          image: { type: String },
          price: { type: Number },
          quantity: { type: Number },
          status: { type: String, default: "Ordered" },
        },
      ],
      customer: {
        name: { type: String },
        number: { type: Number },
        address: { type: Object },
      },
      orderDate: {
        type: Date,
      },
      status: { type: String, default: "Completed" },
    },
  ],
  canceledOrders: [
    {
      foods: [
        {
          name: { type: String },
          image: { type: String },
          price: { type: Number },
          quantity: { type: Number },
          status: { type: String, default: "Ordered" },
        },
      ],
      customer: {
        name: { type: String },
        number: { type: Number },
        address: { type: Object },
      },
      orderDate: {
        type: Date,
      },
      status: { type: String, default: "Canceled" },
    },
  ],
});

const Restaurant = mongoose.model("Restaurants", RestaurantSchema);

module.exports = Restaurant;
// menu: [
//   {
//     category: {
//       name: { type: String },
//       image: { type: String },
//     },
//     food: [
//       {
//         name: { type: String },
//         images: { type: Array },
//         price: { type: Number },
//         description: { type: String },
//       },
//     ],
//   },
// ],
