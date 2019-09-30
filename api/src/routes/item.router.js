var express = require('express');
var app = express();
var itemRouter = express.Router();

// Require Item model in our routes module
var Item = require('../models/item.model');

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
itemRouter.route('/item/:id').get( (req, res) => {
  var id = req.params.id;
  Item.findById(id, (err, item) => {
    res.json(item);
  });
});

// Defined update route
itemRouter.route('/item/:id').put( (req, res) => {
  Item.findById(req.params.id, (err, item) => {
    if (!item) {
      return next(new Error('Could not load Document'));
    }
    else {
      // do your updates here
      if (req.body.item) {
        item.item = req.body.item;
        item.quantity = req.body.quantity;
        item.notes = req.body.notes;
        item.category = req.body.category;
      }
      if (req.body.isPurchased || req.body.isPurchased === false) {
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
itemRouter.route('/item/:id').delete((req, res) => {
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

itemRouter.route('/checkout').get((req, res, next) => {
  Item.deleteMany({ isPurchased: true }, (err) => {
    if (err) return handleError(err);
  });
});



module.exports = itemRouter;
