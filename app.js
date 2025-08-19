require("dotenv").config();
const express = require("express");
const app = express();
const perpusRoutes = require("./routes/perpusdb.js");
const { perpustakaan } = require("./routes/perpus.js");
const db = require("./database/db.js");
const port = process.env.PORT || 3000;
const expressLayouts = require("express-ejs-layouts");
app.use(expressLayouts);

app.use(express.json());
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index", { layout: "layouts/main-layout" });
});

app.get("/perpus-view", (req, res) => {
  db.query("SELECT * FROM perpustakaan", (err, perpustakaan) => {
    if (err) return res.status(500).send("Internal Server Error");
    res.render("perpus-page", {
      layout  : "layouts/main-layout",
      perpustakaan: perpustakaan
    })
  });
});

app.use((req, res, next) => {
  res.status(404).render("404"); 
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});