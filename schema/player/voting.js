const {
    GraphQLObjectType,
    GraphQLList,
    GraphQLString,
    GraphQLInt,
    GraphQLFloat
} = require('graphql');

/**
 * GraphQL Type Definition:
 *     type Vote {
 *         source: String
 *         total: Int
 *         secondary: Int
 *         last: Float
 *     }
 */
const VoteType = new GraphQLObjectType({
    name: 'Vote',
    description: '...',

    fields: () => ({
        source: { type: GraphQLString },
        total: { type: GraphQLInt },
        secondary: { type: GraphQLInt },
        last: { type: GraphQLFloat }
    })
})

/**
 * GraphQL Type Definition:
 *     type Voting {
 *         total: Int
 *         today: Int
 *         last: Float
 *         votes: [Vote]
 *     }
 */
module.exports = new GraphQLObjectType({
    name: 'Voting',
    description: '...',

    fields: () => ({
        total: { type: GraphQLInt },
        today: { type: GraphQLInt },
        last: { type: GraphQLFloat },
        votes: {
            type: new GraphQLList(VoteType),
            
            resolve: json => {
                const votes = {};

                Object.keys(json).filter(key => (key !== 'total' && key !== 'votesToday' && key !== 'last_vote')).forEach(property => {
                    let propertyType = property.split('_', 1);
                    
                    if(propertyType.length > 0) {
                        propertyType = propertyType[0];
                    } else {
                        return;
                    }

                    const source = property.substring(propertyType.length+1, property.length);

                    if(!votes[source]) {
                        votes[source] = {};
                    }

                    votes[source][propertyType] = json[property];
                });

                return Object.keys(votes).map(source => ({
                    source: source,
                    total: votes[source].total,
                    secondary: votes[source].secondary,
                    last: votes[source].last 
                }));
            }
        }
    })
});