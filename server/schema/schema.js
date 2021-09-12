const graphql = require('graphql');

const { GraphQLObjectType, GraphQLString, GraphQLSchema } = graphql;

// Three responsibilities of a schema file (i.e., this file):
// 1. Define types
// 2. Define relationships between types
// 3. Define root queries ('root queries' are how we describe that a user can initially jump into the graph and grab data -
// how we initially get into the graph from the frontend, e.g. React, to grab data)

// Define the Object Types Below
const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
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
      args: { id: { type: GraphQLString } },
      resolve(parent, args) {
        // This 'resolve' function is where we write the code to get whichever data we need from our database, or some other source =>
        // code to get data from db / other source.
        // Tells GraphQL how to get the data when a request is made.
      },
    },
  },
});

// Export the schema so that we can use it as a property in 'app.js' (in 'app.js', this will be imported as 'schema')
module.exports = new GraphQLSchema({
  // Pass in our initial Root Query that we defined above
  query: RootQuery,
});
