const Users = require('../schemas/Users');

function signup(_,args,context,info){
    return Users.create(args.data).then((user) => {
        let token =  user;
        return {token}
    }).catch((err) => {
        throw  new Error(err)
    })

}

module.exports = {
    signup
};