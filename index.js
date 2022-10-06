const express = require('express')
const cors = require('cors')
const {graphqlHTTP} = require('express-graphql')
const {GraphQLSchema} = require("graphql/type")
const Query = require('./src/schemas/Query')
const Mutation = require('./src/schemas/Mutation')

const app = express()

app.use('*', cors())

const schema = new GraphQLSchema({
  query: Query,
  mutation: Mutation,
});

app.use('/graphql', cors(), graphqlHTTP({
  schema: schema,
  graphiql: true,
}));

app.listen(8080, () => {
  console.log('Express running on port:8080')
})
