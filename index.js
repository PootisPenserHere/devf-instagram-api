const {GraphQLServer} = require('graphql-yoga');

const { mongoConnection } = require("./src/services/mongo");
const {verifyToken} = require('./src/models/auth');

const Query = require('./src/resolvers/Query');
const Mutation = require('./src/resolvers/Mutation');
const typeDefs = importSchema('./src/schema.graphql');

const resolvers = {
    Query,
    Mutation
};

const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
});

const server = new GraphQLServer({
    schema,
    context: async context => ({
        ...context,
        user:await verifyToken(context)
    })
});

const options = {
    port:8000,
    endpoint:'/graphql',
    playground:'/playground',
    cors:{
        credentials:true,
        "origin": "*",
        "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
        "preflightContinue": false,
        "optionsSuccessStatus": 204,
        "maxAge": 3600
    }


};

server.start(options,
    ({port}) => console.log(`Magic start in port ${port}`));