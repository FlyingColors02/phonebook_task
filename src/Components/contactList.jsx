import React from "react";
import { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { LoggedInAction } from "../Store/actions/Authentication/authenticationAction";
import { getUserContactListAction } from "../Store/actions/Contacts/contactAction";

import "./contactList.css";


class ContactList extends Component{
    constructor(props){
        super(props);
        this.state={
            previous:undefined,
            inputData:""
        }
    }
   
    componentDidMount(){

        this.props.getUserContactListAction();
        this.props.LoggedInAction();
        
    }
    displayContent = (name) => {
        let currentId=name;
        let previousId=this.state.previous ;
        console.log("previous Id",previousId);
        console.log("current id", currentId)
        if(previousId != undefined && currentId != previousId){
            document.getElementById(currentId).style.display="block";
            document.getElementById(previousId).style.display = "none";  
        }
        document.getElementById(currentId).style.display="block";
        this.setState({previous:currentId});
    }
    handleData=(event)=>{

        let filterUser = this.props.contactList.filter(data=>(data.name.toLowerCase().includes(event.target.value.toLowerCase())));
        this.setState({inputData:filterUser});
    }
    render(){ 
     

     let data = this.state.inputData? this.state.inputData:this.props.contactList
     
        return(
            <React.Fragment>
                <div className="container h-100">
                    
             
        <div class="row h-100 justify-content-center align-items-center">
        <div className="col-xs-12 col-sm-offset-3 col-sm-6">
            <div className="panel panel-default">
                <div className="panel-heading c-list">
                    <span className="title">Contacts</span>
                    <ul className="pull-right c-controls">
                        <li><Link to="/addContact" data-toggle="tooltip" data-placement="top" title="Add Contact"><i className="fa fa-plus"></i></Link></li>
                       
                    </ul>
                </div>
                
                <div className="row" > 
                    <div className="col-md-12 col-xs-12 col-sm-12">
                        <div className="input-group c-search">
                            <input type="text" className="form-control" id="contact-list-search" 
                            placeholder="&#xf002;   Search by name" onChange={this.handleData}/>
                            {/* <span className="input-group-btn">
                                <button className="btn btn-default" type="button"><span className="fa fa-search"></span></button>
                            </span> */}
                        </div>
                    </div>
                </div>
                {
                    !data? null:
               
                <ul className="list-group" id="contact-list" style={{marginTop:"10px"}}>
                    {
                        data.map(data=>(
                            
                            <li className="list-group-item" style={{border:"0px"}}>
                           <div className="row" onClick={()=>this.displayContent(data._id)}>
                            <div className="col-xs-3 col-3  col-md-3 col-sm-3" style={{overflow:"hidden"}}>
                                <div className="profile-pic">
                                {
                                    data.profilePhoto == null?
                                    <img className="img-thumbnail" src="http://ssl.gstatic.com/accounts/ui/avatar_2x.png" style={{borderRadius:"60%"}}></img>
                                    :<img className="contactProfilePhoto img-thumbnail" src={data.profilePhoto} style={{borderRadius:"60%"}}></img>
                                }
                                </div>
                               
                                
                            </div>
                            <div className="col-xs-7 col-8 col-md-8 col-sm-8" style={{marginTop:"5%"}}>
                                <span className="name">{data.name}</span><br/>
                                 </div>
                            
                                <div className="col-12" id={data._id} style={{display:"none",textAlign:"center"}}>
                                    <span className="pull-center">{data.mobileNo}</span><br/>
                                    <div className="contactOptions" style={{marginTop:"2%"}} >
                                    <span className="callOption" ><i className="fa fa-phone" style={{color:"white"}}></i></span>
                                <span className="messageOption" ><i className="fa fa-comment" style={{color:"white"}}></i> </span>
                                <span className="videoOption"><i className="fa fa-video-camera" style={{color:"white"}}></i></span>
                                <span className="details" ><Link to={`/contactDetails/${data._id}`}><i class="fa fa-info-circle" style={{color:"white"}}></i></Link> </span>
                        
                                    </div>
                                    
                                </div>
                            
                            <div className="clearfix"></div>
                            </div>
                        </li>     

        ))
                    }
                   
                </ul>
    }
            </div>
        </div>
	</div>
    </div>
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    console.log(state);
    return {
        contactList : state.contactList.data
    };
}

export default connect(mapStateToProps,{getUserContactListAction,LoggedInAction})(ContactList);