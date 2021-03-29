import {ADD_CONTACT, LOADING, CONTACT_ERROR, CONTACT_LIST, INDIVIDUAL_CONTACT, UPDATE_CONTACT, DELETE_CONTACT} from "../../actions/Contacts/contact.type";


export const addContactReducer =(state={},action)=>{

    switch(action.type){
        case LOADING: 
            return {loading:true};
        case ADD_CONTACT:
            return {data: action.payload, loading: false};
        case CONTACT_ERROR:
            return {error: action.payload};
        default:
            return state;
    }
}

export const contactListReducer = (state={},action)=>{

    switch(action.type){
        case LOADING:
            return {loading: true};
        case CONTACT_LIST:
            return {data: action.payload, loading: false};
        case CONTACT_ERROR:
            return {error: action.payload};
        default:
            return state;
    }
}

export const deleteContactReducer = (state={},action)=>{

    switch(action.type){
        case LOADING:
            return {loading: true};
        case DELETE_CONTACT:
            return {data: action.payload, loading: false};
        case CONTACT_ERROR:
            return {error: action.payload};
        default:
            return state;
    }
}

export const updateContactDetailsReducer = (state={},action)=>{

    switch(action.type){
        case LOADING:
            return {loading: true};
        case UPDATE_CONTACT:
            return {data: action.payload, loading: false};
        case CONTACT_ERROR:
            return {error: action.payload};
        default:
            return state;
    }
}

export const individualContactDetailsReducer = (state={}, action) =>{

    switch (action.type) {
        case LOADING:
            return {loading:true}
        case INDIVIDUAL_CONTACT:
            return {data: action.payload, loading:false};
        case CONTACT_ERROR:
            return {error: action.payload}
        default:
            return state;
    }
}