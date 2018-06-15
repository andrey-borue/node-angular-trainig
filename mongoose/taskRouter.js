'use strict';
const express = require("express");
const bodyParser = require('body-parser');
const url = 'mongodb://localhost:27017/test1';
const mongoose = require('mongoose');
const Task = mongoose.model('Task', require("./taskSchema"));

mongoose.connect(url);
const db = mongoose.connection;

db.on('error', (err) => {console.error('Connection error: ' + err)});
db.once('open', () => {console.log('connect!')});

const router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({"extended": true}));

router.get('/', (request, response) => {
  Task.find({}).lean().exec((err, docs) => {
    if (err) throw err;
    response.json(docs);
  });
});

router.post('/', (request, response) => {
  (new Task(request.body)).save((err) => {
    if (err) throw err;
    response.json({'result': 'saved'});
  });
});

router.post('/:id/:status', (request, response) => {
  Task.update({_id: request.params.id}, {"status": request.params.status}, {overwrite: false}, (err) => {
    if (err) throw err;
    response.json({'result': 'updated', 'status': request.params.status});
  });
});

router.put('/:id', (request, response) => {
  Task.update({_id: request.params.id}, request.body, {overwrite: true}, (err) => {
    if (err) throw err;
    response.json({'result': 'updated'});
  });
});

router.delete('/:id', (request, response) => {
  Task.remove({_id: request.params.id}, (err) => {
    if (err) throw err;
    response.json({'result': 'deleted'});
  });
});

module.exports = router;
