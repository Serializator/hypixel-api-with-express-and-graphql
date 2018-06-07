const { GraphQLObjectType, GraphQLString, GraphQLList } = require('graphql');

module.exports = new GraphQLObjectType({
    name: 'Vanity',
    description: '...',
    fields: () => ({
        packages: {
            type: new GraphQLList(GraphQLString),
            resolve: json => json.packages
        }       
    })
});