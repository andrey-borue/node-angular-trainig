'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = new Schema({
  title: String,
  description: String,
  status: String,
  user: { type: Schema.Types.ObjectId, ref: 'User' }
});
