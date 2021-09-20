import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { getAuthorsQuery, addBookMutation } from '../queries/queries';

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
  const [addBookMut, { dataMutation }] = useMutation(addBookMutation);

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
