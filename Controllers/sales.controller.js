const Sale = require("../Model/sale.model");
const Item = require("../Model/items.model");

exports.getAllSales = async (req, res) => {
  try {
    const allSales = await Sale.find({}).populate({
      path: "description",
      select: "name",
    });
      res.status(200).json({
        success: true,
        sale: allSales,
      });
  } catch (error) {
    res.stauts(500).json({
      success: false,
      message: "Failed to get all sales",
      error,
    });
  }
};

exports.addSale = async (req, res) => {
  try {
    const itemId = req.params.itemId;
    const item = await Item.findById(itemId);
    // console.log(item);
    const { quantity, price } = req.body;
    const addToSale = {
      description: itemId,
      quantity: quantity,
      price: price,
      item: item.name,
    };
    const newSale = new Sale(addToSale);
    await newSale.save();
    const savedNewSale = await newSale.populate({
      path: "description",
      select: "name",
    });
      res.status(200).json({
        success: true,
        message: "Sale added successfully",
        sale: savedNewSale,
      });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to add sale",
      error,
    });
  }
};
