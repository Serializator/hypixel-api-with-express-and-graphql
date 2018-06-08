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
 *     }
 */
module.exports = new GraphQLObjectType({
    name: 'Player',
    description: '...',
    fields: () => ({
        _id: {
            type: GraphQLString,
            resolve: json => json.player._id
        },
        uuid: {
            type: GraphQLString,
            resolve: json => json.player.uuid
        },
        displayName: {
            type: GraphQLString,
            resolve: json => json.player.displayname
        },
        playerName: {
            type: GraphQLString,
            resolve: json => json.player.playername
        },
        packageRank: {
            type: GraphQLString,
            resolve: json => json.player.packageRank
        },
        firstLogin: {
            type: GraphQLFloat,
            resolve: json => json.player.firstLogin
        },
        lastLogin: {
            type: GraphQLFloat,
            resolve: json => json.player.lastLogin 
        },
        networkExp: {
            type: GraphQLInt,
            resolve: json => json.player.networkExp
        },
        userLanguage: {
            type: GraphQLString,
            resolve: json => json.player.userLanguage
        },
        websiteSet: {
            type: GraphQLBoolean,
            resolve: json => json.player.websiteSet
        },
        mainLobbyTutorial: {
            type: GraphQLBoolean,
            resolve: json => json.player.mainlobbytutorial
        },
        mostRecentlyThanked: {
            type: GraphQLString,
            resolve: json => json.player.mostRecentlyThanked
        },
        mostRecentlyTippedUuid: {
            type: GraphQLString,
            resolve: json => json.player.mostRecentlyTippedUuid  
        },
        settings: {
            type: SettingsType,
            resolve: json => json.player
        },
        achievements: {
            type: new GraphQLList(AchievementType),
            resolve: json => Object.keys(json.player.achievements).map(achievement => ({
                name: achievement,
                score: json.player.achievements[achievement]
            })).concat(json.player.achievementsOneTime.map(achievement => ({
                name: achievement,
                score: 1
            })))
        },
        parkour: {
            type: new GraphQLList(ParkourType),
            resolve: json => Object.keys(json.player.parkourCompletions).map(parkour => ({
                name: parkour,
                timings: json.player.parkourCompletions[parkour]
            }))
        },
        vanity: {
            type: VanityType,
            resolve: json => json.player.vanityMeta
        },
        voting: {
            type: VotingType,
            resolve: json => json.player.voting
        }
    })
});