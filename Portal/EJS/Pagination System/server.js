const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();

// Set EJS as view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// Home route with pagination
app.get("/", (req, res) => {
  try {
    // Read data.json on every request (as per requirements)
    const data = fs.readFileSync(path.join(__dirname, "data.json"), "utf8");
    const products = JSON.parse(data);

    // Get page number from query parameter, default to 1
    const page = parseInt(req.query.page) || 1;
    const limit = 5; // 5 products per page as per requirements

    // Calculate start and end indices
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    // Get products for current page
    const currentPageProducts = products.slice(startIndex, endIndex);

    // Calculate total pages
    const totalPages = Math.ceil(products.length / limit);

    // Prepare data for EJS template
    const templateData = {
      products: currentPageProducts,
      currentPage: page,
      totalPages: totalPages,
      hasPrev: page > 1,
      hasNext: page < totalPages,
      prevPage: page - 1,
      nextPage: page + 1,
    };

    res.render("index", templateData);
  } catch (error) {
    console.error("Error reading data.json:", error);
    res.status(500).send("Error loading products");
  }
});

app.listen(3000, () => {
  console.log("Server started on http://localhost:3000 ");
});