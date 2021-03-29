import React, { Component } from "react";
import "./registration.css";
import simpleReactValidator from "simple-react-validator";
import { RegistrationAction } from "../Store/actions/Authentication/authenticationAction";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            newsLetterCheck: true,
            mobileNo: "",
            userPhoto:"",
            imageSrc:"",
            userLogin: {
                emailId: "",
                password: "",
                confirmPassword: ""
            }
        }
        console.log(props);
        this.validator = new simpleReactValidator({ autoForceUpdate: this });
    }

    handleSubmitForm = (event) => {
        event.preventDefault();
        if (this.validator.allValid()) {
            let data = {
                
            name: this.state.name,
            mobileNo: this.state.mobileNo,
            userPhoto: this.state.userPhoto,
            userLogin: {
                emailId: this.state.emailId,
                password: this.state.password,
                confirmPassword: this.state.confirmPassword
            }
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


            this.props.RegistrationAction(jsonToFormData(data));

        }
        else {
            this.validator.showMessages();
            this.forceUpdate();
        }
    }

    
    
    handleOnChange = value => {
        this.setState({ mobileNo: value });
      };

      
    onChangeHandler=event=>{
        this.setState({userPhoto: event.target.files[0],loaded: 0});
        if (event.target.files && event.target.files[0]) {
            let reader = new FileReader();
            reader.onload = (e) => {
              this.setState({imageSrc: e.target.result});
            };
            reader.readAsDataURL(event.target.files[0]);
          }
    }

    handleInputData = (event) => {

        this.setState({ [event.target.name]: event.target.value });

    }

    render() {
        return (
            <React.Fragment>
                <div className="container">
                    <div className="row">

                        <div className="main">

                            <h3 >PhoneBook</h3>

                            <form encType="multipart/form-data">
                                           
                                            
                                           <div className="form-group">

                                           <div style={{textAlign:"center"}}>
                                               {
                                                   this.state.imageSrc ? <img className="profilePhoto img-thumbnail" src={this.state.imageSrc} alt={this.state.imageSrc} /> : <img className="noProfilePhoto img-thumbnail" src="http://ssl.gstatic.com/accounts/ui/avatar_2x.png" ></img>
                                               }
                                               </div>
                                               <input type="file" name="image"accept="image/*" style={{overflow:"hidden"}} onChange={this.onChangeHandler}/>

                                           </div>
                                       </form>
                            

                            <form role="form">

                            
                            <div className="form-group">
                                    <input type="text" className="form-control" id="inputName" name="name"
                                        placeholder="&#xf023;  UserName" value={this.state.name||""} onChange={this.handleInputData} />
                                        { this.validator.message("name", this.state.name, "string|required")}
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
                                    <input type="text" className="form-control" id="inputUserEmail" name="emailId"
                                        placeholder="&#xf2bd;  Email Id" value={this.state.emailId||""} onChange={this.handleInputData} />
                                        { this.validator.message("emailId", this.state.emailId, "email|required")}
                                </div>
                                <div className="form-group">
                                    <input type="password" className="form-control" id="inputPassword" name="password"
                                        placeholder="&#xf023;  Password" value={this.state.password||""} onChange={this.handleInputData} />
                                        { this.validator.message("password", this.state.password, ["string","required",{regex:["^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})"]}],{messages:{regex:"must contain atleast 8 character,at least one lowercase letter, one uppercase letter, one numeric digit, and one special character."}})}
                                </div>
                                <div className="form-group">
                                        <input type="password" className="form-control" id="inputConfirmPassword" name="confirmPassword"
                                            placeholder="&#xf023;  Re-enter Your Password" value={this.state.confirmPassword || ""} onChange={this.handleInputData} />
                                        {this.validator.message("confirmPassword", this.state.confirmPassword, `in:${this.state.password}|required`, { messages: { in: "password didn't match" } })}
                                    </div>
                                <button type="button" className="btn btn btn-primary" onClick={this.handleSubmitForm}>
                                    Sign Up
                                        </button>
                                        <p className="pull-right" style={{fontSize:"14px"}}>Already User? <Link to="/login">Sign In</Link></p>
                            </form>

                        </div>

                    </div>
                </div>

            </React.Fragment>
        )
    }
}
const mapStateToProps = state => {
    console.log(state);
    return {
        register: state.register,
        error: state.login.error
    };
}
export default connect(mapStateToProps,{RegistrationAction})(Register);