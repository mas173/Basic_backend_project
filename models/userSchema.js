const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "the name field is mandatory"],
    },

    email: {
      type: String,
      required: [true, "the email field is mandatory"],
    },

   password: {
      type: String,
      required: [true, "the password is mandatory"],
    },
  },
  {
    timestamps:true
  }
);

module.exports = mongoose.model("user",userSchema);