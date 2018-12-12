const InstagramPosts  = require("../schemas/InstagramPosts")

function prueba(_, args, context, info) {
    return "Esto es una prueba en graphql";
}

function postsByUser(_,args,data,context) {
    return InstagramPosts.find({ user_id: args.id }).then(
        (response) => {
            return response;
        }
    );
}

module.exports = {
    prueba,
    postsByUser
};
