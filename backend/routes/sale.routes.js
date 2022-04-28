let mongoose = require("mongoose"),
  express = require("express"),
  router = express.Router();

// Student Model
let saleSchema = require("../models/Sales");

// CREATE sale
router.post("/create-sale", (req, res, next) => {
  saleSchema.create(req.body, (error, data) => {
    if (error) {
      return next(error);
    } else {
      console.log(data);
      res.json(data);
    }
  });
});

// READ sale
router.get("/", (req, res) => {
  saleSchema.find((error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

// UPDATE sale
router
  .route("/update-sale/:id")
  // Get Single Sale
  .get((req, res) => {
    saleSchema.findById(req.params.id, (error, data) => {
      if (error) {
        return next(error);
      } else {
        res.json(data);
      }
    });
  })

  // Update Sale Data
  .put((req, res, next) => {
    saleSchema.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      (error, data) => {
        if (error) {
          return next(error);
          console.log(error);
        } else {
          res.json(data);
          console.log("Sale updated successfully !");
        }
      }
    );
  });

// Delete Sale
router.delete("/delete-sale/:id", (req, res, next) => {
  saleSchema.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data,
      });
    }
  });
});

module.exports = router;
