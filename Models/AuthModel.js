const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')
const AuthSchema = new mongoose.Schema({
    email:{
    type:String,
    required:[true , "email is required"],
    unique:true,
    validate:[validator.isEmail , "invalid email address"]
    },
    username:{
    type:String,
    required:[true , "username is required"],
    unique:true,
    validate:[validator.isAlpha , "username only contains a-z or A-Z"]
    },
    password:{
        type:String,
        required:[true , "password is required"],
        validate: {
            validator: (value) =>
              validator.isStrongPassword(value, {
                minLength: 6,
                minUppercase: 1,
                minNumbers: 2,
                minLowercase: 1,
                minSymbols: 0,
              }),
              message:"Password must be at least 6 characters long, include at least one uppercase letter, two numbers, and one lowercase letter."
          },
    },
    resetpasstoken:{
        type:String
    },
    resetpasstokenexpires:{
        type:Date
    },
    role:{
        type:String,
        required:[true , "role is required"],
    }

},{timestamps:true})
AuthSchema.pre('save' , async function (next){
    const user = this
    if(!user.isModified('password')){
        return next()
    }
    try{
        user.password = await bcrypt.hash(user.password , 10)
    }
    catch(err){
        next(e)
    }
})
AuthSchema.methods.comparePasswrod = async (pass , dbpass) => {
   return await bcrypt.compare(pass , dbpass)
}

const AuthModel = mongoose.model('users' , AuthSchema)

module.exports = AuthModel