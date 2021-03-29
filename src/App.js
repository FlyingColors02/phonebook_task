import React,{Component} from "react";
import { Route, Switch ,Redirect} from "react-router-dom";
import ContactList from "./Components/contactList";
import Login from "./Components/login";
import Register from "./Components/registration";
import AddContact from "./Components/addContact";
import EditContact from "./Components/editContact";
import IndividualContactDetails from "./Components/individualContactDetails";
import PrivateRoute from "./Shared/PrivateRoute/userPrivateRoute";

class App extends Component{
    render(){
        return(
            <div>
                
                <Route path="/login" component={Login}/>
                <Route path="/" exact component={Login}/>
                <Route path="/register" component={Register}/>
                <PrivateRoute path="/contactList" component={ContactList}/>
                <PrivateRoute path="/addContact" component={AddContact}/>
                <PrivateRoute path="/editContact/:id" component={EditContact}/>
                <PrivateRoute path="/contactDetails/:id" component={IndividualContactDetails}/>
                {/* <Redirect path="/signIn"/> */}
                
            </div>
        )
    }
}
export default App;