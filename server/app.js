const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');

const app = express();

// Middleware
app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    // Add this line so we can use the GraphiQL tool in the browser => set to 'true'
    graphiql: true,
  })
);

app.listen(4000, () => {
  console.log('Now listening for requests on port 4000...');
});
