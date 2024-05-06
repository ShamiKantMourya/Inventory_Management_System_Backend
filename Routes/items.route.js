const express = require("express");

const {
  getAllItems,
  addItems,
  deleteItem,
  updateItem
} = require("../Controllers/item.controller");

const router = express.Router();

//get item
router.route("/").get(getAllItems);

//add item
router.route("/").post(addItems);

//delete item
router.route("/:itemId").delete(deleteItem);

//Update item
router.route("/:itemId").post(updateItem);

module.exports = router;
