import React from 'react';
import {Helmet} from 'react-helmet';
import NotFound from './NotFound';
import Classroom from './Classroom';
import Student from './Student';
import Staff from './Staff';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import { Route, Switch } from "react-router-dom";
import Payment from './Payment';

class Dashboard extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            profile: "./images/profile.png"
        }
    }
    render(){
        return(
            <React.Fragment>
                <Helmet>
                    <title>Classroom WebStack | Dashboard</title>
                </Helmet>

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
                                            <Route path="/home" component={Classroom}/>
                                            <Route path="/staff" component={Staff} />
                                            <Route path="/student" component={Student}/> 
                                            <Route path="/payment" component={Payment}/>
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