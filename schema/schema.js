const { GraphQLSchema, GraphQLObjectType, GraphQLString } = require('graphql');
const PlayerType = require('./player/player');
const fetch = require('node-fetch');

module.exports = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'Query',
        description: '...',
        fields: () => ({
            player: {
                type: PlayerType,
                args: {
                    key: {
                        type: GraphQLString,
                    },
                    uuid: {
                        type: GraphQLString
                    }
                },
                resolve: (root, { key, uuid }) => fetch(`https://api.hypixel.net/player?key=${key}&uuid=${uuid}`)
                                            .then(response => response.json())
                                            .then(json => json.player)
            }
        })
    })
});