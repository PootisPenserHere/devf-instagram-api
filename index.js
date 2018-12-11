const { mongoConnection } = require("./src/services/mongo");
const { presignedPost } = require("./src/services/blobStorage");

const {GraphQLServer} = require('graphql-yoga');
const Query = require('./src/resolvers/Query');
const Mutation = require('./src/resolvers/Mutation');

const resolvers = {
    Query,
    Mutation
};

const server = new GraphQLServer({
    typeDefs:'./src/schema.graphql',
    resolvers,
    context: req => ({
        ...req
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

presignedPost();

server.start(options,
    ({port}) => console.log(`Magic start in port ${port}`));