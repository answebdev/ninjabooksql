const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
  // MongoDB automatically creates an ID for each file that we add to the database,
  // so we don't need to define 'id' here in the schema.
  name: String,
  genre: String,
  authorId: String,
});

module.exports = mongoose.model('Book', bookSchema);
