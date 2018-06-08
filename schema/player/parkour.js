const { GraphQLObjectType, GraphQLList, GraphQLString, GraphQLFloat } = require('graphql');

/**
 * GraphQL Type Definition:
 *     type ParkourTime {
 *         timeStart: Float
 *         timeTook: Float
 *     }
 */
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

/**
 * GraphQL Type Definition:
 *     type Parkour {
 *         name: String
 *         timings: [ParkourTime]
 *     }
 */
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