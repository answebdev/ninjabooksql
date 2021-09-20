import React from 'react';
import { useQuery } from '@apollo/client';
import { getAuthorsQuery } from '../queries/queries';

// Move query to 'queries.js' file
// const getAuthorsQuery = gql`
//   {
//     authors {
//       name
//       id
//     }
//   }
// `;

const AddBook = () => {
  const { loading, error, data } = useQuery(getAuthorsQuery);
  if (loading) return <option disabled>Loading Authors...</option>;
  if (error) return `Error! ${error.message}`;
  console.log(data);

  return (
    <form id='add-book'>
      <div className='field'>
        <label>Book name:</label>
        <input type='text' />
      </div>

      <div className='field'>
        <label>Genre:</label>
        <input type='text' />
      </div>

      <div className='field'>
        <label>Author:</label>
        <select>
          <option>Select Author</option>
          {data.authors.map((author) => (
            <option key={author.id} value={author.id}>
              {author.name}
            </option>
          ))}
        </select>
      </div>

      <button>+</button>
    </form>
  );
};

export default AddBook;
