import React from 'react';
import {Helmet} from 'react-helmet';
import axios from 'axios'

class Login extends React.Component{
    constructor(props){
        super(props);
        this.state={
            email: "",
            password: "",
            type: "",
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
            password: this.state.password            
        }
        if(data.email === "" || data.password === "" ){
            this.setState({error: "Please fill all the input!"})
            return false
        }
        let type = this.state.type;
        var log;
        if (type ==="ins"){
            log = "institute"
        }
        else if (type === "staff"){
            log = "staff"
        }
        else if (type === "stud"){
            log = "student"
        }
        else {
            this.setState({error: "Select type!"})
            return false
        }
        axios.post(`http://localhost:3000/${log}/login`,data)
        .then(res => {
            if(res.status === 200){
                // console.log(res.data.token)
                localStorage.setItem("token", res.data.token )
                this.setState({error : ""})
                this.props.history.push('/home')
            }
            else{                
                this.setState({ error: res.data.error });
            }
        })
        .catch(err=>{
            console.log(err.response.data.error)
            this.setState({type: ""})
        })
         
    }
    render(){
        const error = this.state.error
        let err_data
        if(error){
            err_data = (
                <div className="alert alert-danger m-0 p-1" role="alert">
                    ⚠ {error}
                </div>
            )
        }
        return (
            <div className="login">
                <Helmet>
                    <title>Classroom WebStack | Login</title>                    
                </Helmet>
                
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-7 d-none d-lg-block form_left">
                            <div className="form_left">
                                <img className="login_image" src="./images/communication.jpg" alt="Login"/>
                            </div> 
                        </div>

                        <div className="col-lg-5 col-md-6 form_right">
                            <img className="logo mb-3" src="./images/logo.png" alt="Logo"/>
                            <h1 className="welcome mt-3 mb-3">Welcome Back <span role="img" aria-label="smiley">😃</span></h1>
                            <p className="sub_head mt-3 mb-3">To keep connected with us please login with your personal information by email address and password</p>
                            <form onSubmit={this.onSubmit}>
                                <div className="form_container mb-3 p-2">
                                    {err_data}  
                                    <label >Login Type:</label>
                                    <input type="radio" checked className="mr-1 ml-2" onChange={this.onChange} name="type" value=""/><label >None</label>
                                    <input type="radio" className="mr-1 ml-2" onChange={this.onChange} name="type" value="stud"/><label >Student</label>
                                    <input type="radio" className="mr-1 ml-2" onChange={this.onChange} name="type" value="staff"/><label >Staff</label>
                                    <input type="radio" className="mr-1 ml-2" onChange={this.onChange} name="type" value="ins"/><label >Institue</label>
                                    <div className="row pl-3 pr-3">
                                        <div className="col icon_holder">
                                            <img className="" src="./images/mail.svg" alt="Mail"/>
                                        </div>
                                        <div className="col-10">
                                            <div className="form-group">
                                                <label className="label_form">Email</label>
                                                <input type="email" onChange={this.onChange} name="email" className="form-control" autoComplete="none" id="inputEmail" placeholder="someone@domain.com"/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row pl-3 pr-3">
                                            <div className="col icon_holder">
                                            <img className="" src="./images/lock.svg" alt="lock"/>
                                        </div>
                                        <div className="col-10">
                                            <div className="form-group">
                                                <label className="label_form">Password </label>
                                                <input type="password" onChange={this.onChange} name="password" autoComplete="off" className="form-control" id="inputPassword" placeholder="●●●●●●●●"/>
                                            </div>
                                        </div>
                                    </div>                                
                                </div>                            
                                <div className="terms">
                                    <div className="round">
                                        <input type="checkbox" id="checkbox" />
                                        <label htmlFor="checkbox"></label>
                                    </div>
                                    <p className="ml-4 mt-1">
                                        <span>Remember Me</span>
                                        <span className="ml-5"> <a className="link_forgot" href="# ">Forgot Password?</a></span>
                                    </p>
                                </div>

                                <div className="button">
                                    <button className="btn-blue" type="submit">Login Now</button>
                                    <a className="btn-white" href="/signup">Create Account</a>
                                </div> 
                            </form>             
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;