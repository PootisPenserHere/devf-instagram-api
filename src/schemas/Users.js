const mongoose =  require('mongoose');
const { hashPassword } = require("../services/crypto");

const Schema =  mongoose.Schema;

const UserSchema = new Schema({
    first_name:{
        type:String,
        required:true
    },
    last_name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    birth_date:{
        type:Date
    },
    gender:{
        type:String,
        enum:["Male","Female"]
    },
    nationality:{
        type:String
    },
    is_active:{
        type:Boolean,
        default:true
    }

},{'collection':'users','timestamps':true});

UserSchema.pre('save', async function(next){
    let user = this;

    if(!user.isModified('password')){
        return next();
    }

    try {
        user.password = await hashPassword(user.password);

        return next()
    } catch(err){
        return next(err)
    }
});

module.exports = mongoose.model('users',UserSchema);