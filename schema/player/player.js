const { GraphQLObjectType, GraphQLString, GraphQLFloat, GraphQLList, GraphQLBoolean, GraphQLInt } = require('graphql');

const AchievementType = require('./achievement');
const SettingsType = require('./settings');
const { ParkourType, ParkourTimeType } = require('./parkour');
const VanityType = require('./vanity');
const VotingType = require('./voting');

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
 *         levels: [Int]
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
            type: SettingsType,
            resolve: player => player
        },
        achievements: {
            type: new GraphQLList(AchievementType),
            resolve: resolveAchievements
        },
        parkour: {
            type: new GraphQLList(ParkourType),
            resolve: resolveParkour
        },
        vanity: {
            type: VanityType,
            resolve: player => player.vanityMeta
        },
        voting: {
            type: VotingType,
            resolve: player => player.voting
        },
        levels: {
            type: GraphQLList(GraphQLInt),
            resolve: resolveLevels
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

function resolveLevels(player) {
    return Object.keys(player).filter(key => key.startsWith('levelingReward_'))
        .map(key => key.substring('levelingReward_'.length, key.length));
}