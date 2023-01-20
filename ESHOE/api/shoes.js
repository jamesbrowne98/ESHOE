
const express = require('express');
const router = express.Router();
const Shoes = require('../models/shoes'); // import the shoes model

// GET all shoes
router.get('/', async (req, res) => {
    try {
        const shoes = await Shoes.find();
        res.render('shop', { shoes });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
