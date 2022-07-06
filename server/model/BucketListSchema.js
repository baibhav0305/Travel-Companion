const mongoose = require("mongoose");

const bucketListSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    place: {
      type: String,
      required: [true, "Please enter some destination"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("BucketList", bucketListSchema);
