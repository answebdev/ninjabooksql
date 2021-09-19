import BookList from './components/BookList';
// import {
//   ApolloClient,
//   InMemoryCache,
//   ApolloProvider,
//   useQuery,
//   gql,
// } from '@apollo/client';

// // Apollo Client Setup
// const client = new ApolloClient({
//   // The endpoint that we are making requests to
//   // (this way, Apollo will know that we are going to be making requests to this endpoint from our application):
//   uri: 'http://localhost:4000/graphql',
//   cache: new InMemoryCache(),
// });

const App = () => {
  return (
    // <ApolloProvider client={client}>
    <div id='main'>
      <h1>Ninja Books</h1>
      <BookList />
    </div>
    // </ApolloProvider>
  );
};

export default App;
