const { GraphQLObjectType, GraphQLNonNull, GraphQLString, GraphQLInt } = require('graphql');

/**
 * In the Hypixel API there are two types of achievements.
 * Achievements that have a score and achievements that you earn once and never again.
 * In our schema these two types of achievements are represented by the same type.
 * Achievements that can only be earned once will simply always have a score of 1.
 * 
 * GraphQL Type Definition:
 *     type Achievement {
 *         name: String!
*          score: Int
 *     }
 */
module.exports = new GraphQLObjectType({
    name: 'Achievement',
    description: '...',
    
    fields: () => ({
        name: { type: new GraphQLNonNull(GraphQLString) },
        score: { type: GraphQLInt }
    })
});