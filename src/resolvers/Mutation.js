const Users =  require('../schemas/Users');
const { signin } = require("../models/auth");
const InstagramPost  = require('../schemas/InstagramPosts');

async function signup(_,args,context,info){
    return Users.create(args.data).then(async (user) => {
        /*
        Since the user has already been created we can re use the login method
        and directly query the newly created user to issue their token alongside
        their sign up process
         */
        let token = await signin(user.email, args.data.password);
        return {token}

    }).catch((err) => {
        throw  new Error(err)
    })
}

async function login(_,args,context,info){
    let token = await signin(args.email,args.password);
    return {token};
}

function createInstagramPost(_, args, context, info) {

    return InstagramPost.create( args.data ).then(
        (response) => {
            console.log('Post created with id: ', response._id, "Response: ", response);
            return response.toString();
        },
        (err) => {
            throw new Error( err );
        }
    );
}

function findPostByUserId(_, args, context, info){
    return {};
}

module.exports = {
    signup,
    login,
    createInstagramPost,
    findPostByUserId
};
