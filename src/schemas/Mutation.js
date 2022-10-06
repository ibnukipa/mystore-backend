const {GraphQLObjectType} = require("graphql/type")
const {MerchantMutations} = require("./Merchant")

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    ...MerchantMutations,
  })
})

module.exports = Mutation
