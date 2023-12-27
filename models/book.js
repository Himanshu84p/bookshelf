const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: Object,
    url: {
      type: String,
    },
    filename: {
      type: String,
    },

    default:
      "https://img.freepik.com/premium-psd/realistic-book-cover-mockup-template_855932-82.jpg?w=900",
    set: (v) =>
      v === ""
        ? "https://img.freepik.com/premium-psd/realistic-book-cover-mockup-template_855932-82.jpg?w=900"
        : v,
  },
  author: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  ISBN: {
    type: String,
    required: true,
    unique: true,
  },
  //   quantity: {
  //     type: Number,
  //     default: 0,
  //   },
  price: {
    type: Number,
    required: true,
  },
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
