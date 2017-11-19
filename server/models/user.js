const mongoose = require('mongoose');
const validator=require('validator');
const jwt = require('jsonwebtoken');
const _=require('lodash');

let userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        minlength: 1,
        trim: true,
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: '{VALUE} is not a valid email'
        }
    },
    password: {
        type: String,
        require: true,
        minlength: 6
    },
    tokens: [
        {
            access: {
                type: String,
                required: true
            },
            token: {
                type: String,
                required: true
            }
        }
    ]
});

//It's automatically called when we respond to the express request with res.send.
userSchema.methods.toJSON=function(){
    let user=this;
    let userObject=user.toObject();

    return _.pick(userObject,['_id','email']);
}

//Método de instancia de User
//Funcion clasica porque hacemos referencia a this, y con => no funcionaria
userSchema.methods.generateAuthToken=function(){
    let user=this;

    let access='auth';
    let token=jwt.sign({_id:user._id.toHexString(),access},'abc123').toString();

    user.tokens.push({access,token});

    //devuelve una promise
    return user.save().then(()=>{
        return token;
    });
}

let User = mongoose.model('User',userSchema);

module.exports={User};