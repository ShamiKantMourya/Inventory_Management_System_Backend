const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: ["Electronics", "Stationery", "Food", "Furniture", "Sports"],
      default: "Electronics",
      // required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const Item = mongoose.model("Item", itemSchema);

module.exports = Item;
