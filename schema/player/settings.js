const {
    GraphQLObjectType,
    GraphQLInt,
    GraphQLBoolean
} = require('graphql')

/**
 * GraphQL Type Definition:
 *     type Settings {
 *         playerVisibility: Boolean
 *         chatVisibility: Boolean
 *         chatAlerts: Boolean
 *         autoSpawnPet: Boolean
 *         lobbySpeed: Boolean
 *         lobbyProtection: Boolean
 *         allowFriendRequests: Boolean
 *         spectator: Spectator
 *     }
 * 
 *     type Spectator {
 *         nightVision: Boolean
 *         speed: Int
 *         spectatorsInvisible: Boolean
 *     }
 */
module.exports = new GraphQLObjectType({
    name: 'Settings',
    description: '...',

    fields: () => ({
        playerVisibility: {
            type: GraphQLBoolean,
            resolve: player => player.settings.playerVisibility
        },

        chatVisibility: {
            type: GraphQLBoolean,
            resolve: player => player.settings.chatVisibility
        },

        chatAlerts: {
            type: GraphQLBoolean,
            resolve: player => player.settings.chatAlerts
        },

        autoSpawnPet: {
            type: GraphQLBoolean,
            resolve: player => player.settings.autoSpawnPet
        },

        lobbySpeed: {
            type: GraphQLBoolean,
            resolve: player => player.settings.lobbySpeed
        },

        lobbyProtection: {
            type: GraphQLBoolean,
            resolve: player => player.settings.lobbyProtection
        },

        allowFriendRequests: {
            type: GraphQLBoolean,
            resolve: player => player.settings.allowFriendRequests
        },
        
        spectator: {
            type: new GraphQLObjectType({
                name: 'Spectator',
                description: '...',

                fields: () => ({
                    nightVision: {
                        type: GraphQLBoolean,
                        resolve: player => player.spec_night_vision
                    },
                    
                    speed: {
                        type: GraphQLInt,
                        resolve: player => player.spec_speed
                    },

                    spectatorsInvisible: {
                        type: GraphQLBoolean,
                        resolve: player => player.spec_spectators_invisible
                    }
                })
            }),

            resolve: player => player
        }
    })
});