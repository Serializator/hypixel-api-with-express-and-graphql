const {
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLString,
    GraphQLInt
} = require('graphql');

/**
 * GraphQL Type Definition:
 *     type Game {
 *         id: Int!
 *         readable_name: String!
 *         database_name: String!
 *         enum_name: String!
 *     }
 */
module.exports = new GraphQLObjectType({
    name: 'Game',
    description: '...',

    fields: () => ({
        id: { type: GraphQLInt },
        readable_name: { type: GraphQLString },
        database_name: { type: GraphQLString },
        enum_name: { type: GraphQLString }
    })
});