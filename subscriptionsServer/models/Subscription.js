const mongoose = require("mongoose");

const subscriptionSchema = new mongoose.Schema(
  {
    MemberId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Member",
    },
    Movies: [
      {
        movieId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Movie",
        },
        date: {
          type: Date,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Subscription", subscriptionSchema);
