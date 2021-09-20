// GraphQL is a query language - it's not JavaScript.
// So, when we construct queries, we need to use 'qgl' to help us pass our queries so we can make our queries:
import { gql } from '@apollo/client';

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

export { getBooksQuery, getAuthorsQuery };
