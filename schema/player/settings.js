const { GraphQLObjectType, GraphQLInt, GraphQLBoolean } = require('graphql')

module.exports = new GraphQLObjectType({
    name: 'Settings',
    description: '...',
    fields: () => ({
        playerVisibility: {
            type: GraphQLBoolean,
            resolve: json => json.settings.playerVisibility
        },
        chatVisibility: {
            type: GraphQLBoolean,
            resolve: json => json.settings.chatVisibility
        },
        chatAlerts: {
            type: GraphQLBoolean,
            resolve: json => json.settings.chatAlerts
        },
        autoSpawnPet: {
            type: GraphQLBoolean,
            resolve: json => json.settings.autoSpawnPet
        },
        lobbySpeed: {
            type: GraphQLBoolean,
            resolve: json => json.settings.lobbySpeed
        },
        lobbyProtection: {
            type: GraphQLBoolean,
            resolve: json => json.settings.lobbyProtection
        },
        allowFriendRequests: {
            type: GraphQLBoolean,
            resolve: json => json.settings.allowFriendRequests
        },
        spectator: {
            type: new GraphQLObjectType({
                name: 'Spectator',
                fields: () => ({
                    nightVision: {
                        type: GraphQLBoolean,
                        resolve: json => json.spec_night_vision
                    },
                    speed: {
                        type: GraphQLInt,
                        resolve: json => json.spec_speed
                    },
                    spectatorsInvisible: {
                        type: GraphQLBoolean,
                        resolve: json => json.spec_spectators_invisible
                    }
                })
            }),
            resolve: json => json
        }
    })
});