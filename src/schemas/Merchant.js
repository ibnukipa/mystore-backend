const {GraphQLObjectType, GraphQLList, GraphQLInputObjectType, GraphQLEnumType} = require('graphql')
const {GraphQLID, GraphQLString, GraphQLNonNull, GraphQLBoolean, GraphQLInt} = require("graphql/type");
const db = require("../database")
const {Sort} = require('./enums/Sort')
const {Page} = require('./inputs/PageInput')
const {MerchantCreateInput, MerchantUpdateInput} = require('./inputs/MerchantInput')
const {ListResult} = require('./generic/ListResult')
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
    is_active: {type: GraphQLBoolean},
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

const MerchantListResult = ListResult('MerchantListResult', Merchant)

// TODO: change this to use graphql-tools
const MerchantQueries = {
  merchants: {
    type: MerchantListResult,
    args: {
      filter: {
        type: MerchantFilterInput,
        defaultValue: {page: {}, sorts: []}
      }
    },
    resolve: (_, {filter: {page, sorts}}) => {
      return new Promise(async (resolve, reject) => {
        try {
          const getModel = () => db('merchants').where({is_active: true})
          const {count} = await getModel().count().then(getOneFirst)
          const data = await getModel().limit(page.limit || 5).offset(page.offset ?? 0).orderBy(sorts)
          resolve({
            totalCount: count,
            results: data
          })
        } catch (e) {
          reject(e)
        }
      })
    }
  },
  merchant: {
    type: Merchant,
    args: {
      id: {type: GraphQLID}
    },
    resolve: (_, {id}) => {
      return db('merchants').where({id}).then(getOneFirst)
    }
  }
}

const MerchantMutations = {
  createMerchant: {
    type: Merchant,
    args: {
      input: {type: MerchantCreateInput}
    },
    resolve: (_, {input}) => {
      return db('merchants').insert(input, MerchantColumns).then(getOneFirst)
    }
  },
  updateMerchant: {
    type: Merchant,
    args: {
      id: {type: GraphQLID},
      input: {type: MerchantUpdateInput}
    },
    resolve: (_, {id, input}) => {
      return db('merchants').where({id}).update(input, MerchantColumns).then(getOneFirst)
    }
  },
  updateMerchants: {
    type: new GraphQLList(Merchant),
    args: {
      ids: {type: new GraphQLList(GraphQLID)},
      input: {type: MerchantUpdateInput}
    },
    resolve: (_, {ids, input}) => {
      return db('merchants').whereIn('id', ids).update(input, MerchantColumns)
    }
  },
  activatedAllMerchants: {
    type: new GraphQLList(Merchant),
    resolve: () => {
      return db('merchants').update({is_active: true}, MerchantColumns)
    },
  },
  deactivatedAllMerchants: {
    type: new GraphQLList(Merchant),
    resolve: () => {
      return db('merchants').update({is_active: false}, MerchantColumns)
    }
  }
}

module.exports = {
  Merchant,
  MerchantQueries,
  MerchantMutations
}
