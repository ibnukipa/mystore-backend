const {GraphQLEnumType} = require("graphql/index")

const Sort = new GraphQLEnumType({
  name: 'Sort',
  values: {
    ASC: {value: 'asc'},
    DESC: {value: 'desc'}
  }
})

module.exports = {Sort}
