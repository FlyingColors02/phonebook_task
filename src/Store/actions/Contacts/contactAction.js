import {ADD_CONTACT,DELETE_CONTACT,UPDATE_CONTACT,LOADING,CONTACT_LIST,INDIVIDUAL_CONTACT, CONTACT_ERROR} from "./contact.type.js";
import { AddContact, updateContactDetails, deleteContactNumber, getIndividualContactDetails,getUserContactList } from "../../../API/Contacts/contactApi";
import history from "../../../Shared/History/index";

export const addContactAction = (data) => {
    return async dispatch => {
        dispatch({type : LOADING});
        try{
            let response = await AddContact(data);
            console.log(response);
            dispatch({type: ADD_CONTACT, payload: response.data});
           
            history.push(`/contactDetails/${response.data._id}`);

            window.location.reload();
        }
        catch(error){
            console.log(error);
            dispatch({type: CONTACT_ERROR, payload: error.response})
        }
        
    }
}

export const getUserContactListAction = ()=>{
    return async(dispatch)=>{
        dispatch({type: LOADING});
        try{
            let response = await getUserContactList();
            console.log(response);
            dispatch({type: CONTACT_LIST, payload: response.data});
        }
        catch(error){
            dispatch({type: CONTACT_ERROR, payload:error.response});
        }
    }
}

export const updateUserContactAction = (id,data)=>{
    return async(dispatch)=>{
        dispatch({type:LOADING});

        try{

            let response = await updateContactDetails(id,data);
            dispatch({type: UPDATE_CONTACT, payload: response.data });
            history.push(`/contactDetails/${response.data._id}`);

            window.location.reload();

        }
        catch(error){
            dispatch({type: CONTACT_ERROR, payload: error.response});
        }
    }
}

export const deleteUserContactAction = (data)=>{
    return async(dispatch)=>{
        dispatch({type:LOADING});

        try{

            let response = await deleteContactNumber(data);
            dispatch({type: DELETE_CONTACT, payload: response.data });
            history.push("/contactList");
            window.location.reload();

        }
        catch(error){
            dispatch({type: CONTACT_ERROR, payload: error.response});
        }
    }
}

export const getIndividualUserContact = (data)=>{
    return async(dispatch)=>{
        dispatch({type:LOADING});

        try{

            let response = await getIndividualContactDetails(data);
            dispatch({type: INDIVIDUAL_CONTACT, payload: response.data });

        }
        catch(error){
            dispatch({type: CONTACT_ERROR, payload: error.response});
        }
    }
}