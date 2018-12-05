const { signNewToken } = require("./src/services/jwt");
const { setKey, getKey } = require("./src/services/redis");
const { mongoConnection } = require("./src/services/mongo");

const {GraphQLServer} = require('graphql-yoga');
const Query = require('./src/resolvers/Query');
const Mutation = require('./src/resolvers/Mutation');

const resolvers = {

    Query,
    Mutation
};

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
    context: req => ({
        ...req
    })
});

const options = {
    port: 3000,
    endpoint: '/graphql',
    playground: '/playground'
};

server.start(options,
    ({port}) => console.log(`Magic start in port ${port}`));