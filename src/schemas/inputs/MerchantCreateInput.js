const {GraphQLInputObjectType} = require("graphql/index");
const {GraphQLNonNull, GraphQLString} = require("graphql/type");

const MerchantCreateInput = new GraphQLInputObjectType({
  name: 'MerchantCreateInput',
  fields: () => ({
    name: {type: new GraphQLNonNull(GraphQLString)},
    phone_number: {type: GraphQLString},
    latitude: {type: GraphQLString},
    longitude: {type: GraphQLString},
  })
})

module.exports = { MerchantCreate: MerchantCreateInput }
