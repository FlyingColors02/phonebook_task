import React, { Component } from "react";
import simpleReactValidator from "simple-react-validator";
import "./addContact.css"
import 'react-phone-number-input/style.css'
import {addContactAction}  from "../Store/actions/Contacts/contactAction";
import PhoneInput from 'react-phone-number-input';
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { LoggedInAction } from "../Store/actions/Authentication/authenticationAction";

class AddContact extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            mobileNo: "",
            profilePhoto:"",
            imageSrc:"",
            emailId:"",
            address:"",
            userEmailId:""
        }
        console.log(props);
        this.validator = new simpleReactValidator({ autoForceUpdate: this });
    }

    componentDidMount = ()=>{
        this.props.LoggedInAction();
    }
    handleOnChange = value => {
        this.setState({ mobileNo: value });
      }

      onChangeHandler=event=>{
        this.setState({profilePhoto: event.target.files[0],loaded: 0});
        if (event.target.files && event.target.files[0]) {
            let reader = new FileReader();
            reader.onload = (e) => {
              this.setState({imageSrc: e.target.result});
            };
            reader.readAsDataURL(event.target.files[0]);
          }
    }
    handleSubmitForm = (event) => {
        event.preventDefault();
        if (this.validator.allValid()) {
            let data = {
            userEmailId:this.props.loggedInUser.userLogin.emailId,
            name: this.state.name,
            mobileNo: this.state.mobileNo,
            profilePhoto: this.state.profilePhoto,
            address:this.state.address,
            emailId: this.state.emailId,
               
            }
            console.log(data);

            function buildFormData(formData, data, parentKey) {
                if (data && typeof data === 'object' && !(data instanceof Date) && !(data instanceof File)) {
                  Object.keys(data).forEach(key => {
                    buildFormData(formData, data[key], parentKey ? `${parentKey}[${key}]` : key);
                  });
                } else {
                  const value = data == null ? '' : data;
              
                  formData.append(parentKey, value);
                }
              }
              
              function jsonToFormData(data) {
                const formData = new FormData();
              
                buildFormData(formData, data);
              
                return formData;
              }


            this.props.addContactAction(jsonToFormData(data));

        }
        else {
            this.validator.showMessages();
            this.forceUpdate();
        }
    }


    handleInputData = (event) => {

        this.setState({ [event.target.name]: event.target.value });

    }
    render() {
        return (
            <React.Fragment>
                <div className="addContact">

                <form encType="multipart/form-data" onSubmit={this.handleSubmitForm}>

                    <div className="row">
                    
                    <div className="col-5">
                        <div className="text-center">
                        
                                           
                                            
                                           <div className="form-group">

                                           <div style={{textAlign:"center"}}>
                                               {
                                                   this.state.imageSrc ? <img className="profilePhoto img-thumbnail" src={this.state.imageSrc} alt={this.state.imageSrc} /> : <img className="noProfilePhoto img-thumbnail" src="http://ssl.gstatic.com/accounts/ui/avatar_2x.png" ></img>
                                               }
                                               </div>
                                               <p style={{fontSize:"12px"}}>Upload a different photo...</p>
                                               <input type="file" name="image" accept="image/*" style={{overflow:"hidden"}} onChange={this.onChangeHandler}/>

                                           </div>
                                     
                        </div>
                    </div>
                    <div className="col-7">
                        <div className="text-center" style={{marginTop:"30px"}}>
                        <div className="form-group">
                                    
                                    <input type="text" className="form-control" id="inputName" name="name"
                                        placeholder="Name" value={this.state.name} onChange={this.handleInputData} />
                                        { this.validator.message("name", this.state.name, "string|min:2|max:20|required")}
                                </div>
                                <div className="form-group">
                                    
                                    <PhoneInput
                                       placeholder="phone number"
                                       defaultCountry="IN"
                                       value={ this.state.mobileNo }
                                       onChange={ this.handleOnChange }
                                        />

                                     {this.validator.message("mobileNo", this.state.mobileNo, "required|phone")}
                                    
                                    </div>
                                <div className="form-group">
                                    <input type="text" className="form-control" id="inputEmailId" name="emailId"
                                        placeholder="Email Id" value={this.state.emailId} onChange={this.handleInputData} />
                                        { this.validator.message("emailId", this.state.emailId, "email")}
                                </div>
                                <div className="form-group">
                                    <input type="text" className="form-control" id="inputAddress" name="address"
                                        placeholder="Address" value={this.state.address} onChange={this.handleInputData} />
                                        { this.validator.message("address", this.state.address, "string|min:2|max:30")}
                                </div>
                                
                        </div>
                    </div>
                   
                   
                </div>
                <div className="fixed-bottom">
                <div className="row">
                       <div className="col-6 text-center">
                           <Link onClick={()=>window.history.back()}><button className="cancel" type="button">Cancel</button></Link>
                       </div>
                       <div className="col-6 text-center">
                           <button className="saveContact" type="submit">Save</button>
                       </div>
                   </div>
                </div>
                
                    </form>
                </div>
               
            </React.Fragment>
        )
    }
}
const mapStateToProps =(state)=>{
    console.log(state);
    return {
        loggedInUser:state.loggedInUser.data
    };
}

export default connect(mapStateToProps,{addContactAction,LoggedInAction})(AddContact);