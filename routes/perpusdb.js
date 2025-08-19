const express = require('express');
const router = express.Router();
const db = require('../database/db');


router.get('/', (req, res) => {
    db.query('SELECT * FROM perpustakaan', (err, results) => {
        if (err) return res.status(500).send('Internal Server Error');
        res.json(results);
    });
});

// Endpoint untuk mendapatkan buku berdasarkan ID
router.get('/:id', (req, res) => {
    db.query('SELECT * FROM perpustakaan WHERE id = ?', [req.params.id], (err, results) => {
        if (err) return res.status(500).send('Internal Server Error');
        if (results.length === 0) return res.status(404).send('Buku tidak ditemukan');
        res.json(results[0]);
    });
});

// Endpoint untuk menambahkan buku baru
router.post('/', (req, res) => {
    const { buku } = req.body;
    if (!buku || buku.trim() === '') {
        return res.status(400).send('Nama Buku tidak boleh kosong');
    }

    db.query('INSERT INTO perpustakaan (buku) VALUES (?)', [buku.trim()], (err, results) => {
        if (err) return res.status(500).send('Internal Server Error');
        const newBuku = { id: results.insertId, buku: buku.trim() };
        res.status(201).json(newBuku);
    });
});

// Endpoint untuk memperbarui buku
router.put('/:id', (req, res) => {
    const { buku } = req.body;
    if (!buku || buku.trim() === '') {
        return res.status(400).send('Nama Buku tidak boleh kosong');
    }
    db.query('UPDATE perpustakaan SET buku = ? WHERE id = ?', [buku, req.params.id], (err, results) => {
        if (err) return res.status(500).send('Internal Server Error');
        if (results.affectedRows === 0) return res.status(404).send('Buku tidak ditemukan');
        res.json({ id: req.params.id, buku: buku.trim() });
    });
});

// Endpoint untuk menghapus buku
router.delete('/:id', (req, res) => {
    db.query('DELETE FROM perpustakaan WHERE id = ?', [req.params.id], (err, results) => {
        if (err) return res.status(500).send('Internal Server Error');
        if (results.affectedRows === 0) return res.status(404).send('Buku tidak ditemukan');
        res.status(204).send();
    });
});

module.exports = router;