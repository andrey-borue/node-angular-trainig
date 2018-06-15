'use strict';
const express = require("express");
const bodyParser = require('body-parser');
const url = 'mongodb://localhost:27017/test1';
const mongoose = require('mongoose');
const User = mongoose.model('User', require("./userSchema"));

mongoose.connect(url);
const db = mongoose.connection;

db.on('error', (err) => {console.error('Connection error: ' + err)});
db.once('open', () => {console.log('connect!')});

const router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({"extended": true}));

router.get('/', (request, response) => {
  User.find({}).lean().exec((err, docs) => {
    if (err) throw err;
    response.json(docs);
  });
});

router.post('/', (request, response) => {
  (new User(request.body)).save((err) => {
    if (err) throw err;
    response.json({'result': 'saved'});
  });
});

router.put('/:id', (request, response) => {
  User.update({_id: request.params.id}, request.body, {overwrite: true}, (err) => {
    if (err) throw err;
    response.json({'result': 'updated'});
  });
});

router.delete('/:id', (request, response) => {
  User.remove({_id: request.params.id}, (err) => {
    if (err) throw err;
    response.json({'result': 'deleted'});
  });
});

module.exports = router;
