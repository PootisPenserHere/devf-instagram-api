const Users = require('../schemas/Users');
const { signNewToken } = require("../services/jwt");
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

    if(verifyHashedPassword(plaintextPassword, userData.password)) {
        return issueToken(userData);
    } else {
        throw Error("Unable to find the user, verify that the username and password are correct.")
    }
}

module.exports.signin = signin;