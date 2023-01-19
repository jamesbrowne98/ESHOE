const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const Shoes = require('./models/shoes');
const router = require('./routes/shoes');
const shoesRouter = require('./api/shoes');


const app = express();
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
app.use('/api/shoes', shoesRouter);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(router);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on http://localhost:${PORT}`));
