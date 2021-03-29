let express = require("express");
let router = express.Router();
let contactModel = require("../../Schema/contactModel");
let authUserJwt = require("../../Middleware/authUserJWT");
let tryCatchMiddleware = require("../../Middleware/tryCatchMiddleware");
let multer = require("multer");
let imagePort = "http://localhost:4500";


let storage = multer.diskStorage({
    destination: function( req, file, cb){
        cb( null, "./ContactPhotos/");
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

router.post("/addContact",uploads.single("profilePhoto"),tryCatchMiddleware(async(req,res)=>{

    console.log("add contact",req.body);
    console.log("add",req.file)
    let {error} = contactModel.Validation(req.body);
    console.log(error);
    if(error){ return error.details[0].message};

    let newContact = new contactModel.contactModel({
    userEmailId:req.body.userEmailId,
    name: req.body.name,
    mobileNo: req.body.mobileNo, 
    
    profilePhoto: req.file == undefined ? null: imagePort + "/ContactPhotos/" + req.file.filename , 
    emailId: req.body.emailId,
    address: req.body.address,
    }); 

    let addContact=await newContact.save();
    res.send(addContact);
}))

router.patch("/updateContactDetails/:contactId", uploads.single('profilePhoto'), tryCatchMiddleware(async(req, res)=>{
    console.log("update photo",req.file);
    console.log(req.body);


    let {error} = contactModel.Validation(req.body);
    console.log("update contact error",error);
    if(error){ return error.details[0].message};

    let data = await contactModel.contactModel.findByIdAndUpdate(req.params.contactId,{
        profilePhoto:req.file == undefined?null: imagePort + "/ContactPhotos/" + req.file.filename,
        userEmailId:req.body.userEmailId,
        name: req.body.name,
        mobileNo: req.body.mobileNo, 
        emailId: req.body.emailId,
        address: req.body.address,},{new:true} 
         )
         console.log("user updated details",data);
        if(!data){ return res.status(404).send({message: "Cannot Update Contact Details"})}

        res.send(data);

}));

router.get("/contactList",authUserJwt,tryCatchMiddleware(async(req,res)=>{
    console.log("contact List", req.userDetails.emailId);
    let data =await contactModel.contactModel.find({"userEmailId":req.userDetails.emailId});
    if(!data){return res.status(404).send({message:"Not Found"})};
    console.log(data);
    res.send(data);
}))

router.get("/getIndividualContactDetails/:contactId", authUserJwt, tryCatchMiddleware(async(req,res)=>{
    let data =await contactModel.contactModel.findById(req.params.contactId);
    if(!data){return res.status(404).send({message:"Not Found"})};
    res.send(data);
}))
router.delete("/deleteContactNumber/:contactId",tryCatchMiddleware(async(req,res)=>{
    await contactModel.contactModel.findByIdAndDelete(req.params.contactId);
    res.send("Contact Number Deleted Successfully");
}))
module.exports = router;