const express = require("express");
const router = express.Router();

const perpustakaan = [];

router.get("/", (req, res) => {
  res.json(perpustakaan);
});

router.get("/:id", (req, res) => {
  const perpus = perpustakaan.find((t) => t.id === parseInt(req.params.id));
  if (!perpus) return res.status(404).send("Buku tidak ditemukan");
  res.json(perpus);
});

router.post("/", (req, res) => {
  const newPerpus = {
    id: perpustakaan.length + 1,
    buku: req.body.buku,
  };
  perpustakaan.push(newPerpus);
  res.status(201).json(newPerpus);
});

router.put("/:id", (req, res) => {
  const perpus = perpustakaan.find((t) => t.id === parseInt(req.params.id));
  if (!perpus) return res.status(404).send("Buku tidak ditemukan");

  perpus.buku = req.body.buku;
  res.json(perpus);
});

router.delete("/:id", (req, res) => {
  const perpusIndex = perpustakaan.findIndex((t) => t.id === parseInt(req.params.id));
  if (perpusIndex === -1) return res.status(404).send("Buku tidak ditemukan");

  perpustakaan.splice(perpusIndex, 1);
  res.status(204).send();
});

module.exports = router;
module.exports.perpustakaan = perpustakaan;