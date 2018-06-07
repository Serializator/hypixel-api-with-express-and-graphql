const { GraphQLObjectType, GraphQLList, GraphQLString, GraphQLFloat } = require('graphql');

exports.ParkourType = new GraphQLObjectType({
    name: 'Parkour',
    description: '...',
    fields: () => ({
        name: {
            type: GraphQLString,
            resolve: parkour => parkour.name
        },
        timings: {
            type: new GraphQLList(exports.ParkourTimeType),
            resolve: parkour => parkour.timings
        }
    })
});

exports.ParkourTimeType = new GraphQLObjectType({
    name: 'ParkourTime',
    description: '...',
    fields: () => ({
        timeStart: {
            type: GraphQLFloat,
            resolve: time => time.timeStart
        },
        timeTook: {
            type: GraphQLFloat,
            resolve: time => time.timeTook
        }
    })
});