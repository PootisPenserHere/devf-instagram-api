const Users =  require('../schemas/Users');
const { signNewToken } = require("../services/jwt");

async function signup(_,args,context,info){
    return Users.create(args.data).then(async (user) => {

        let payload = {email: user.email};
        let token = await signNewToken(payload);
        return {token}

    }).catch((err) => {
        throw  new Error(err)
    })
}

module.exports = {
    signup
};