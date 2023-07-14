// Requiring Express and CORS
const express = require("express");
const cors = require("cors");

// Requiring Mongoose for the DB Handling
const mongoose = require("mongoose");

// Requiring Express Routes
const register = require("./routes/register");
const login = require("./routes/login");

// Requiring Products data
const products = require("./products");

// Declaring app via express() call
const app = express();

// Getting .env secret data
require("dotenv").config();


app.use(express.json());
app.use(cors());

app.use("/api/register", register);
app.use("/api/login", login);

app.get("/", (req, res) => {
  res.send("Welcome our to online shop API...");
});

app.get("/products", (req, res) => {
  res.send(products);
});

const uri = process.env.DB_URI;
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server running on port: ${port}...`);
});

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connection established..."))
  .catch((error) => console.error("MongoDB connection failed:", error.message));
