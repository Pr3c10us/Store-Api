const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Must have a name"],
  },
  price: {
    type: Number,
    required: [true, "Must have a price"],
  },
  company: {
    type: String,
    enum: {
      values: ["ikea", "marcos", "liddy", "caressa"],
      message: `{VALUE} not supported`,
    },
  },
  featured: {
    type: Boolean,
    default: false,
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const products = mongoose.model("products", schema);

module.exports = products;
