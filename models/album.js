const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const reviewSchema = new Schema(
  {
    content: String,
    rating: { type: Number, min: 1, max: 5, default: 5 },
  },
  {
    timestamps: true,
  }
);

const albumSchema = new Schema({
  // cover: [coverSchema],
  title: { type: String, required: true },
  releaseYear: {
    type: Number,

    default: function () {
      return new Date().getFullYear();
    },
  },
  genre: String,
  by: [String],
  reviews: [reviewSchema],
});

module.exports = mongoose.model("Album", albumSchema);
