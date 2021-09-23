import { useQuery } from '@apollo/client';
import { getBooksQuery } from '../queries/queries';
import { useState } from 'react';
// import { useState } from 'react';

import BookDetails from './BookDetails';

const DisplayBooks = ({ loading, error, data, selectBook }) => {
  if (loading) return <p>Loading....</p>;
  if (error) return <p>Something went wrong</p>;
  return data.books.map((book) => {
    return (
      <li key={book.id} onClick={() => selectBook(book.id)}>
        {book.name}
      </li>
    );
  });
};

const BookList = () => {
  const [selected, setSelected] = useState(null);
  const { loading, error, data } = useQuery(getBooksQuery);
  const selectBook = (id) => setSelected(id);
  return (
    <div>
      <ul id='book-list'>
        <DisplayBooks
          loading={loading}
          error={error}
          data={data}
          selectBook={selectBook}
        />
      </ul>
      <BookDetails bookId={selected} />
    </div>
  );
};

export default BookList;
