const mongoose =  require('mongoose');

const Schema =  mongoose.Schema

const PostSchema =  new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    title: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    likes: [
        {
            user_id: {
                type:Schema.Types.ObjectId,
                ref: "users"
            }
        }],
    comments: [
        {
            user_id: {
                type:Schema.Types.ObjectId,
                ref: "users"
            },
            comment: {
                type: String
            }
        }
    ],
    is_active: {
        type: Boolean
    }
},{'collection':'instagramposts', 'timestamps': true});

mongoose.Types.ObjectId.prototype.valueOf = function() {
    return this.toString();
}

module.exports =  mongoose.model('instagramposts',PostSchema);
