const express = require('express');
const graphqlHTTP = require('express-graphql');
const fetch = require('node-fetch');

const app = express();
const schema = require('./schema/schema');

app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true
}));

app.listen(4000, () => console.log('GraphQL running on localhost:4000/graphql'))