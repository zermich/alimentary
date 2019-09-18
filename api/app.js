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

app.options('*', cors());

//Set CORS headers
app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept');
	next();
});

app.get('/alimentary-api/', function (req, res) {
  res.send('hello world')
})

app.use('/alimentary-api/items', itemRouter);
app.use('/alimentary-api/user', userRouter);

// Start the server
app.listen(port, () => {
  console.log(`Alimentary-API is running on port ${port}`);
});
