const bcrypt = require('bcrypt');

/**
 * Securely protects a password for cold storage
 *
 * @param plaintextPassword string
 * @returns string - the hashed password
 */
async function hashPassword(plaintextPassword){
    try {
        let cost = process.env.SALT_COST;
        cost = parseInt(cost);

        return await new Promise((resolve, reject) => {
            bcrypt.hash(plaintextPassword, cost, function (err, hash) {
                if (err) reject(err);
                resolve(hash)
            });
        });
    } catch(err) {
        throw Error("An error occurred during the login process, please contact the system administrator.");
    }
}

/**
 * Compares the plaintext password provided against the hashed one to determine if they match
 *
 * @param plaintextPassword string
 * @param hashedPassword string
 * @returns boolean
 */
async function verifyHashedPassword(plaintextPassword, hashedPassword){
    try {
        return await new Promise((resolve, reject) => {
            bcrypt.compare(plaintextPassword, hashedPassword, function (err, res) {
                if (err) reject(err);
                resolve(res)
            });
        });
    } catch(err) {
        throw Error("An error occurred during the login process, please contact the system administrator.");
    }
}

module.exports.hashPassword = hashPassword;
module.exports.verifyHashedPassword = verifyHashedPassword;