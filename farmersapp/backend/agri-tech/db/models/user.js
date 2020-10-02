const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
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
module.exports = User = mongoose.model("user", UserSchema);
