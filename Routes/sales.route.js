const express = require("express");

const { getAllSales, addSale } = require("../Controllers/sales.controller");

const router = express.Router();

//Get all sales
router.route("/").get(getAllSales);

//Add new sale
router.route("/:itemId").post(addSale);

module.exports = router;