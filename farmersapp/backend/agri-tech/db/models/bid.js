const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema({
  id: {
    type: mongoose.Types.ObjectId
  },
  seller_name:{
    type:String,
    required:true
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  image_url: {
    type: String
  },
  price: {
    type: Number
  },
  fixed_price: {
    type: Number
  },
  quantity: {
    type: Number
  },
  curr_bidprice: {
    type: Number
  },
  curr_highestBidderusername: {
    type: String,
    required: true
  },
  total_bids: {
    type: Number,
    required: true
  },
  sold_flag: {
    type: Number,
    default: 0,
  },
  latest_bid_time: {
    type: Date,
  },
  timer_start: {
    type: Date,
    required: false
  },
  timer_end: {
    type: Date,
    required: false
  }

});
module.exports = Item = mongoose.model("item", ItemSchema);
