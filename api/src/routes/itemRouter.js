var express = require('express');
var app = express();
var itemRouter = express.Router();

// Require Item model in our routes module
var Item = require('../models/Item');

// Defined store route
itemRouter.route('/').post( (req, res) => {
  var item = new Item(req.body);
      item.save()
          .then(item => {
            res.json('Item added successfully');
          })
          .catch( err => {
            res.status(400).send('Unable to save to database');
          });
});

// Defined get data (index or listing) route
itemRouter.route('/').get( (req, res) => {
  Item.find( (err, itms) => {
    if(err) {
      console.log(err);
    }
    else {
      res.json(itms);
    }
  });
});

// Defined edit route
itemRouter.route('/:id').get( (req, res) => {
  var id = req.params.id;
  Item.findById(id, (err, item) => {
    res.json(item);
  });
});

// Defined update route
itemRouter.route('/:id').put( (req, res) => {
  Item.findById(req.params.id, (err, item) => {
    if (!item) {
      return next(new Error('Could not load Document'));
    }
    else {
      // do your updates here
      if (req.body.item) {
        item.item = req.body.item;
      }
      if (req.body.isPurchased) {
        item.isPurchased = req.body.isPurchased;
      }
      item.save().then(item => {
        res.json(item);
      })
      .catch(err => {
        res.status(400).send('Unable to update the database');
      });
    }
  });
});

// Defined delete | remove | destroy route
itemRouter.route('/:id').delete((req, res) => {
  Item.findOneAndDelete({_id: req.params.id},
  (err,item) => {
    if(err) {
      res.json(err);
    }
    else {
      res.json('Successfully removed');
    }
  });
});

module.exports = itemRouter;
