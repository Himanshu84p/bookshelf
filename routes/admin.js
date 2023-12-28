const express = require("express");
const User = require("../models/user.js");
const router = express.Router();
const Book = require("../models/book.js");
const { isLoggedIn } = require("../middleware");
const Order = require("../models/order.js");

//Admin Index route
router.get("/admin", isLoggedIn, (req, res) => {
  if (req.user.username == "admin") {
    res.render("admin/admin.ejs");
  } else {
    res.send("access denied");
  }
});

//-----------------------------User Route--------------------------------
//GET User Route
router.get("/admin/users", async (req, res) => {
  if (req.user.username == "admin") {
    try {
      let allUsers = await User.find({});
      res.render("admin/users.ejs", { allUsers });
    } catch (error) {
      console.log(error);
    }
  } else {
    res.send("access denied");
  }
});

//-----------------------------Order Route--------------------------------
//GET User Route
router.get("/admin/orders", async (req, res) => {
  if (req.user.username == "admin") {
    try {
      let allOrders = await Order.find({});
      res.render("admin/orders.ejs", { allOrders });
    } catch (error) {
      console.log(error);
    }
  } else {
    res.send("access denied");
  }
});

//-----------------------------Book Route--------------------------------
//Add get and post route
router.get("/admin/new", isLoggedIn, (req, res) => {
  if (req.user.username == "admin") {
    res.render("admin/new.ejs");
  } else {
    res.send("access denied");
  }
});

router.post("/admin/new", isLoggedIn, async (req, res) => {
  if (req.user.username == "admin") {
    try {
      let newBook = new Book(req.body.book);
      await newBook.save();
      res.redirect("/books");
    } catch (error) {
      console.log(error);
    }
  } else {
    res.send("access denied");
  }
});

//get books route
router.get("/admin/books", isLoggedIn, async (req, res) => {
  if (req.user.username == "admin") {
    let allBooks = await Book.find({});
    res.render("admin/books.ejs", { allBooks });
  } else {
    res.send("access denied");
  }
});

//Edit book route
router.get("/admin/:id", isLoggedIn, async (req, res) => {
  if (req.user.username == "admin") {
    let { id } = req.params;
    let book = await Book.findById(id);
    console.log(book);
    res.render("admin/edit.ejs", { book });
  } else {
    res.send("access denied");
  }
});

router.put("/admin/:id", isLoggedIn, async (req, res) => {
  if (req.user.username == "admin") {
    let { id } = req.params;
    let { title, author, image, price, genre, ISBN } = req.body;

    try {
      let editedBook = await Book.findByIdAndUpdate(
        id,
        {
          title,
          image,
          author,
          genre,
          ISBN,
          price,
        },
        { runValidators: true }
      );
    } catch (error) {
      console.log(error);
    }
    res.redirect("/admin/books");
  } else {
    res.send("access denied");
  }
});

//Delete Book Route

router.delete("/admin/:id", isLoggedIn, async (req, res) => {
  if (req.user.username == "admin") {
    let { id } = req.params;
    try {
      let deletedBook = await Book.findByIdAndDelete(id);
    } catch (error) {
      console.log(error);
    }
    res.redirect("/admin/books");
  } else {
    res.send("access denied");
  }
});

module.exports = router;
