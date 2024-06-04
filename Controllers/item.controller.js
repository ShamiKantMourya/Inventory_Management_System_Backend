const mongoose = require("mongoose");
const fs = require("fs");

const Item = require("../Model/items.model");
const jsonData = fs.readFileSync("./Data/items.json");
const itemData = JSON.parse(jsonData);

const seedItemDatabase = async () => {
  try {
    for (const item of itemData) {
      const newItem = new Item(item);
      await newItem.save();
      console.log(`Item ${newItem.name} seeded`);
    }
    console.log("Item database seeding complete");
  } catch (error) {
    console.error("Error seeding item database:", error);
  } finally {
    mongoose.disconnect();
  }
};

// seedItemDatabase()

//Get all items

exports.getAllItems = async (req, res) => {
  try {
    const items = await Item.find({});
      res.status(200).json({
        success: true,
        item: items,
      });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to get all items",
      error,
    });
  }
};

//Add items

exports.addItems = async (req, res) => {
  try {
    const item = req.body;
    const newItem = new Item(item);
    const savedItem = await newItem.save();
      res.status(201).json({
        success: true,
        message: "Item added successfully",
        item: savedItem,
      });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to add item",
      error,
    });
  }
};

//Delete item
exports.deleteItem = async (req, res) => {
  try {
    const itemId = req.params.itemId;
    const deletedItem = await Item.findByIdAndDelete(itemId);
      res.status(200).json({
        success: true,
        message: "Item deleted successfully",
        item: deletedItem,
      });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete item",
      error,
    });
  }
};

//Update item

exports.updateItem = async (req, res) => {
  try {
    const itemId = req.params.itemId;
    const data = req.body;
    const updatedItem = await Item.findByIdAndUpdate(itemId, data, {
      new: true,
    });
      res.status(200).json({
        success: true,
        message: "Item updated successfully",
        item: updatedItem,
      });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update item",
      error,
    });
  }
};
