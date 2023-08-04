const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema(
  {
    Name: {
      type: String,
      required: true,
    },
    Genres: [
      {
        type: String,
      },
    ],
    Image: {
      type: String,
      required: true,
    },
    Premiered: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Movie", movieSchema);
