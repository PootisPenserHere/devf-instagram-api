const Users =  require('../schemas/Users');
const { signin } = require("../models/auth");

async function signup(_,args,context,info){
    return Users.create(args.data).then(async (user) => {
        /*
        Since the user has already been created we can re use the login method
        and directly query the newly created user to issue their token alongside
        their sign up process
         */
        let token = await signin(user.email,user.password);
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