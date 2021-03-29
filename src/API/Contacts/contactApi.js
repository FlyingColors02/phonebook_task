import axios from "axios";
import {authUser} from "../../Helpers/currentUser";
export const config = {
    headers:{
        "Content-Type": "application/json"
    }
   
};



export const AddContact = async(contactDetails) =>{

    let ADD_CONTACT_ENDPOINT = "http://localhost:4500/api/userContact/addContact";
    let response = await axios.post(ADD_CONTACT_ENDPOINT,contactDetails,config);
    return response;
}

export const getUserContactList = async ()=>{
    let GET_CONTACT_LIST_ENDPOINT = "http://localhost:4500/api/userContact/contactList";
    let response = await axios.get(GET_CONTACT_LIST_ENDPOINT,{headers:authUser(),"Content-Type":"application/json"});
    return response;
}

export const getIndividualContactDetails = async(contactId)=>{
    let GET_INDIVIDUAL_CONTACT_DETAILS_ENDPOINT = `http://localhost:4500/api/userContact/getIndividualContactDetails/${contactId}`;
    let response =await axios.get(GET_INDIVIDUAL_CONTACT_DETAILS_ENDPOINT,{headers:authUser(), "Content-Type":"application/json"});
    return response;
}

export const deleteContactNumber = async(contactId)=>{
    let DELETE_ACCOUNT_ENDPOINT = `http://localhost:4500/api/userContact/deleteContactNumber/${contactId}`;
    let response =await axios.delete(DELETE_ACCOUNT_ENDPOINT,{headers:authUser(),"Content-Type":"application/json"});
    return response;
}

export const updateContactDetails = async(id,contactDetails)=>{
    let UPDATE_CONTACT_DETAILS_ENDPOINT = `http://localhost:4500/api/userContact/updateContactDetails/${id}`;
    let response =await axios.patch(UPDATE_CONTACT_DETAILS_ENDPOINT,contactDetails, {headers:authUser(),"Content-Type":"application/json"});
    return response;
}