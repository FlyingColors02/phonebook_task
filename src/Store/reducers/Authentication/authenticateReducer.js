import { LOADING, USER_LOGIN, USER_ERROR,  USER_REGISTRATION, LOG_OUT, ADDRESS, DELETE_USER_ACCOUNT } from "../../actions/Authentication/authentication.type";

export const LoginReducer = (state={}, action) => {
    switch(action.type) {
        case LOADING:
            return { loading: true};
        case USER_LOGIN:
            return {data: action.payload, loading: false};
        case USER_ERROR:
            return {error: action.payload};
        case LOG_OUT:
            return {removeuser: true};
        default:
            return state;
    }
}

export const RegistrationReducer = (state={}, action) => {
    switch(action.type) {
        case LOADING:
            return { loading: true};
        case USER_REGISTRATION:
            return {data: action.payload, loading: false};
        case USER_ERROR:
            return {error: action.payload}
        default:
            return state;
    }
}


export const DeleteUserAccountReducer = (state={}, action) => {
    switch(action.type) {
        case LOADING:
            return { loading: true};
        case DELETE_USER_ACCOUNT:
            return {data: action.payload, loading: false};
        case USER_ERROR:
            return {error: action.payload};
        default:
            return state;
    }
}