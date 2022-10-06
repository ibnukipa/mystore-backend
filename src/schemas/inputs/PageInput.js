const {GraphQLInputObjectType} = require("graphql/index");
const {GraphQLInt} = require("graphql/type");

const PageInput = new GraphQLInputObjectType({
  name: 'Page',
  fields: () => ({
    limit: {type: GraphQLInt},
    offset: {type: GraphQLInt},
  })
})

module.exports = { Page: PageInput }
