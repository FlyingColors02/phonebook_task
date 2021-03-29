let express = require("express");
let Registration = require("../Api/AuthenticateUser/RegistrationApi");
let Login = require("../Api/AuthenticateUser/loginApi");
let sendMail = require("../Api/ResetPassword/sendMailApi");
let resetPassword = require("../Api/ResetPassword/resetPasswordApi");
let loggedIn = require("../Api/AuthenticateUser/loggedInApi");
let updateUserDetails = require("../Api/UpdateUserDetails/updateUserDetailsApi");
let userContact = require("../Api/UserContact/userContactsApi");
let error = require("../Exception/handleError");


module.exports = function(app){
    //to see photo on browser need static function
    app.use("/UserPhotos",express.static("UserPhotos"));
    app.use("/ContactPhotos",express.static("ContactPhotos"));
    //routes 
    app.use("/api/userRegistration",Registration);
    app.use("/api/userLogin",Login);
    app.use("/api/authenticate",loggedIn);
    app.use("/api/resetPassword",sendMail);
    app.use("/api/resetPassword",resetPassword);
    app.use("/api/updateUserDetails",updateUserDetails);
    app.use("/api/userContact", userContact);
    app.use(error);

};