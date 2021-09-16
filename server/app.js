const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');

const app = express();

// Connect to MongoDB database
mongoose
  .connect(
    'mongodb+srv://ninja:books@cluster0.ypapv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
  )
  .then(() => {
    console.log('Connected to database.');
  });
// mongoose.connection.once('open', () => {
//   console.log('Connected');
// });

// Middleware
app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    // Add this line so we can use the GraphiQL tool in the browser => set to 'true'
    // (to use tool, go to 'http://localhost:4000/graphql' in the browser - or whatever port you are on)
    graphiql: true,
  })
);

app.listen(4000, () => {
  console.log('Now listening for requests on Port 4000...');
});
