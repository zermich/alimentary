var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cors = require('cors');
var port = 4200;

// Mongoose connection with mlab mongodb
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://zermich:PeterPan01@ds115283.mlab.com:15283/alimentary', { useNewUrlParser: true })
        .then( () => {
          console.log('Start');
        })
        .catch ( err => {
          console.error('App starting error:', err.stack);
          process.exit(1);
        })


// Required application specific custom router module
var itemRouter = require('./src/routes/item.router');
const userRouter = require('./src/routes/user.router');


// Use middlewares to set view engine and post json data to the server
app.use(express.static('public'));
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/items', itemRouter);
app.use('/user', userRouter);

// Start the server
app.listen(port, () => {
  console.log(`Express is running on port ${port}`);
});
