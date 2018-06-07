const { GraphQLObjectType, GraphQLList, GraphQLString, GraphQLFloat } = require('graphql');

const ParkourTimeType = new GraphQLObjectType({
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

exports.ParkourType = new GraphQLObjectType({
    name: 'Parkour',
    description: '...',
    fields: () => ({
        name: {
            type: GraphQLString,
            resolve: parkour => parkour.name
        },
        timings: {
            type: new GraphQLList(ParkourTimeType),
            resolve: parkour => parkour.timings
        }
    })
});