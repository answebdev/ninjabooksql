import React from 'react';
import { useQuery } from '@apollo/client';
import { getBooksQuery } from '../queries/queries';
import BookDetails from './BookDetails';

// Move query to 'queries.js' file
// // STEP 1: Create query: Store query in a function
// // Note that this query looks like the queries made in the GraphiQL tool.
// const getBooksQuery = gql`
//   {
//     books {
//       name
//       id
//     }
//   }
// `;

const BookList = () => {
  const { loading, error, data } = useQuery(getBooksQuery);
  if (loading) return <p>Loading books...</p>;
  if (error) return <p>Error</p>;
  console.log(data);

  return (
    <div>
      <ul id='book-list'>
        {data.books.map((book) => (
          <li key={book.id}>{book.name}</li>
        ))}
      </ul>
      {/* OR with 'return':
      <ul id='book-list'>
        {data.books.map((book) => {
          return <li key={book.id}> {book.name}</li>;
        })}
      </ul> */}
      <BookDetails />
    </div>
  );
};

// STEP 2: Bind the query to this component so that we can access the data that comes back from the query.
// To do this, we use 'graphql' (which we import up above - this was installed when we installed Apollo) -
// this helps us bind Apollo to React.
// 'graphql' is a function. So, as a parameter, it takes in the query we want to bind to this component, in this case, our query, 'getBooksQuery'.
// So basically, we are using 'graphql' to bind our 'getBooksQuery' to our 'BookList' component,
// So that now, inside this component, we have access to all of the data that comes back from this query.
// And this data is stored in the component's props.
// export default graphql(getBooksQuery)(BookList);

export default BookList;
