import React from 'react';
import {Helmet} from 'react-helmet';
import NotFound from './NotFound';
import Classroom from './Classroom';
import Student from './Student';
import Staff from './Staff';
import Sidebar from '../../components/Sidebar';
import Topbar from '../../components/Topbar';
import { Route, Switch,withRouter } from "react-router-dom";
import Payment from './Payment';
import ClassroomView from './ClassroomView';
import InstituteCalendar from './InstituteCalendar';
import AllPayment from './AllPayment';
import Filemanager from './Filemanager';

class Institute extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            profile: "data:image/png;base64,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"
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
                        <Sidebar value="ins"/>
                        <div className="mainbar">
                            <Topbar data={this.state.profile}/>             
                            <div className="main_body">
                                <div className="container">
                                    <div className="row">
                                        <div className="col-lg-12 col-md-12 col-sm-12">
                                            <Switch>
                                            <Route exact path="/classroom" component={Classroom}/>
                                            <Route path="/home" component={Classroom}/>
                                            <Route path="/staff" component={Staff} />
                                            <Route path="/staff/:id"/>
                                            <Route path="/student" component={Student}/> 
                                            <Route path="/student/:id"/>
                                            <Route exact path="/pay" component={AllPayment}/>
                                            <Route path="/pay/:id" component={Payment}/>
                                            <Route path="/calendar" component={InstituteCalendar}/>
                                            <Route path="/files" component={Filemanager}/>
                                            <Route exact path="/classroom/:id" component={ClassroomView}/>              
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

export default withRouter(Institute);