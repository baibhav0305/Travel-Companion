const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
    },
    email: {
      type: String,
      required: [true, "Please add an email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please add a password"],
    },
    bio: {
      type: String,
      required: [true, "Please add a bio"],
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("USER", userSchema);

module.exports = User;
