const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const ejs = require('ejs');
const path = require('path');

const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://jamesbrowne:tGkr76p5m8cgfGUG@cluster0.90fwvtk.mongodb.net/Cluster0', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to Database'));
mongoose.set('strictQuery', false);

const shoesRouter = require('./routes/shoes');
app.use('/shoes', shoesRouter);

app.get('/', async (req, res) => {
    try {
      const shoes = await Shoes.find();
      res.render('shop', { shoes });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
app.use(express.static('public'));
app.listen(3000, () => {
  console.log('Server started on http://localhost:3000');
});