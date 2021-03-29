const mongoose = require("mongoose");
const Joi = require("@hapi/joi");
const JoiPhoneNumber = Joi.extend(require("joi-phone-number"));
let mongooseTypePhone = require("mongoose-type-phone");

let contactSchema = new mongoose.Schema({
    userEmailId:{type:String,min:10,max:30,lowercase:true,required:true},
    name:{ type:String, min:3, required:true},
    // phoneNumberArray:[{
    //     phoneNumber:{type: mongooseTypePhone.Phone }
    // }], 
    mobileNo:{type: mongooseTypePhone.Phone,required:true}, 
    profilePhoto:{type:String,min:2,max:500}, 
    emailId:{ type:String, min:10, max:30, lowercase: true},
    address:{ type:String, min:2, max:30, lowercase:true},
    recordDate: { type:Date, default:Date.now()},
    recordUpdate : { type:Date, default:Date.now()}
});



let contactModel = mongoose.model("contactdetails",contactSchema);

 function Validation(data){
    let Schema = Joi.object().keys({
        userEmailId:Joi.string().email().min(10).max(30).required(),
        name:Joi.string().min(3).required(),
        // phoneNumberArray: Joi.array({
        //     phoneNumber:JoiPhoneNumber.string().phoneNumber(),
        // }).required(),
        mobileNo: JoiPhoneNumber.string().phoneNumber().required(),
        profilePhoto:  Joi.any().meta({swaggerType: 'file'}).allow('').description('image file'),
        address: Joi.string().min(2).max(30),
        emailId:Joi.string().email().min(10).max(30).allow(''),
        recordDate: Joi.date(),
        recordUpdate: Joi.date()
    });
    return Schema.validate(data);
}


module.exports = { contactModel, Validation }