const express = require('express');
const mongoose = require('mongoose');
const auth = require('./routes/auth');
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

//connect to shoes database
mongoose.Promise = global.Promise;
mongoose.set('strictQuery', false);
mongoose.connect('mongodb+srv://jamesbrowne:tGkr76p5m8cgfGUG@cluster0.90fwvtk.mongodb.net/Cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to Database Cluster0');
  })
  .catch(err => {
    console.log(`Error: ${err.message}`);
  });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', shoesRouter);
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


  // handle the request and insert the new shoe data into the database
  const multer = require('multer');
  const upload = multer({ dest: 'uploads/' });
  app.post('/routes/api', upload.single('image'), (req, res) => {
      const shoe = new Shoes({
          name: req.body.name,
          size: req.body.size,
          price: req.body.price,
          image: req.file.path
      });
      shoe.save((err) => {
          if (err) {
              res.send(err);
          } else {
              res.send('Shoe added successfully!');
          }
      });
  });
  




/*
//Login/create account part, incomplete 
app.use('/profile', auth);
app.use(express.static('views'));
const registerRouter = require('./routes/register');
const loginRouter = require('./routes/login');
app.use('/register', registerRouter);
app.use('/login', loginRouter);

mongoose.connect('mongodb+srv://jamesbrowne:tGkr76p5m8cgfGUG@cluster0.90fwvtk.mongodb.net/loginCredentials', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to Database login credentials');
  })
  .catch(err => {
    console.log(`Error: ${err.message}`);
  });

*/

//start the server
const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`)
});
