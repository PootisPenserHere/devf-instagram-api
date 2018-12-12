const Users = require('../schemas/Users');
const { signNewToken, verifyJwt } = require("../services/jwt");
const { verifyHashedPassword } = require("../services/crypto");

/**
 * Creates a new jwt based on the User object
 *
 * @param user object
 * @returns string - a jwt
 */
async function issueToken(user) {
    const  payload = {
        id:user._id,
        email:user.email,
        first_name:user.first_name
    };

    return await signNewToken(payload);
}

/**
 * Obtains the data of one user based on their email
 *
 * @param email string
 * @returns object
 */
async function userDataByEmail(email) {
    let data = '';

    try {
       data  =  Users.findOne({email:email})
    } catch(err) {
        console.log(err);
    }

    if(!data) {
        throw Error("Unable to find the user, verify that the username and password are correct.")
    }

    return data;
}

/**
 * Checks the provided plaintext password for a given user against the one they have
 * currently
 *
 * @param email string
 * @param plaintextPassword string
 * @returns string - a jwt
 */
async function signin(email, plaintextPassword) {
    let userData = await userDataByEmail(email);

    if(await verifyHashedPassword(plaintextPassword, userData.password)) {
        console.log(userData);
        return issueToken(userData);
    } else {
        throw Error("Unable to find the user, verify that the username and password are correct.")
    }
}

/**
 * A sort of middleware that will look for a jwt in the headers and if it's present it'll
 * add the data of the user to the context object
 *
 * @param request object - the context of the request
 * @returns object - contains the data from the user collection from the requesting user
 */
async function verifyToken(request) {
    let Authorization = request.get('Authorization');

    if(Authorization){
        let token  =  Authorization.replace('JWT ','');
        let payload = verifyJwt(token);
        return   Users.findOne({_id:payload.id});
    }
}

module.exports.signin = signin;
module.exports.verifyToken = verifyToken;