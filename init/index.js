const mongoose = require("mongoose");

const Book = require("../models/book.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/bookshelf";

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
  await Book.insertMany([
    {
      title: "The Great Gatsby",
      image:
        "https://m.media-amazon.com/images/W/MEDIAX_792452-T1/images/I/81Q6WkLhX4L._SL1500_.jpg",
      author: "F. Scott Fitzgerald",
      genre: "Classic",
      ISBN: "9780743273565",
      price: 249,
    },
    {
      title: "To Kill a Mockingbird",
      image:
        "https://m.media-amazon.com/images/W/MEDIAX_792452-T1/images/I/81gepf1eMqL._SL1500_.jpg",
      author: "Harper Lee",
      genre: "Fiction",
      ISBN: "9780061120084",
      price: 349,
    },
    {
      title: "1984",
      author: "George Orwell",
      genre: "Dystopian",
      ISBN: "9780451524935",
      price: 149,
    },
    {
      title: "The Catcher in the Rye",
      author: "J.D. Salinger",
      genre: "Coming-of-Age",
      ISBN: "9780241950425",
      price: 199,
    },
    {
      title: "Harry Potter and the Sorcerer's Stone",
      author: "J.K. Rowling",
      genre: "Fantasy",
      ISBN: "9780590353427",
      price: 299,
    },
  ]);
};

initDB();
