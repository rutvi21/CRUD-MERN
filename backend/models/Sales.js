const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let saleSchema = new Schema(
  {
    id: {
      type: Number,
    },
    name: {
      type: String,
    },
    date: {
      type: Date,
    },
    quantity: {
      type: Number,
    },
    price: {
      type: Number,
    },
  },
  {
    collection: "sales",
  }
);

module.exports = mongoose.model("Sales", saleSchema);
