const {
    GraphQLObjectType,
    GraphQLList,
    GraphQLString,
    GraphQLFloat
} = require('graphql');

/**
 * GraphQL Type Definition:
 *     type ParkourTime {
 *         timeStart: Float
 *         timeTook: Float
 *     }
 */
const GraphQLParkourTime = new GraphQLObjectType({
    name: 'ParkourTime',
    description: '...',

    fields: () => ({
        timeStart: { type: GraphQLFloat },
        timeTook: { type: GraphQLFloat }
    })
});

/**
 * GraphQL Type Definition:
 *     type Parkour {
 *         name: String
 *         timings: [ParkourTime]
 *     }
 */
module.exports = new GraphQLObjectType({
    name: 'Parkour',
    description: '...',
    
    fields: () => ({
        name: { type: GraphQLString },
        timings: { type: new GraphQLList(GraphQLParkourTime) }
    })
});