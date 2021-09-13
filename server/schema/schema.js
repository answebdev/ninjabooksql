// GraphQL Playlist: https://www.youtube.com/playlist?list=PL4cUxeGkcC9iK6Qhn-QLcXCXPQUov1U7f
const graphql = require('graphql');
const _ = require('lodash');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
} = graphql;

// Three responsibilities of a schema file (i.e., this file):
// 1. Define types
// 2. Define root queries ('root queries' are how we describe that a user can initially jump into the graph and grab data =>
//    how we initially get into the graph from the frontend, e.g. React, to grab data)
// 3. Define relationships between types ('type relations')

// DUMMY DATA - This would usually go in a database, such as MongoDB, etc.

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
// So defining relationships between object types is important.
var books = [
  { name: 'Name of the Wind', genre: 'Fantasy', id: '1', authorId: '1' },
  { name: 'The Final Empire', genre: 'Fantasy', id: '2', authorId: '2' },
  { name: 'The Long Earth', genre: 'Sci-Fi', id: '3', authorId: '3' },
  { name: 'The Hero of Ages', genre: 'Fantasy', id: '4', authorId: '2' },
  { name: 'The Colour of Magic', genre: 'Fantasy', id: '5', authorId: '3' },
  { name: 'The Light Fantastic', genre: 'Fantasy', id: '6', authorId: '3' },
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
    // Here, when a user requests a book, the user can also request the author.
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
    // In this relationship, when a user requests an author, we want to return the author's books.
    // Again, we need to define the 'type relations' (see above) before we can do this.
    books: {
      // Each author has potentially a list of books, and not just one book.
      // So we cannot just use 'BookType' for the type here, since 'BookType' implies that it's just a single book.
      // What we want to do is tell GraphQL that it's going to be a 'list' of book types.
      // To do this, we need to use 'GraphQLList' from GraphQL, and 'BookType' is going to go inside,
      // because it's going to be a GraphQL List of book types.
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        // If we look in the dummy data above in the 'authors' array, we know the 'id' of an author, e.g., '1'.
        // So we're then going to look through the 'books' array and find every book with an 'authorId' of '1', and we're going to 'return' this.
        // The way we do that is by using the 'filter' method.
        // What 'filter' is going to do is it's going to filter through a particular array, in our case here, the 'books' array, because that's what we're searching for.
        // And it's going to look for objects inside that 'books' array that match up to our criteria, in our case => 'authorId: parent.id' (the 'authorId' is going to equal the 'parent.id' -
        // remember that the parent is the initial author that is being requested).
        // So, we're taking that parent 'id', and we're looking in the 'books' array for any book that has an 'authorId' equal to the author's 'id'.
        // So if we look for request 'Brandon Sanderson', who has an 'id' of '2',
        // it's going to look for any book that has an 'authorId' of '2' => everything else is going to be FILTERED out of the array (which is why we use the 'filter' method here),
        // so that we're just returning the array with just the books that have an 'authorId' of '2'.
        return _.filter(books, { authorId: parent.id });
      },
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    // These are the parameters (terms) that we use in the frontend to make our queries (i.e., 'book').
    // With this root query, we are able to search for a particular book with a particular 'id'.
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
        // We use Lodash to look through the 'books' array, and then return ('find') any book that has an 'id' equal to the 'id' that's been attached to the 'args' that the user sends along.
        return _.find(books, { id: args.id });

        // Without Lodash:
        // let foundBook = books.find((book) => book.id === args.id);
        // return foundBook;
        // OR:
        // return books.find((book) => book.id === args.id);
      },
    },
    // With this root query, we are able to search for a particular author with a particular 'id'.
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return _.find(authors, { id: args.id });
      },
    },
    // With this root query, we are able to search for a list of ALL books.
    // So here, we're going to have a 'GraphQLList' of book types (and not 'type: BookType', since we want a list of ALL books, and not just one book).
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        // We don't really need the arguments 'parent' and 'args' (like we do when searching for a particular book) because we just want to return all of the books.
        // Here, we're not searching for any particular books - we want a list of ALL the books, so we just return 'books' - this will return the entire list of books.
        return books;
      },
    },
    // With this root query, we are able to search for a list of ALL authors.
    authors: {
      type: new GraphQLList(AuthorType),
      resolve(parent, args) {
        // We don't really need the arguments 'parent' and 'args' (like we do when searching for a particular author) because we just want to return all of the authors.
        // Here, we're not searching for any particular authors - we want a list of ALL the authors, so we just return 'authors' - this will return the entire list of authors.
        return authors;
      },
    },
  },
});

// Export the schema so that we can use it as a property in 'app.js' (in 'app.js', this will be imported as 'schema')
module.exports = new GraphQLSchema({
  // Pass in our initial Root Query that we defined above
  query: RootQuery,
});
