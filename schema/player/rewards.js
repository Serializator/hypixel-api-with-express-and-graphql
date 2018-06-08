const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLList
} = require('graphql');

/**
 * GraphQL Type Definition:
 *     type Rewards {
 *         npcs: [String]
 *         presents: [String]
 *     }
 */
module.exports = new GraphQLObjectType({
    name: 'Rewards',
    description: '...',

    fields: () => ({
        npcs: {
            type: new GraphQLList(GraphQLString),
            resolve: resolveNPCs
        },
        presents: {
            type: new GraphQLList(GraphQLString),
            resolve: resolvePresents
        }
    })
});

function resolveNPCs(player) {
    return Object.keys(player).filter(key => key.startsWith('REWARD_FIND_'))
        .map(key => key.substring('REWARD_FIND_'.length, key.length));
}

function resolvePresents(player) {
    return Object.keys(player).filter(key => key.startsWith('PRESENT_FIND_'))
        .map(key => key.substring('PRESENT_FIND_'.length, key.length));
}