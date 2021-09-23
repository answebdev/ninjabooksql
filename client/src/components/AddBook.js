import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import {
  getBooksQuery,
  getAuthorsQuery,
  addBookMutation,
} from '../queries/queries';

// Move query to 'queries.js' file
// const getAuthorsQuery = gql`
//   {
//     authors {
//       name
//       id
//     }
//   }
// `;

const displayAuthors = (loading, data) => {
  if (loading) {
    return <option disabled>Loading authors...</option>;
  } else {
    return data.authors.map((author) => {
      return (
        <option key={author.id} value={author.id}>
          {author.name}
        </option>
      );
    });
  }
};

const AddBook = () => {
  //   const { loading, error, data } = useQuery(getAuthorsQuery);
  //   if (loading) return <option disabled>Loading Authors...</option>;
  //   if (error) return `Error! ${error.message}`;
  //   console.log(data);

  const [name, setName] = useState('');
  const [genre, setGenre] = useState('');
  const [authorId, setAuthorId] = useState('');
  const { loading, data } = useQuery(getAuthorsQuery);
  const [addBookMut] = useMutation(addBookMutation);

  //   const handleSubmit = (e) => {
  //     e.preventDefault();
  //     console.log(name, genre, authorId);
  //   };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(name, genre, authorId);
    addBookMut({
      variables: {
        name: name,
        genre: genre,
        authorId: authorId,
      },
      // RENDER LIST OF BOOKS IN BROWSER: 'refetchQueries'
      // When we add a book, we want to rerun that query;
      // we want to get those books again so that the component will re-render with the added book.
      // So when we add a book with the mutation (addBookMutation), we can tell Apollo to refetch a particular query ('refetchQueries').
      // And with 'refetchQueries', we're going to have an array of different queries that we want to refetch.
      // So each item is going to be an object, and it's going to have a 'query' property.
      // And we need to say which query we want to refetch AFTER this 'addBookMutation' has fired.
      // And the query we want to refetch is the 'getBooksQuery' (which we need to import up above).
      // So now, when we make a mutation to add a book, it's going to refetch the 'getBooksQuery' query,
      // and then rerender the component with all of the data - all of the books.
      refetchQueries: [{ query: getBooksQuery }],
    });
  };

  return (
    <form id='add-book' onSubmit={handleSubmit}>
      <div className='field'>
        <label>Book name:</label>
        <input
          type='text'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className='field'>
        <label>Genre:</label>
        <input
          type='text'
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
        />
      </div>
      <div className='field'>
        <label>Author:</label>
        <select value={authorId} onChange={(e) => setAuthorId(e.target.value)}>
          <option>Select author</option>
          {displayAuthors(loading, data)}
        </select>
      </div>
      <button>+</button>
    </form>
  );
};

export default AddBook;
