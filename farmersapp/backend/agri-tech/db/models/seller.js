const mongoose = require("mongoose");

const SellerSchema = new mongoose.Schema({
  id: {
    type: Schema.Types.ObjectId
  },
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  type: {
    type: String
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phone: {
    type: Number,
    required: true
  }
});
module.exports = Seller = mongoose.model("seller", SellerSchema);
