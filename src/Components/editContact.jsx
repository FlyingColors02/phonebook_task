import React, { Component } from "react";
import simpleReactValidator from "simple-react-validator";
import "./addContact.css"
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input';
import { connect } from "react-redux";
import { updateUserContactAction } from "../Store/actions/Contacts/contactAction";

class EditContact extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            name: props.user.name,
            mobileNo: props.user.mobileNo,
            profilePhoto: props.user.profilePhoto,
            imageSrc:props.user.profilePhoto,
            emailId: props.user.emailId,
            address:props.user.address,
            userEmailId:props.user.userEmailId
        }
        
        console.log(props);
        this.validator = new simpleReactValidator({ autoForceUpdate: this });
    }
    handleOnChange = value => {
        this.setState({ mobileNo: value });
      }

      onChangeHandler=event=>{
          console.log(this.state)
        this.setState({profilePhoto: event.target.files[0],loaded: 0});
        if (event.target.files && event.target.files[0]) {
            let reader = new FileReader();
            reader.onload = (e) => {
              this.setState({imageSrc: e.target.result});
            };
            reader.readAsDataURL(event.target.files[0]);
          }
          console.log(this.state);
    }
    handleSubmitForm = (event) => {
        event.preventDefault();
        if (this.validator.allValid()) {
            let data = {
            userEmailId:this.state.userEmailId,
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


            this.props.updateUserContactAction(this.props.match.params.id,jsonToFormData(data));

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
        console.log(this.props.user);
        return (
            <React.Fragment>
                <div className="addContact">

                    <form onSubmit={this.handleSubmitForm}>

                        <div className="text-center">
                        <form encType="multipart/form-data">
                                           
                                            
                                           <div className="form-group">

                                           <div style={{textAlign:"center"}}>
                                               {
                                                   this.state.imageSrc ? 
                                                   <img className="profilePhoto img-thumbnail" src={this.state.imageSrc} alt={this.state.imageSrc} /> 
                                                   : <img className="noProfilePhoto img-thumbnail" src="http://ssl.gstatic.com/accounts/ui/avatar_2x.png" ></img>
                                               }
                                               </div>
                                               <p style={{fontSize:"12px"}}>Upload a different photo...</p>
                                               <input type="file" name="image" accept="image/*" style={{overflow:"hidden"}} onChange={this.onChangeHandler}/>

                                           </div>
                                       </form>
                        </div>
                   
                    
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
                   
                   
                   
                
                <div className="fixed-bottom">
                <div className="row">
                       <div className="col-6 text-center">
                           <button className="cancel" type="button">Cancel</button>
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
const mapStateToProps=(state,ownProps)=>{
    console.log(ownProps);
    console.log(state);
    console.log(ownProps.match.params.id)
    
    // console.log(state.individualContactDetails.data["_id"])
    return {user:state.individualContactDetails.data};
}
export default connect(mapStateToProps,{updateUserContactAction})(EditContact);