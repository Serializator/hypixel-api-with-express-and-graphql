const {
    GraphQLObjectType,
    GraphQLList,
    GraphQLString,
    GraphQLInt,
    GraphQLFloat,
    GraphQLBoolean
} = require('graphql');

const GraphQLAchievement = require('./achievement');
const GraphQLSettings = require('./settings');
const GraphQLParkour = require('./parkour');
const GraphQLVanity = require('./vanity');
const GraphQLVoting = require('./voting');
const GraphQLRewards = require('./rewards');

/**
 * GraphQL Type Definition:
 *     type Player {
 *         _id: String
 *         uuid: String
 *         displayName: String
 *         playerName: String
 *         packageRank: String
 *         firstLogin: Float
 *         lastLogin: Float
 *         networkExp: Int
 *         userLanguage: String
 *         websiteSet: Boolean
 *         mainLobbyTutorial: Boolean
 *         mostRecentlyThanked: String
 *         mostRecentlyTippedUuid: String
 *         settings: Settings
 *         Achievements: [Achievement]
 *         parkour: [Parkour]
 *         vanity: Vanity
 *         voting: Voting
 *         rewards: Rewards
 *     }
 */
module.exports = new GraphQLObjectType({
    name: 'Player',
    description: '...',

    fields: () => ({
        _id: { type: GraphQLString },
        uuid: { type: GraphQLString },

        displayName: {
            type: GraphQLString,
            resolve: player => player.displayname
        },

        playerName: {
            type: GraphQLString,
            resolve: player => player.playername
        },

        packageRank: { type: GraphQLString },
        firstLogin: { type: GraphQLFloat },
        lastLogin: { type: GraphQLFloat },
        networkExp: { type: GraphQLInt },
        userLanguage: { type: GraphQLString },
        websiteSet: { type: GraphQLBoolean },
        mainLobbyTutorial: { type: GraphQLBoolean },
        mostRecentlyThanked: { type: GraphQLString },
        mostRecentlyTippedUuid: { type: GraphQLString },

        settings: {
            type: GraphQLSettings,
            resolve: player => player
        },

        achievements: {
            type: new GraphQLList(GraphQLAchievement),
            resolve: resolveAchievements
        },

        parkour: {
            type: new GraphQLList(GraphQLParkour),
            resolve: resolveParkour
        },

        vanity: {
            type: GraphQLVanity,
            resolve: player => player.vanityMeta
        },

        voting: {
            type: GraphQLVoting,
            resolve: player => player.voting
        },
        
        rewards: {
            type: GraphQLRewards,
            resolve: player => player
        }
    })
});

function resolveAchievements(player) {
    return Object.keys(player.achievements).map(achievement => ({
        name: achievement,
        score: player.achievements[achievement]
    })).concat(player.achievementsOneTime.map(achievement => ({
        name: achievement,
        score: 1
    })));
}

function resolveParkour(player) {
    return Object.keys(player.parkourCompletions).map(parkour => ({
        name: parkour,
        timings: player.parkourCompletions[parkour]
    }));
}