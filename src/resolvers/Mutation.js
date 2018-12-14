const Users =  require('../schemas/Users');
const { signin } = require("../models/auth");
const InstagramPost  = require('../schemas/InstagramPosts');

async function signup(_,args,context,info){
    return await Users.create(args.data).then(async (user) => {
        /*
        Since the user has already been created we can reuse the login method
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
    if(!context.user) {
        throw new Error("Authentication is required");
    }

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

function saveLikedActionPost(_,args,context,info){
    if(!context.user) {
        throw new Error("Authentication is required");
    }

    return InstagramPost.findOneAndUpdate({_id: args.postID}, {$set: {likes: {user_id:[args.user_id]}}}).then(
        response => {
            return response.toString();
        }
    );
}

module.exports = {
    signup,
    login,
    createInstagramPost,
    saveLikedActionPost
};
