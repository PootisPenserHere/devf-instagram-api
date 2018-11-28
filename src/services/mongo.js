const mongoose = require('mongoose');

mongoose.connect('mongodb://mongo:27017',{
    useNewUrlParser: true,
    user: process.env.MONGO_USER,
    pass: process.env.MONGO_PASSWORD,
    dbName: process.env.MONGO_DATABASE } );

const mongoConnection = mongoose.connection;

mongoConnection.on('error',
    (err) =>  console.log("Failed to connect to mongo", err))
    .once('open', () => console.log("Connected to database"));


module.exports.mongoConnection = mongoConnection;