import { combineReducers} from "redux";
import { DeleteUserAccountReducer, LoginReducer, RegistrationReducer } from "./reducers/Authentication/authenticateReducer";
import storage from "redux-persist/lib/storage";
import { LoggedInUserReducer } from "./reducers/Authentication/LoggedInUser";
import { addContactReducer, contactListReducer, individualContactDetailsReducer } from "./reducers/Contacts/contactsReducer";

const reducers = combineReducers({
    login: LoginReducer, 
    register: RegistrationReducer,
    loggedInUser: LoggedInUserReducer,
    deleteUserAccount: DeleteUserAccountReducer,
    contactList: contactListReducer,
    addContact:addContactReducer,
    individualContactDetails: individualContactDetailsReducer
    
});

export const persistConfig = {
    key : "root",
    storage,
    whitelist: ["loggedInUser"]
}
export default reducers;