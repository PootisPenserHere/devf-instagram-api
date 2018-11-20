jwt = require('jsonwebtoken');
const { verifyHashedPassword } = require("./crypto");

/**
 * Creates a new jwt using the predefined settings and adding the given payload
 *
 * @param payload object - contains values that will be added to the jwt
 * @returns string - the jwt
 */
async function signNewToken(payload){
    let options = {
        'expiresIn': process.env.TOKEN_TIME_TO_LIVE_IN_DAYS * 60 * 60 * 24,
        'algorithm': 'HS512'
    };

    return  jwt.sign(payload, process.env.TOKEN_SECRET, options);
}

/**
 * Authenticates the user and provides a jwt
 *
 * @param username string
 * @param plaintextPassword string
 * @returns string / boolean - a jwt if succesful or a boolean false if an error occurs
 */
async function issueNewToken(username, plaintextPassword){
    // The password matches the stored one
    if(await verifyHashedPassword(plaintextPassword, clientData.nom_password)){
        let payload = {
            "samplePayload": "something"
        };

        return await signNewToken(payload);
    }

    else {
        throw Error("An error occurred during the login process, verify that the credential are correct.");
    }
}

module.exports.issueNewToken = issueNewToken;