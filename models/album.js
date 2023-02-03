const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const albumSchema = new Schema({
  title: String,
  releaseYear: {
    type: Number,
    default: function () {
      return new Date().getFullYear();
    },
  },
  genre: String,
  by: [String],
});
