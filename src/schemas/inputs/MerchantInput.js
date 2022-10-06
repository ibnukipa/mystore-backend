const {GraphQLInputObjectType} = require("graphql/index");
const {GraphQLNonNull, GraphQLString, GraphQLBoolean} = require("graphql/type");

const MerchantCreateInput = new GraphQLInputObjectType({
  name: 'MerchantCreateInput',
  fields: () => ({
    name: {type: new GraphQLNonNull(GraphQLString)},
    phone_number: {type: GraphQLString},
    latitude: {type: GraphQLString},
    longitude: {type: GraphQLString},
  })
})

const MerchantUpdateInput = new GraphQLInputObjectType({
  name: 'MerchantUpdateInput',
  fields: () => ({
    name: {type: GraphQLString},
    phone_number: {type: GraphQLString},
    latitude: {type: GraphQLString},
    longitude: {type: GraphQLString},
    is_active: {type: GraphQLBoolean}
  }),
})

module.exports = {MerchantCreateInput, MerchantUpdateInput}
