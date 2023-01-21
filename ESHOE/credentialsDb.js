const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const credentialsDb = mongoose.createConnection('mongodb+srv://jamesbrowne:tGkr76p5m8cgfGUG@cluster0.90fwvtk.mongodb.net/loginCredentials', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

credentialsDb.on('error', console.error.bind(console, 'connection error:'));
credentialsDb.once('open', function() {
    console.log("Connected to Login Credentials Database");
});

module.exports = credentialsDb;
