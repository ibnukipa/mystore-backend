const {GraphQLObjectType} = require("graphql/type")
const {MerchantQueries} = require("./Merchant")

const Query = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    ...MerchantQueries,
  })
})

module.exports = Query
