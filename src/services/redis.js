"use strict";

const redis = require("redis");
const { promisify } = require('util');

const connectionProperties = {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PASSWORD
};

const client = redis.createClient(connectionProperties);

client.on("error", function (err) {
    console.log("An error occurred while trying to connect to redis caused by: " + err);
});

/**
 * Creates an async version of the already existing redis commands
 */
const getAsync = promisify(client.get).bind(client);
const setAsync = promisify(client.set).bind(client);
const delAsync = promisify(client.del).bind(client);


/**
 * Creates a new key in redis with a default time to live and the option to
 * set a custom time
 *
 * @param key string
 * @param value string
 * @param ttl inteher - in seconds
 * @returns string
 */
async function setKey(key, value, ttl=process.env.REDIS_DEFAULT_TTL) {
    try {
        return await setAsync(key, value, 'EX', ttl);
    } catch(err) {
        console.log("error on redisClient.setKey() " + err);
        throw Error("An error occurred while saving to cache, please contact the system administrator.");
    }
}

/**
 * Retrieves a key value from redis
 *
 * The output has some quirks when handling data separated by white spaces such as a json
 * for that use cause it's best to use the getJsonKey method
 *
 * @param key string
 * @returns string
 */
async function getKey(key) {
    try {
        return await getAsync(key);
    } catch(err) {
        console.log("error on redisClient.getKey() " + err);
        throw Error("An error occurred while retrieving from cache, please contact the system administrator.");
    }
}

/**
 *  Retrieves a key value in redis and parses it into a json object
 *
 * @param key string
 * @returns object
 */
async function getJsonKey(key) {
    try {
        let output = await getAsync(key);
        return JSON.parse(output);
    } catch(err) {
        console.log("error on redisClient.getJsonKey() " + err);
        throw Error("An error occurred while retrieving from cache, please contact the system administrator.");
    }
}

/**
 * Deletes a key from redis
 *
 * @param key string
 * @returns string
 */
async function deleteKey(key) {
    try {
        return await delAsync(key);
    } catch(err) {
        console.log("error on redisClient.deleteKey() " + err);
        throw Error("An error occurred while deleting from cache, please contact the system administrator.");
    }
}

module.exports.setKey = setKey;
module.exports.getKey = getKey;
module.exports.getJsonKey = getJsonKey;
module.exports.deleteKey = deleteKey;
