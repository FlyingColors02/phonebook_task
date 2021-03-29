let express = require("express");
let router = express.Router();
let bcryptjs = require("bcryptjs");
let uModel = require("../../Schema/userModel");
let nodemailer = require("nodemailer");
let authUserJwt = require("../../Middleware/authUserJWT");
let tryCatchMiddleware = require("../../Middleware/tryCatchMiddleware");
let multer = require("multer");
let imagePort = "http://localhost:4500";


let storage = multer.diskStorage({
    destination: function( req, file, cb){
        cb( null, "./UserPhotos/");
    },
    filename: function( req, file, cb){
        cb( null, Date.now()+file.originalname);
    }
});

const fileFilter = (req, file, cb)=>{
if( file.mimetype === "image/jpg" || file.mimetype === "image/jpeg" 
|| file.mimetype === "image/png" || file.mimetype === "image/tiff" 
 || file.mimetype === "image/pdf" )
{
    cb( null, true);
}
else{
    cb( null, false);
};
}

let uploads = multer({
storage: storage,
limits:{
    fileSize: 1024 * 1024 * 4
},
fileFilter: fileFilter
});


router.post("/register",uploads.single('userPhoto'), tryCatchMiddleware(async( req, res) => {

    console.log(req.file);
    console.log(req.body)
    //validating data
    let {error} = uModel.Validation(req.body);
    if(error){return res.send(error.details[0].message)};

    console.log(req.body);
     //check if user already registered
     let user = await uModel.userModel.findOne({"userLogin.emailId": req.body.userLogin.emailId});
     if(user){return res.status(403).send({message:"EmailId already Registered. LOGIN Please !!"})};
 
    //for new registration
    let newRegistration = new uModel.userModel({
        name: req.body.name,
        mobileNo: req.body.mobileNo,
        userLogin: req.body.userLogin,
        userPhoto: imagePort + "/UserPhotos/" + req.file.filename ,
    });

     
    //encrypting data before saving it
    let Salt = await bcryptjs.genSalt(10);
    newRegistration.userLogin.password = await bcryptjs.hash(newRegistration.userLogin.password,Salt);

    //after data encryption and before saving data->jwt
    let jwt = newRegistration.jwtToken();

     //saving data
     let registrationData = await newRegistration.save();
     res.send({message:"Registration Successful !!", data:registrationData, token: jwt});
 

   
    //sending mail 
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: "true", //true for 465 and false for others
        auth:{
            user:"learnnew00@gmail.com",
            pass:"learnNew@123"
        }
    });
    if(!transporter){ return res.status(200).send({message:"Transporter not Valid !!"})};

    let mailContent = {
        from: "'PhoneBook:'<learnnew00@gmail.com>",
        to: newRegistration.userLogin.emailId,
        subject: "WELCOME TO PhoneBook.",
        text: "WELCOME To PhoneBook !! \n We are glad you want use PhoneBook. Hope you like all the features."
    }

    transporter.sendMail(mailContent,(error,info)=>{
        if(error){ return console.log(error)};
        console.log({message:`message send: ${info.messageId}`,token:token,data:user});
    });
    

}));

router.delete("/deleteAccount", authUserJwt, tryCatchMiddleware( async ( req, res) => {
    console.log(req.body);
    console.log(req.userEmailId.emailId);
    //validate emailId
    let validateEmailId = uModel.ValidationPassword(req.body);
    if(validateEmailId.error){ return res.send(validateEmailId.error.details[0].message)};

    //authenticate user EmailId
    let userEmailId = await uModel.userModel
        .findOne({"userLogin.emailId":req.userDetails.emailId});
    if(!userEmailId){return res.status(403).send({message:"Invalid EmailId !!"})};

    //authenticate password
    let userPassword = await bcryptjs
        .compare(req.body.password,userEmailId.userLogin.password)
    if(!userPassword){return res.status(403).send({message:"Invalid Password !!"})};

    await uModel.userModel.findOneAndDelete({"userLogin.emailId":req.userDetails.emailId});
    res.send({message:"Deleted Account Successfully !!"})
}));

module.exports = router;