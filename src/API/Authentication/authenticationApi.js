import axios from "axios";
import {authUser} from "../../Helpers/currentUser";
export const config = {
    headers:{
        "Content-Type": "application/json"
    }
   
};



export const userLogin = async(item) => {

        let LOGIN_ENDPOINT = "http://localhost:4500/api/userLogin/login";
        let response = await axios.post(LOGIN_ENDPOINT,JSON.stringify(item),config);
        console.log(response.data);
        return response;
   
};


export const userRegistration = async(item) => {
    
    let REGISTRATION_ENDPOINT = "http://localhost:4500/api/userRegistration/register";
    let response = await axios.post(REGISTRATION_ENDPOINT,item,config);
    console.log(response.data);
    return response;

};

export const changeMobileNo =  async(item) => {
    let MOBILE_NUMBER_ENDPOINT = "http://localhost:4500/api/authenticate/changeMobileNumber";
    let response = await axios.put(MOBILE_NUMBER_ENDPOINT, JSON.stringify(item),config);
    console.log(response.data);
    return response; 
}

export const changePassword =  async(item) => {
    let PASSWORD_ENDPOINT = "http://localhost:4500/api/updateUserDetails/changePassword";
    let response = await axios.patch(PASSWORD_ENDPOINT, JSON.stringify(item),config);
    console.log(response.data);
    return response; 
}

export const changeUserName = async(item) => {
    let USER_NAME_ENDPOINT = "http://localhost:4500/api/authenticate/changeUserName";
    let response = await axios.put(USER_NAME_ENDPOINT, JSON.stringify(item),config);
    console.log(response.data);
    return response;
}

export const loggedInUser = async() => {

    let LOGGEDIN_ENDPOINT = "http://localhost:4500/api/authenticate/loggedinuser";
    let response = await axios.get(LOGGEDIN_ENDPOINT,{ headers: authUser(), "Content-Type": "application/json"});
    return response;

}

export const deleteUserAccount = async(data) => {

    let DELETE_USER_ACCOUNT_ENDPOINT = "http://localhost:4500/api/authenticate/deleteAccount";
    let response = await axios.delete(DELETE_USER_ACCOUNT_ENDPOINT,{ headers: authUser(),data, "Content-Type": "application/json"});
    return response;

}