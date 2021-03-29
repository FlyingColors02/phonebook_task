let express = require("express");
let router = express.Router();
let bcryptjs = require("bcryptjs");
let uModel = require("../../Schema/userModel");
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



router.put("/changeUserPhoto", uploads.single('userPhoto'), tryCatchMiddleware(async(req, res)=>{
    console.log("change photo",req.file);
    console.log(req.body);


    let {error} = uModel.ValidatePhoto(req.body);
    console.log(error);
    if(error){ return error.details[0].message};

    let data = await uModel.userModel.findOneAndUpdate({"userLogin.emailId":req.body.emailId},{
        userPhoto: imagePort + "/UserPhotos/" + req.file.filename},{new:true} 
         )
         console.log("user changed photo",data);
        if(!data){ return res.status(404).send({message: "Cannot Change Profile Photo"})}

        res.send(data);

}));


router.patch("/changePassword", tryCatchMiddleware(async(req, res)=>{
    console.log("in delivery",req.body)
    let {error} = uModel.ValidationLogin(req.body);
    if(error){ return error.details[0].message};

    //encrypting data before saving it
    let Salt = await bcryptjs.genSalt(10);
    req.body.password = await bcryptjs.hash(req.body.password,Salt);

    let data = await uModel.userModel.findOne({"userLogin.emailId":req.body.emailId});
        if(!data){ return res.status(404).send({message: "Cannot Change Password"})}
        console.log("password changed",data);
        data.userLogin.password = req.body.password;
        data.save();
        res.send(data);

}))

router.put("/changeMobileNumber", tryCatchMiddleware(async(req, res)=>{
    console.log("in change Mobile Number",req.body)
    
    let data = await uModel.userModel.findOneAndUpdate({"userLogin.emailId":req.body.emailId},{
        mobileNo: req.body.mobileNo}
         ,{new:true})
       
        if(!data){ return res.status(404).send({message: "Cannot Change Mobile Number"})}
        console.log("change mobile number",data);
        res.send(data);

}))

router.put("/changeUserName", tryCatchMiddleware(async(req, res)=>{
    console.log("in change UserName",req.body)
    
    let data = await uModel.userModel.findOneAndUpdate({"userLogin.emailId":req.body.emailId},{
        name: req.body.userName }
         ,{new:true})
        console.log("change user name",data);
        if(!data){ return res.status(404).send({message: "Cannot Change Mobile Number"})}

        res.send(data);

}))

module.exports = router;