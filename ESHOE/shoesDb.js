const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://jamesbrowne:tGkr76p5m8cgfGUG@cluster0.90fwvtk.mongodb.net/Cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const shoesDb = mongoose.connection;

shoesDb.on('error', console.error.bind(console, 'connection error:'));
shoesDb.once('open', function() {
    console.log("Connected to Shoes Database");
});

module.exports = shoesDb;
