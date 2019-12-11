import React from 'react';
import {Helmet} from 'react-helmet';
import {Link} from 'react-router-dom';
import axios from 'axios';

class Signup extends React.Component {
    constructor(props){
        super(props);
        this.state={
            email: "",
            password: "",
            phone: "",
            uname: "",
            error: ""
        }
    }
    onChange = (e) =>{
        this.setState({ [e.target.name]: e.target.value })
    }

    onSubmit = (e) => {
        e.preventDefault() 
        this.setState({error : ""})
    
        const data = {
            email: this.state.email,
            password: this.state.password,
            phone: this.state.phone,
            uname: this.state.uname,           
        }
        if(data.email === "" || data.password ==="" || data.phone ==="" || data.uname===""){
            this.setState({error: "Please fill all the input!"})
            return false
        }
        
        axios.post(`http://localhost:3000/institute/register`,data)
        .then(res => {
            console.log(res.data)
           
        })
        .catch(err=>{
            console.log(err.response.data.error)
        })    
    }

    
    render(){
    const error = this.state.error
    let err_data
    if(error !==""){
        err_data = (
            <div className="alert alert-danger m-0 p-1" role="alert">
                ⚠ {error}
            </div>
        )
    }
    else{
        err_data = ""
    }
      return (
        <div className="signup">
            <Helmet>
                <title>Classroom WebStack | Signup</title>                
            </Helmet>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-7 d-none d-lg-block form_left">
                        <div className="form_left">
                            <img src="./images/left-side-image.png" alt="sign-up" />
                        </div>
                    </div>

                    <div className="col-lg-5 col-md-12 form_right">
                        <img className="logo mb-3" src="./images/logo.png" alt="Logo" />
                        <h1 className="welcome mt-3 mb-3">Welcome to the Family</h1>
                        <p className="sub_head mt-3 mb-3">To keep connected with us please signup with your personal information by email address and password</p>
                        <form onSubmit={this.onSubmit}>
                            <div className="form_container mb-3 p-2">    
                                {err_data}                        
                                <div className="row pl-3 pr-3">
                                    <div className="col icon_holder">
                                        <img className="" src="./images/mail.svg" alt="mail" />
                                    </div>
                                    <div className="col-10">
                                        <div className="form-group">
                                            <label className="label_form">Email</label>
                                            <input onChange={this.onChange} type="email" name="email" className="form-control" autoComplete="none" id="inputEmail" placeholder="someone@domain.com" />
                                        </div>
                                    </div>
                                </div>
                                <div className="row pl-3 pr-3">
                                    <div className="col icon_holder">
                                        <img className="" src="./images/lock.svg" alt="lock" />
                                    </div>
                                    <div className="col-10">
                                        <div className="form-group">
                                            <label className="label_form">Password</label>
                                            <input onChange={this.onChange} type="password" name="password" autoComplete="off" className="form-control" id="inputPassword" placeholder="●●●●●●●●" />
                                        </div>
                                    </div>
                                </div>
                                <div className="row pl-3 pr-3">
                                    <div className="col icon_holder">
                                        <img className="" src="./images/lock.svg" alt="lock" />
                                    </div>
                                    <div className="col-10">
                                        <div className="form-group">
                                            <label className="label_form">UniqueID</label>
                                            <input onChange={this.onChange} type="text" name="uname" autoComplete="off" className="form-control" id="username" placeholder="Institute UID" />
                                        </div>
                                    </div>
                                </div>
                                <div className="row pl-3 pr-3">
                                    <div className="col icon_holder">
                                        <img className="" src="./images/phone.svg" alt="phone" />
                                    </div>
                                    <div className="col-10">
                                        <div className="form-group">
                                            <label className="label_form">Phone</label>
                                            <div className="row">
                                                <div className="col">
                                                    <input onChange={this.onChange} type="number" name="phone" autoComplete="off" className="form-control" id="phoneNumber" placeholder= "9817156202" />
                                                </div>
                                            </div>                                         
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="terms">
                                <div className="round">
                                    <input type="checkbox" id="checkbox" name="tc"/>
                                    <label htmlFor="checkbox"></label>
                                </div>
                                <p className="ml-4 mt-1">
                                    <span>I accept the terms and conditions</span>
                                </p>
                            </div>

                            <div className="button">
                                <button className="btn-blue" type="submit">Sign Up Now</button>
                                <Link className="btn-white" to="/login">Get Login</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
      );
    }
}

export default Signup;