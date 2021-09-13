const graphql = require('graphql');
const _ = require('lodash');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
} = graphql;

// Three responsibilities of a schema file (i.e., this file):
// 1. Define types
// 2. Define relationships between types
// 3. Define root queries ('root queries' are how we describe that a user can initially jump into the graph and grab data =>
// how we initially get into the graph from the frontend, e.g. React, to grab data)

// Dummy data
var books = [
  { name: 'Name of the Wind', genre: 'Fantasy', id: '1' },
  { name: 'The Final Empire', genre: 'Fantasy', id: '2' },
  { name: 'The Long Earth', genre: 'Sci-Fi', id: '3' },
];

var authors = [
  { name: 'Patrick Rothfuss', age: 44, id: '1' },
  { name: 'Brandon Sanderson', age: 42, id: '2' },
  { name: 'Terry Pratchett', age: 66, id: '3' },
];

// Define the Object Types Below

// Book Type
const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
  }),
});

// Author Type
const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    // These are the parameters (terms) that we use in the frontend to make our queries (i.e., 'book')
    book: {
      type: BookType,
      // 'args' = 'arguments'. This argument is what is passed into the query when we make our query;
      // and this is how we find the book inside the GraphQL server - in this case, with this 'id'
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // Add 'resolve' function to find data.
        // This 'resolve' function is where we write the code to get whichever data we need from our database, or some other source =>
        // code to get data from db / other source (this data could be stored in a NoSQL database, a SQL database, MongoDB, for example - it doesn't matter where it's stored).
        // Tells GraphQL how to get the data when a request is made.
        // Here, we're doing this using Lodash, so be sure to install Lodash (npm install lodash => install inside the 'server' folder) and 'require' it up above.
        // We use Lodash to look through the 'books' array, adn then return ('find') any book that has an 'id' equal to the 'id' that's been attached to the 'args' that the user sends along.
        return _.find(books, { id: args.id });

        // Without Lodash:
        // let foundBook = books.find((book) => book.id === args.id);
        // return foundBook;
        // OR:
        // return books.find((book) => book.id === args.id);
      },
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return _.find(authors, { id: args.id });
      },
    },
  },
});

// Export the schema so that we can use it as a property in 'app.js' (in 'app.js', this will be imported as 'schema')
module.exports = new GraphQLSchema({
  // Pass in our initial Root Query that we defined above
  query: RootQuery,
});
