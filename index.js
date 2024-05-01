const express = require("express");
const cors = require("cors");

const { dataBase } = require("./db");
const items = require("./Routes/items.route");
const sales = require("./Routes/sales.route");

const app = express();


//Middleware
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

//database connected
dataBase();

//Routes
app.get('/', async (req, res) => {
  res.send("inventory management api");
});

app.use("/api/v1/items", items);
app.use("/api/v1/sales", sales);

// handle error
app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(500).json({ error: 'Error, Something went wrong' })
})



// global error for route not found
app.use((req, res) => {
  res.status(404).json({ error: "API Route Not Found" })
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`server is running on port: ${PORT}`);
});
