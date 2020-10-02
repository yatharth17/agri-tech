const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  id: {
    type: Schema.Types.ObjectId
  },
  buyer_id: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  },
  item_id: {
    type: Schema.Types.ObjectId,
    ref: 'item',
  },
  order_status: {
    type: String,
    required: true
  },
  delivery_status: {
    type: String,
    required: true
  },
  refund_status: {
    type: String,
    required: true
  },
  replacement_status: {
    type: String,
    required: true
  },
  locality: {
    type: String,
    required: true
  },
  area: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  }
});
module.exports = Order = mongoose.model("orders", OrderSchema);
