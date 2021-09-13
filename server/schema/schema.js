// GraphQL Playlist: https://www.youtube.com/playlist?list=PL4cUxeGkcC9iK6Qhn-QLcXCXPQUov1U7f
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
// 2. Define root queries ('root queries' are how we describe that a user can initially jump into the graph and grab data =>
//    how we initially get into the graph from the frontend, e.g. React, to grab data)
// 3. Define relationships between types ('type relations')

// DUMMY DATA

// Type Relations: For 'authorId', 'The Long Earth' has an 'authorId' of '3', because this book was written by 'Terry Pratchett'.
// So if you look down below in the 'authors' data, the 'id' for 'Terry Pratchett' is '3'.
// Therefore, we use '3' for the 'authorId'.
// Likewise, since 'Patrick Rothfuss' has an 'id' of '1', and since he wrote 'Name of the Wind',
// the 'authorId' for 'Name of the Wind' is '1'.
// Etc.
// This is how we define relationships between types.
// So now, when making a query from the frontend, and a user wants to know the author of a book,
// we can send back the author of that book as well with the query.
// Without setting up this relationship ('type relations'), we would not be able to do that - we would not be able to query the author of a book,
// since there would be not relationship set up between 'author' and 'book'.
// So defining relationships between types is important.
var books = [
  { name: 'Name of the Wind', genre: 'Fantasy', id: '1', authorId: '1' },
  { name: 'The Final Empire', genre: 'Fantasy', id: '2', authorId: '2' },
  { name: 'The Long Earth', genre: 'Sci-Fi', id: '3', authorId: '3' },
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
    // By using 'GraphQLID' instead of 'GraphQLString', the ID can be either a number or a string.
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    // Here, when a user queries a book, the user can also query the author.
    // This is possible because of the relationships between types defined above.
    // Without defining the relationships, we can't do this, so we need to define the relationships in order to do this
    // (note that 'AuthorType' is the type defined below as its own type for the author):
    author: {
      type: AuthorType,
      // The 'resolve' function is responsible for grabbing the data.
      resolve(parent, args) {
        // console.log(parent);
        // Here, 'parent' is the book we queried - we have nested data here: the author is nested inside the book (which is why the book is the 'parent').
        // So what we're doing here is that we're looking through the 'authors' array for the author who has an 'id' equal to the parent 'id' - so the 'id' of the author we initially requested.
        return _.find(authors, { id: parent.authorId });
      },
    },
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
        // Add 'resolve' function to find data. The 'resolve' function is responsible for grabbing the data.
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
