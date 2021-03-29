const mongoose = require("mongoose");
const Joi = require("@hapi/joi");
let jwt = require("jsonwebtoken");
let config = require("config");
const JoiPhoneNumber = Joi.extend(require("joi-phone-number"));
let mongooseTypePhone = require("mongoose-type-phone");


let userSchema = new mongoose.Schema({
    name:{type:String,min:3,required:true},
    mobileNo:{type: mongooseTypePhone.Phone },
    userLogin:{
        emailId:{type:String,min:10,max:30,required:true, lowercase: true},
        password:{type:String,min:8,max:50}
    },
    resetPasswordToken : {type:String},
    resetPasswordExpires :{type:Date},
    userPhoto: {type:String, min:2, max:500},
    recordDate: {type:Date, default:Date.now()},
    recordUpdate : {type:Date, default:Date.now()}
});

userSchema.methods.jwtToken = function(){
    let token = jwt.sign({_id:this._id,emailId: this.userLogin.emailId},config.get("ENV_PASSWORD"));
    return token;
}

let userModel = mongoose.model("userdetails",userSchema);

 function Validation(data){
    let Schema = Joi.object({
        name:Joi.string().min(4).required(),
        mobileNo: JoiPhoneNumber.string().phoneNumber(),
        userLogin: Joi.object().keys({
            emailId:Joi.string().email().min(10).max(25).required(),
            password: Joi.string().min(8).max(25).required(),
            confirmPassword: Joi.string().required().valid(Joi.ref('password')).messages({'any.only': 'ConfirmPassword must match Password'})
    }),
    userPhoto:  Joi.any().meta({swaggerType: 'file'}).allow('').description('image file'),
        recordDate: Joi.date(),
        recordUpdate: Joi.date()
    });
    return Schema.validate(data);
}

function ValidatePhoto(data){
    let Schema = Joi.object().keys({
    userPhoto:  Joi.any().meta({swaggerType: 'file'}).allow('').description('image file'),
    });
    return Schema.validate(data)
}

function ValidatePhoneNumber(data){
    let Schema= Joi.object().keys({
        mobileNo: JoiPhoneNumber.string().phoneNumber(),
    });
    return Schema.validate(data);
}
function ValidationLogin(data){
    let Schema = Joi.object().keys({
        emailId:Joi.string().email().min(10).max(25).required(),
        password: Joi.string().min(8).max(25).required().strict() 
          
    });
    return Schema.validate(data);
}

function ValidationEmail(data){
    let Schema = Joi.object().keys({
        emailId:Joi.string().email().min(10).max(25).required(),
    });
    return Schema.validate(data);
}

function ValidationPassword(data){
    let Schema = Joi.object().keys({
        password: Joi.string().min(8).max(25).required().strict(), 
        confirmPassword: Joi.string().required().valid(Joi.ref('password')).messages({'any.only': 'ConfirmPassword must match Password'})
    });
    return Schema.validate(data);
}



module.exports = { userModel, Validation,ValidationLogin, ValidationEmail,ValidatePhoto,
     ValidationPassword,ValidatePhoneNumber}