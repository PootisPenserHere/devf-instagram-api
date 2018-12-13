const InstagramPosts  = require("../schemas/InstagramPosts")

function prueba(_, args, context, info) {
    return "Esto es una prueba en graphql";
}

function getAllPosts(_,args,data,context) {
    return InstagramPosts.find({ is_active: true }).then(
        (response) => {
            return response;
        }
    );
}

module.exports = {
    prueba,
    getAllPosts
};
