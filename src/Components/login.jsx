import React, { Component } from "react";
import "./login.css";
import simpleReactValidator from "simple-react-validator";
import { LoginAction, LoggedInAction } from "../Store/actions/Authentication/authenticationAction";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            emailId: "",
            password: ""
        }
        console.log(props);
        this.validator = new simpleReactValidator({ autoForceUpdate: this });
    }

    handleSubmitForm = (event) => {
        event.preventDefault();
        if (this.validator.allValid()) {
            let data = {
                emailId: this.state.emailId,
                password: this.state.password
            }
            console.log(data);
            this.props.LoginAction(data);

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
                <div className="container">
                    <div className="row">

                        <div className="main">

                            <h3 >PhoneBook</h3>

                            <h5>Please Log In, or <Link to="/register">Sign Up</Link></h5>
                            

                            <form role="form" onSubmit={this.handleSubmitForm}>
                                <div className="form-group">
                                    <label htmlFor="inputUsernameEmail" >Username or email</label>
                                    <input type="text" className="form-control" id="inputUsernameEmail" name="emailId"
                                        placeholder="&#xf2bd;  Email Id" value={this.state.emailId} onChange={this.handleInputData} />
                                        { this.validator.message("emailId", this.state.emailId, "email|required")}
                                </div>
                                <div className="form-group">
                                    <a className="pull-right" href="#">Forgot password?</a>
                                    <label htmlFor="inputPassword" >Password</label>
                                    <input type="password" className="form-control" id="inputPassword" name="password"
                                        placeholder="&#xf023;  Password" value={this.state.password} onChange={this.handleInputData} />
                                        { this.validator.message("password", this.state.password, ["string","required",{regex:["^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})"]}],{messages:{regex:"must contain atleast 8 character,at least one lowercase letter, one uppercase letter, one numeric digit, and one special character."}})}
                                </div>
                                
                                <button type="submit" className="btn btn btn-primary">
                                    Log In
                                        </button>
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
        login: state.login,
        error: state.login.error
    };
}
export default connect(mapStateToProps,{LoginAction,LoggedInAction}) (Login);