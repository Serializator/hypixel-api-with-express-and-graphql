const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLList
} = require('graphql');

/**
 * GraphQL Type Definition:
 *     type Rewards {
 *         npcs: [String]
 *         presents: [String]
 *         levels: [Int]
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
        },

        levels: {
            type: new GraphQLList(GraphQLInt),
            resolve: resolveLevels
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

function resolveLevels(player) {
    return Object.keys(player).filter(key => key.startsWith('levelingReward_'))
        .map(key => key.substring('levelingReward_'.length, key.length));
}