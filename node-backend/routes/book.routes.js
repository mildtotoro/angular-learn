const express = require("express");
// const bodyParser = require("body-parser");
let Book = require("../model/Book");

const bookRoute = express.Router();

// Add book
bookRoute.route("/add-book").post((req, res, next) => {
  Book.create(req.body, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

// Get all book
bookRoute.route("/").get((req, res) => {
  Book.find((error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

// Get book
bookRoute.route("/read-book/:id").get((req, res) => {
  Book.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

// Update book
bookRoute.route("/update-book/:id").put((req, res, next) => {
  console.log("/update-book/:id", req.params.id, req.body);
  Book.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    (error, data) => {
      if (error) {
        console.log(error);
        return next(error);
      } else {
        res.json(data);
        console.log("Book Updated Successfully");
      }
    }
  );
});

// Delete book
bookRoute.route("/delete-book/:id").delete((req, res, next) => {
  Book.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data,
      });
    }
  });
});

module.exports = bookRoute;
