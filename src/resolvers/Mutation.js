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

    InstagramPost.findOne(
        {
            _id: args.postID
        },
        (err, res) => {
            if(err) return err;

            return new Promise( (resolve, reject)=> {
                try {
                    for(const key of res.likes) {
                        if(key.user_id == args.user_id)
                            resolve(true);
                    }
                    resolve(false);
                } catch (error) {
                    throw new Error(error);
                }
            })
            .then(itemFound => {

                if( typeof itemFound === 'boolean' && itemFound == false) {    /**<----ITEM NOT FOUND INTO ARRAY */
                    return InstagramPost.updateOne(
                        {
                            _id: args.postID
                        },
                        {
                            $push: { likes: {'user_id': args.user_id} }
                        },
                        function(err, raw) {
                            if(err) return 'Error al actualizar:' + err;
                            return true;
                        }
                    );
                }
            })
            .catch(err => {
                console.log('ERROR: ', err);
            });
        }
    );
}

module.exports = {
    signup,
    login,
    createInstagramPost,
    saveLikedActionPost
};
