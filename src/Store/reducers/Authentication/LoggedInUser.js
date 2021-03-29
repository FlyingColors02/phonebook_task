import { LOADING, USER_ERROR,  LOGGED_IN_USER } from "../../actions/Authentication/authentication.type";

export const LoggedInUserReducer = (state={}, action) => {
    switch(action.type) {
        case LOADING:
            return { loading: true};
        case LOGGED_IN_USER:
            return { data: action.payload, loading: false};
        case USER_ERROR:
            return {error: action.payload};
        default:
            return state;
    }
}