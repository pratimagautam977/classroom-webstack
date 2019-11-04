import React from 'react';
import {Helmet} from 'react-helmet';
// import API from '../utils/API';
// import KhaltiCheckout from "khalti-web";
import axios from 'axios';
import NotFound from './NotFound';
import Classroom from './Classroom';
import Student from './Student';
import Staff from './Staff';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import { Route, Switch } from "react-router-dom";

class Dashboard extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            profile: "./images/profile.png"
            
        }
      }
      componentDidMount(){
        const t = localStorage.getItem('token');
        axios.get(`http://localhost:3000/student`, {
          headers: {'Authorization': `Bearer ${t}`}
        })
        .then(res => {
          console.log(res);
        })
      }

    paymentData = (payload) =>{
        // console.log(payload);
        let data = {
            token : payload.token,
            amount: payload.amount
        }
        axios.post("http://localhost:3000/institute/payment", data)
        .then(res=>{
            console.log(res);
        })
        .catch(err=>{
            console.log(err.response.data)
        })
    }
    render(){
        
        // let paymentData = this.paymentData
        // let config = {
        //     // replace this key with yours
        //     "publicKey": "live_public_key_31f14f369ef84e51b6d76af0eea21300",
        //     "productIdentity": "1234567890",
        //     "productName": "Course Fee",
        //     "productUrl": "https://icp.edu.np/payfee",
        //     "eventHandler": {
        //         onSuccess (payload) {
        //             // hit merchant api for initiating verfication
        //             // console.log(payload);
        //             paymentData(payload)
        //         },
        //         // onError handler is optional
        //         onError (error) {
        //             // handle errors
        //             console.log(error);
        //         },
        //         onClose () {
        //             console.log('widget is closing');
                    
        //         }
        //     }
        // };
        
        // let checkout = new KhaltiCheckout(config);
        
        return(
            <React.Fragment>
                <Helmet>
                    <title>Classroom WebStack | Dashboard</title>
                </Helmet>
                
                
                {/* <div className="cards">
                    <API/>
                    <button onClick={()=> checkout.show({amount: 1000})}>Pay me</button>
                </div> */}
                <div className="dashboard">                
                    <div className="container-fluid">            
                        <Sidebar/>
                        <div className="mainbar">
                            <Topbar data={this.state.profile}/>             
                            <div className="main_body">
                                <div className="container">
                                    <div className="row">
                                        <div className="col-lg-12 col-md-12 col-sm-12">
                                            <Switch>
                                            <Route path="/classroom" component={Classroom}/>
                                            <Route path="/staff" component={Staff} />
                                            <Route path="/student" component={Student}/> 
                                            <Route path="/home" component={Classroom}/>
                                            <Route component={NotFound}/> 
                                            </Switch>
                                        </div>
                                    </div>
                                </div>                            
                            </div>
                        </div>       
                    </div>       
                </div>                                             
            </React.Fragment>
        );
    }
}

export default Dashboard;