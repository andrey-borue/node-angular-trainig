'use strict';
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;

const url = 'mongodb://localhost:27017/';

const dbName = 'test-project';
const collectionName = 'user9';

MongoClient.connect(url)
  .then(client => {
    console.log("Connected successfully to server");
    return client;
  })
  .then(client => insertDocuments(client, dbName, collectionName, [
      {name : "Andrey", age: 30, address: 'Moscow, Pushkina st', _id: ObjectId()},
      {name : "Peter", age: 31, address: 'Moscow, Lenina st.', _id: ObjectId()},
      {name : "Maksim", age: 33, address: 'London', _id: ObjectId()}
    ]
  ))
  .then(client => findDocuments(client, dbName, collectionName))
  .then(client => updateMany(client, dbName, collectionName, { address: /^Moscow/ }, {$set: {address: "Vilnius"} }))
  .then(client => findDocuments(client, dbName, collectionName))
  .then(client => deleteMany(client, dbName, collectionName, { address: /Vilnius/ }))
  .then(client => client.close())
  .catch(function (err) {console.log(err)});



const insertDocuments = (client, dbName, collectionName, data) => {
  return new Promise((done, fail) => {
    client.db(dbName).collection(collectionName).insertMany(data, (err, result) => {
      if (err) {
        return fail(err);
      }
      console.log(`Inserted ${result.result.n} documents into the collection`);
      done(client);
    });
  });
};


const findDocuments = (client, dbName, collectionName) => {
  return new Promise((done, fail) => {
    client.db(dbName).collection(collectionName).find({}).toArray((err, docs) => {
      if (err) {
        return fail(err);
      }
      console.log("Found the following records:");
      console.log(docs);
      done(client);
    });
  });
};

const updateMany = (client, dbName, collectionName, query, values) => {
  return new Promise((done, fail) => {
    client.db(dbName).collection(collectionName).updateMany(query, values, (err, res) => {
      if (err) {
        return fail(err);
      }

      console.log(res.result.nModified + " document(s) updated");
      done(client);
    });
  })
};

const deleteMany = (client, dbName, collectionName, query) => {
  return new Promise((done, fail) => {
    client.db(dbName).collection(collectionName).deleteMany(query, (err, res) => {
      if (err) {
        return fail(err);
      }
      console.log(res.result.n + " document(s) deleted");
      done(client);
    })
  });
};
