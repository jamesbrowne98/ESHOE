const express = require('express');
const mongoose = require('mongoose');

const path = require('path');
const Shoes = require('./models/shoes');
const shoesRouter = require('./routes/api');
const cors = require('cors');


const app = express();
const corsOptions = {
    origin: 'http://localhost:8080',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization']
  };
  app.use(cors({
    origin: 'http://localhost:8080'
  }));
  
  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

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

app.get('/routes/api', async (req, res) => {
    try {
        const shoes = await Shoes.find();
        res.json(shoes);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`)
});
