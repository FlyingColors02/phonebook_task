let express =  require("express");
let router = express.Router();
let uModel = require("../../Schema/userModel");
let tryCatchMiddleware = require("../../Middleware/tryCatchMiddleware");
let authUserJWT = require("../../Middleware/authUserJWT");

router.get("/loggedInUser", authUserJWT, tryCatchMiddleware( async(req, res)=>{
    console.log("in logged in user",req.userDetails.emailId)
    let userDetails = await uModel.userModel.findById(req.userDetails._id).select("-userLogin.password");
    if(!userDetails) { return res.status(402).send({message: ""})}
    res.send(userDetails);
}))

module.exports = router;