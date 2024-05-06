const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  email: {
    type: String,
    require: [true, "Required email address"],
    unique: true
  },
  password: {
    type: String,
    require: [true, "Required password field"],
    minLength: 8
  }
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
