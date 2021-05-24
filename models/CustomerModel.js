const mongoose = require("mongoose");

const CustomerSchema = new mongoose.Schema({
  firstName: {
    type: String,
    default: "",
  },
  lastName: {
    type: String,
    default: "",
  },
  number: {
    type: Number,
    require: true,
    unique: true,
  },
  email: {
    type: String,
    default: "",
  },
  addresses: [
    {
      number: { type: Number, default: 0 },
      email: { type: String, default: "" },
      country: { type: String, default: "India" },
      state: { type: String, default: "" },
      city: { type: String, default: "" },
      area: { type: String, default: "" },
      pincode: { type: String, default: "" },
      landmark: { type: String, default: "" },
    },
  ],
  cart: [
    {
      foodId: { type: String },
      quantity: { type: String },
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
      orderDate: {
        type: Date,
      },
    },
  ],
  completedOrders: [
    [
      {
        _id: { type: String },
        name: { type: String },
        images: { type: Array },
        price: { type: Number },
        quantity: { type: Number },
        status: { type: String, default: "Completed" },
      },
    ],
  ],
  canceledOrders: [
    [
      {
        _id: { type: String },
        name: { type: String },
        images: { type: Array },
        price: { type: Number },
        quantity: { type: Number },
        status: { type: String, default: "Canceled" },
      },
    ],
  ],
});

const Customers = mongoose.model("Customers", CustomerSchema);

module.exports = Customers;
