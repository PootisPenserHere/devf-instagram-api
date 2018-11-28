const mongoose = require('mongoose');

mongoose.connect('mongodb://mongo:27017',{ useNewUrlParser: true, user: 'sloth', pass: '12345678', dbName: 'la-cosa' } );

const mongoConnection = mongoose.connection;

mongoConnection.on('error',
    (error) =>  console.log("Failed to connect to mongo",error))
    .once('open', () => console.log("Connected to database"));


module.exports.mongoConnection = mongoConnection;