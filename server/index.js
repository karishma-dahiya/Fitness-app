const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();
const path = require('path');


const app = express();

const routes = require('./routes/api');
const port = process.env.PORT || 5000;
const url = process.env.DB_URL;

app.use(cors());
app.use(express.json());

mongoose
  .connect(url, 
    { useNewUrlParser: true })
  .then(() => console.log(`Database connected successfully`))
  .catch((err) => console.log(err));


const connection = mongoose.connection;

app.use('/api', routes);

app.use(express.static(path.join(__dirname, 'client')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'index.html'));
});


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});