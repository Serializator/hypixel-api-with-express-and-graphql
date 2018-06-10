const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLList,
    GraphQLString,
    GraphQLInt
} = require('graphql');

const GraphQLPlayer = require('./player/player');
const GraphQLGame = require('./game');

const fetch = require('node-fetch');

module.exports = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'Query',
        description: '...',

        fields: () => ({
            player: {
                type: GraphQLPlayer,

                args: {
                    uniqueId: { type: GraphQLString }
                },
                
                resolve: (root, { uniqueId }, { config: { authToken } }) => {
                    return fetch(`https://api.hypixel.net/player?key=${authToken}&uuid=${uniqueId}`)
                    .then(response => response.json())
                    .then(json => json.player)
                }
            },

            game: {
                // equivalant of [Game!]!
                type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(GraphQLGame))),

                args: {
                    id: { type: GraphQLInt },
                    readable_name: { type: GraphQLString },
                    database_name: { type: GraphQLString },
                    enum_name: { type: GraphQLString }
                },

                resolve: (root, { id, readable_name, database_name, enum_name }, { config: { rawGameTypeMarkdownFile } }) => {
                    return fetch(rawGameTypeMarkdownFile)
                    .then(response => response.text())
                    .then(contents => {
                        return contents.split('\n')
                        .filter(row => row.startsWith('|'))
                        .slice(2) // "offset" by two so that the map only has integers to parse and no conditional logic
                        .map(row => {
                            const columns = row.split('|');
                    
                            return {
                                id: +columns[1].trim(),
                                readable_name: columns[4].trim(),
                                database_name: columns[3].trim(),
                                enum_name: columns[2].trim()
                            }
                        }).filter(game => {
                            const predicated = ((id !== undefined)
                                || (readable_name !== undefined)
                                || (database_name !== undefined)
                                || (enum_name !== undefined));

                            if(predicated) {
                                return (id === game.id) ||
                                    (readable_name === game.readable_name) ||
                                    (database_name === game.database_name) ||
                                    (enum_name === game.enum_name);
                            }
                            
                            return true;
                        });
                    });
                }
            }
        })
    })
});