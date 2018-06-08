const { GraphQLObjectType, GraphQLString, GraphQLList } = require('graphql');

/**
 * GraphQL Type Definition:
 *     type Vanity {
 *         packages: [String]
 *     }
 */
module.exports = new GraphQLObjectType({
    name: 'Vanity',
    description: '...',
    
    fields: () => ({
        packages: { type: new GraphQLList(GraphQLString) }       
    })
});