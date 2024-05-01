const mongoose = require("mongoose");

const saleSchema = new mongoose.Schema(
  {
    description: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Item",
    },
    quantity: {
      type: Number,
      default: 1,
    },
    price: {
      type: Number,
      required: true,
    },
    item: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

const Sale = mongoose.model("Sale", saleSchema);

module.exports = Sale;
