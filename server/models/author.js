const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const authorSchema = new Schema({
  // MongoDB automatically creates an ID for each file that we add to the database,
  // so we don't need to define 'id' here in the schema.
  name: String,
  age: Number,
});

module.exports = mongoose.model('Author', authorSchema);
