import {USER_LOGIN, LOADING, USER_REGISTRATION, USER_ERROR, LOG_OUT, LOGGED_IN_USER,ADDRESS, PASSWORD, MOBILE_NUMBER, USER_NAME, DELETE_USER_ACCOUNT} from "./authentication.type";
import {userLogin, userRegistration, loggedInUser, changePassword, changeMobileNo, changeUserName, deleteUserAccount} from "../../../API/Authentication/authenticationApi";
import history from "../../../Shared/History/index";

export const LoggedInAction = () => {
    return async dispatch => {
        dispatch({type: LOADING});
        try{
            let response = await loggedInUser();
            dispatch({ type: LOGGED_IN_USER, payload: response.data});
        }
        catch(error){
            console.log(error);
            dispatch({ type: USER_ERROR, payload: error.response.data});
        }
        
        
    }
}

export const LoginAction = (data) => {
    return async dispatch => {
        dispatch({type : LOADING});
        try{
            let response = await userLogin(data);
            console.log(response);
            localStorage.setItem("user",JSON.stringify(response.data));
            dispatch({type: USER_LOGIN, payload: response.data});
            history.push("/contactList");
            window.location.reload();

        }
        catch(error){
            console.log(error);
            dispatch({type: USER_ERROR, payload: error.response.data})
        }
        
    }
}


export const changeUserNameAction = (data) => {
    return async dispatch => {
        dispatch({type : LOADING});
        try{
            let response = await changeUserName(data);
            console.log(response);
            dispatch({type: USER_NAME, payload: response.data});
           window.location.reload();
        }
        catch(error){
            console.log(error);
            dispatch({type: USER_ERROR, payload: error})
        }
        
    }
}


export const changePasswordAction = (data) => {
    return async dispatch => {
        dispatch({type : LOADING});
        try{
            let response = await changePassword(data);
            console.log(response);
            dispatch({type: PASSWORD, payload: response.data});
            localStorage.removeItem("user");
        history.push("/login");
        window.location.reload();
        }
        catch(error){
            console.log(error);
            dispatch({type: USER_ERROR, payload: error.response.data})
        }
        
    }
}

export const changeUserMobileNumberAction = (data) => {
    return async dispatch => {
        dispatch({type : LOADING});
        try{
            let response = await changeMobileNo(data);
            console.log(response);
            dispatch({type: MOBILE_NUMBER, payload: response.data});
            window.location.reload();
        }
        catch(error){
            console.log(error);
            dispatch({type: USER_ERROR, payload: error.response.data})
        }
        
    }
}

export const RegistrationAction = (data) => {
    return async dispatch => {
        dispatch({type : LOADING});
        try{
            let response = await userRegistration(data);
            console.log(response);
            dispatch({type: USER_REGISTRATION, payload: response.data});
           
            history.push("/login");

            window.location.reload();
        }
        catch(error){
            console.log(error);
            dispatch({type: USER_ERROR, payload: error.response.data})
        }
        
    }
}

export const LogoutAction = () => {
    return async dispatch => {
        localStorage.removeItem("user");
        dispatch({type: LOG_OUT});
        history.push("/login");
        window.location.reload();
    }
}

export const deleteUserAccountAction = (data) => {
    return async dispatch => {
        dispatch({type : LOADING});
        try{
            let response = await deleteUserAccount(data);
            console.log(response);
            dispatch({type: DELETE_USER_ACCOUNT, payload: response.data});
        }
        catch(error){
            console.log(error);
            dispatch({type: USER_ERROR, payload: error.response.data})
        }
        
    }
}
