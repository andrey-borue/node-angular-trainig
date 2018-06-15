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
  let query = {};
  let or = [];

  if (request.query.title) {
    or.push({title: request.query.title});
  }

  if (request.query.description) {
    or.push({description: request.query.description});
  }

  if (or.length) {
    query = {$or : or};
  }

  Task.find(query).lean().exec((err, docs) => {
    if (err) {
      response.status(400);
      response.write(err);
      response.send();
      return;
    }
    response.json(docs);
  });
});

router.post('/', (request, response) => {
  (new Task(request.body)).save((err) => {
    if (err) {
      response.status(400);
      response.write(err);
      response.send();
      return;
    }
    response.json({'result': 'saved'});
  });
});

router.post('/:id/:status', (request, response) => {
  Task.update({_id: request.params.id}, {"status": request.params.status}, {overwrite: false}, (err) => {
    if (err) {
      response.status(400);
      response.write(err);
      response.send();
      return;
    }
    response.json({'result': 'updated', 'status': request.params.status});
  });
});

router.put('/:id', (request, response) => {
  Task.findOne({_id: request.params.id}, (err, doc) => {
    if (err) {
      response.status(404);
      response.json({'error': 'not found'});
      response.send();
      return;
    }

    if (request.body.title) {
      doc.title = request.body.title;
    }

    if (request.body.description) {
      doc.description = request.body.description;
    }

    if (request.body.status) {
      doc.status = request.body.status;
    }

    if (request.body.user) {
      doc.user = request.body.user;
    }

    doc.save((err) => {
      if (err) {
        response.status(400);
        response.write(err);
        response.send();
        return;
      }

      response.json({'result': 'updated'});

    });
  });
});

router.delete('/:id', (request, response) => {
  Task.remove({_id: request.params.id}, (err) => {
    if (err) {
      response.status(400);
      response.write(err);
      response.send();
    }
    response.json({'result': 'deleted'});
  });
});

module.exports = router;
