import { useQuery } from '@apollo/client';
import { getBookQuery } from '../queries/queries';

const displayBookDetails = (loading, data, error) => {
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Something went wrong..</p>;
  if (data.book) {
    return (
      <div>
        <h2>{data.book.name}</h2>
        <p>{data.book.genre}</p>
        <p>{data.book.author.name}</p>
        <p>All books by this author:</p>
        <ul className='other-books'>
          {data.book.author.books.map((item) => {
            return <li key={item.id}>{item.name}</li>;
          })}
        </ul>
      </div>
    );
  } else {
    return <div>No book selected...</div>;
  }
};

const BookDetails = (props) => {
  const { loading, data, error } = useQuery(getBookQuery, {
    variables: {
      id: props.bookId,
    },
  });
  // console.log(data)
  return (
    <div id='book-details'>{displayBookDetails(loading, data, error)}</div>
  );
};

export default BookDetails;
