const express = require('express');
const mongoose = require('mongoose');

const path = require('path');
const Shoes = require('./models/shoes');
const shoesRouter = require('./api/shoes');
const cors = require('cors');


const app = express();
app.use(cors());
mongoose.Promise = global.Promise;

mongoose.set('strictQuery', false);
mongoose.connect('mongodb+srv://jamesbrowne:tGkr76p5m8cgfGUG@cluster0.90fwvtk.mongodb.net/Cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to Database');
  })
  .catch(err => {
    console.log(`Error: ${err.message}`);
  });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', shoesRouter);
app.set('view engine', 'ejs');
app.get('/shop', (req, res) => {
    res.render('Shop', { shoes: shoes });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on http://localhost:${PORT}`));
