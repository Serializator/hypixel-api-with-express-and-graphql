const { GraphQLObjectType, GraphQLString, GraphQLInt } = require('graphql');

module.exports = new GraphQLObjectType({
    name: 'Achievement',
    description: '...',
    fields: () => ({
        name: {
            type: GraphQLString,
            resolve: achievement => achievement.name
        },
        score: {
            type: GraphQLInt,
            resolve: achievement => achievement.score
        }
    })
});