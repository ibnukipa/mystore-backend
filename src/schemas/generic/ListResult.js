const {GraphQLObjectType, GraphQLList} = require("graphql/index");
const {GraphQLInt} = require("graphql/type");

const ListResult = (name, ResultsType) => {
  return new GraphQLObjectType({
    name,
    fields: () => ({
      totalCount: {type: GraphQLInt},
      results: {type: new GraphQLList(ResultsType)}
    })
  })
}

module.exports = { ListResult }
