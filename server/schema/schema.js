const graphql = require('graphql');

const { GraphQLObjectType, GraphQLString } = graphql;

// Define the Object Types Below
const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
  }),
});
