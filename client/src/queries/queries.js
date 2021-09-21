// GraphQL is a query language - it's not JavaScript.
// So, when we construct queries, we need to use 'qgl' to help us pass our queries so we can make our queries:
import { gql } from '@apollo/client';

// QUERIES
// Create query: Store query in a function
// Note that this query looks like the queries made in the GraphiQL tool.
const getBooksQuery = gql`
  {
    books {
      name
      id
    }
  }
`;

const getAuthorsQuery = gql`
  {
    authors {
      name
      id
    }
  }
`;

// MUTATIONS
// See mutations in 'schema.js' to see what the mutations are called ('addAuthor', 'addBook').
// Those are the names that we use here, as well as the arguments that the mutations in 'schema.js' take,
// e.g., 'name', 'genre', 'authorId' for the 'addBook' mutation.
// Query Variables to make everything dynamic so that whatever information is typed in by the user will be added:
// $name: String!, $genre: String!, $authorId: ID!

const addBookMutation = gql`
  mutation ($name: String!, $genre: String!, $authorId: ID!) {
    addBook(name: $name, genre: $genre, authorId: $authorId) {
      name
      id
    }
  }
`;

export { getBooksQuery, getAuthorsQuery, addBookMutation };
