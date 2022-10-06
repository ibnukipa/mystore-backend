const {GraphQLObjectType, GraphQLList, GraphQLInputObjectType, GraphQLEnumType} = require('graphql')
const {GraphQLID, GraphQLString, GraphQLNonNull} = require("graphql/type");
const db = require("../database")
const {Sort} = require('./enums/Sort')
const {Page} = require('./inputs/PageInput')
const {MerchantCreate} = require('./inputs/MerchantCreateInput')
const getOneFirst = require('../utils/getOneFirst')

const Merchant = new GraphQLObjectType({
  name: 'Merchant',
  fields: () => ({
    id: {type: GraphQLID},
    hash: {type: GraphQLString},
    name: {type: GraphQLString},
    phone_number: {type: GraphQLString},
    latitude: {type: GraphQLString},
    longitude: {type: GraphQLString},
    created_at: {type: GraphQLString},
    updated_at: {type: GraphQLString},
  })
})

const MerchantColumns = Object.keys(Merchant._fields())

const MerchantColumnsEnum = new GraphQLEnumType({
  name: 'MerchantColumnsEnum',
  values: {
    ID: {value: 'id'},
    HASH: {value: 'hash'},
    NAME: {value: 'name'},
    PHONE_NUMBER: {value: 'phone_number'},
    LAT: {value: 'latitude'},
    LONG: {value: 'longitude'},
    CREATED_AT: {value: 'created_at'},
    UPDATED_AT: {value: 'updated_at'},
  }
})

const MerchantSortInput = new GraphQLInputObjectType({
  name: 'MerchantSortInput',
  fields: () => ({
    column: {type: new GraphQLNonNull(MerchantColumnsEnum)},
    order: {type: new GraphQLNonNull(Sort)}
  })
})

const MerchantFilterInput = new GraphQLInputObjectType({
  name: 'MerchantFilterInput',
  fields: () => ({
    page: {type: Page, defaultValue: {}},
    sorts: {type: new GraphQLList(MerchantSortInput), defaultValue: []}
  })
})

// TODO: change this to use graphql-tools
const MerchantQueries = {
  merchants: {
    type: new GraphQLList(Merchant),
    args: {
      filter: {
        type: MerchantFilterInput,
        defaultValue: {page: {}, sorts: []}
      }
    },
    resolve: (_, {filter: {page, sorts}}) => {
      return db('merchants').limit(page.limit || 5).offset(page.offset ?? 0).orderBy(sorts)
    }
  },
  merchant: {
    type: Merchant,
    args: {
      id: { type: GraphQLID }
    },
    resolve: (_, { id }) => {
      return db('merchants').where({id}).then(getOneFirst)
    }
  }
}

const MerchantMutations = {
  createMerchant: {
    type: Merchant,
    args: {
      input: { type: MerchantCreate }
    },
    resolve: (_, { input }) => {
      return db('merchants').returning(MerchantColumns).insert(input, MerchantColumns).then(getOneFirst)
    }
  },
}

module.exports = {
  Merchant,
  MerchantQueries,
  MerchantMutations
}
