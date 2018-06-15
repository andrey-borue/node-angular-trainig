'use strict';

const express = require("express");
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;
const url = 'mongodb://localhost:27017';
const collectionName = 'api1';
const dbName = 'test-project1';


const app = express();

const userRouter = require('./userRouter');
const taskRouter = require('./taskRouter');


app.use("/api/user", userRouter);
app.use("/api/task", taskRouter);

app.listen(3000, () => console.log('Example app listening on port 3000!'));
