const express = require('express');
const router = express.Router();
const Shoes = require('../models/shoes'); // import the shoes model

// GET all shoes
router.get('/', async (req, res) => {
    try {
        const shoes = await Shoes.find(); // retrieve all shoes from the database
        res.json(shoes); // send the shoes data as a JSON response
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


//upload shoes
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
router.post('/sell', upload.single('image'), async (req, res) => {
    const shoe = new Shoes({
        name: req.body.name,
        brand: req.body.brand,
        price: req.body.price,
        image: req.file.path
    });

    try {
        const newShoe = await shoe.save();
        res.status(201).json(newShoe);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;