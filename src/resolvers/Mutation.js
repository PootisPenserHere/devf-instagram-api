const Users =  require('../schemas/Users');
const { signNewToken } = require("../services/jwt");
const { signin } = require("../models/auth");

async function signup(_,args,context,info){
    return Users.create(args.data).then(async (user) => {

        let payload = {email: user.email};
        let token = await signNewToken(payload);
        return {token}

    }).catch((err) => {
        throw  new Error(err)
    })
}

async function login(_,args,context,info){
    let token = await signin(args.email,args.password);
    return {token};
}

module.exports = {
    signup,
    login
};