'use strict';

const express = require("express");
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;
const url = 'mongodb://localhost:27017';
const collectionName = 'api1';
const dbName = 'test-project1';

const app = express();
const userApi = express.Router();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({"extended": true}));

userApi.get('/', (request, response) => {
  MongoClient.connect(url, (err, client) => {
    if (err) {
      throw err;
    }

    const name = request.query.name;
    const phone = request.query.phone;
    const lastname = request.query.lastname;
    console.log(phone);

    let query = {};
    let or = [];

    if (name) {
      or.push({name: {$eq: name}});
    }

    if (phone) {
      or.push({name: {$eq: phone}});
    }

    if (lastname) {
      or.push({name: {$eq: lastname}});
    }

    if (or.length) {
      query = {$or : or};
    }

    client.db(dbName).collection(collectionName).find(query).toArray((err, docs) => {
      if (err) {
        throw err;
      }
      response.json(docs);
    });
  });
});


userApi.post('/', (request, response) => {
  MongoClient.connect(url, (err, client) => {
    if (err) {
      throw err;
    }

    client.db(dbName).collection(collectionName).insertOne(request.body, (err, result) => {
      if (err) {
        throw err;
      }
      response.json({'status': 'ok', 'message': `Inserted ${result.result.n} documents into the collection`});
    });
  });
});


userApi.delete('/', (request, response) => {
  MongoClient.connect(url, (err, client) => {
    if (err) {
      throw err;
    }

    client.db(dbName).collection(collectionName).deleteOne({_id: ObjectId(request.body.id)}, (err, result) => {
      if (err) {
        throw err;
      }
      response.json({'status': 'ok', 'message': result});
    });
  });
});


userApi.put('/:id', (request, response) => {
  MongoClient.connect(url, (err, client) => {
    if (err) {
      throw err;
    }

    client.db(dbName).collection(collectionName).updateOne({_id: ObjectId(request.params.id)}, {$set: request.body}, (err, result) => {
      if (err) {
        throw err;
      }
      response.json({'status': 'ok', 'message': result});
    });
  });
});



app.use("/api/user", userApi);

app.listen(3000, () => console.log('Example app listening on port 3000!'));
