import React,{ Component } from "react";
import "./individualContactDetails.css";
import {getIndividualUserContact,deleteUserContactAction} from "../Store/actions/Contacts/contactAction";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
class IndividualContactDetails extends Component{

    componentDidMount=()=>{
        console.log(this.props);
        this.props.getIndividualUserContact(this.props.match.params.id);
    }

    deleteContact = (data) =>{
        this.props.deleteUserContactAction(data);

    }
    render(){
        if(!this.props.contactDetails){return null}
        return(
            <React.Fragment>
            <div className="container h-100">
            <div className="back">
                            <Link onClick={()=>window.history.back()}>
                                <i className="fa fa-chevron-left"></i>
                            </Link>
                            </div>
			<div className="row h-100 justify-content-center align-items-center">
            <div className="col-xs-12 col-12 col-sm-offset-3 col-sm-6">
				<div className="card">
					<div className="card-header">
						<div className="profile_pic">
                            {
                                this.props.contactDetails.profilePhoto == null?
                                <img className="img-thumbnail" src="http://ssl.gstatic.com/accounts/ui/avatar_2x.png" style={{borderRadius:"60%"}}></img>
                                :<img className="contactProfilePhoto img-thumbnail" src={this.props.contactDetails.profilePhoto} style={{borderRadius:"60%"}}></img>
                          
                            }
						</div>
					</div>
					<div className="card-body">
						<div className="d-lfex justify-content-center flex-column">
							<div className="name_container">
								<div className="name">{this.props.contactDetails.name}</div>
							</div>
							<div className="mobileNumber">{this.props.contactDetails.mobileNo}</div>
						</div>
                        <div className="col-12" >
                                    
                                    <div className="contactOptions" style={{marginTop:"2%",width:"120%"}} >
                                    <span className="callOption" ><i className="fa fa-phone" style={{color:"white"}}></i></span>
                                <span className="messageOption" ><i className="fa fa-comment" style={{color:"white"}}></i> </span>
                                <span className="videoOption"><i className="fa fa-video-camera" style={{color:"white"}}></i></span>
                                
                                    </div>
                                    </div>

                                    {
                                this.props.contactDetails.emailId ?
                                
                                <div className="emailId">
                    
                                    <div className="emailId_btn">{this.props.contactDetails.emailId}</div>
						
                                </div>:null
                            }
						
                            {
                                this.props.contactDetails.address ?
                                
                                <div className="address">
                    
                                    <div className="address_btn">{this.props.contactDetails.address}</div>
						
                                </div>:null
                            }
							
						
					</div>
                    <div className="fixed-bottom">
					<div className="card-footer">
                        
                        <div className="block">
                            
                        </div>
						<div className="share">
							
						</div>
						<div className="delete" onClick={()=>this.deleteContact(this.props.contactDetails._id)}>
							
						</div>
                        <div className="edit" ><Link to={`/editContact/${this.props.contactDetails._id}`}><i className="fa fa-pencil"></i></Link></div>
					</div>
                    </div>
				</div>
			</div>
		</div>
        </div>
            </React.Fragment>
        )
    }
}
const mapStateToProps = (state)=>{
    console.log(state);
    return {
        contactDetails:state.individualContactDetails.data
    };
}
export default connect(mapStateToProps,{getIndividualUserContact,deleteUserContactAction})(IndividualContactDetails);