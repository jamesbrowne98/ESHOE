const express = require('express');

const app = express();
app.get('/shoes', (req, res) => {
  // Code to retrieve all shoes from the database goes here
  res.json(shoes);
});

app.listen(3000, () => {
  console.log('Server started on http://localhost:3000');
});