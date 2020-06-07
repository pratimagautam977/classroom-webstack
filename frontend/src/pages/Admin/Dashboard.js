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
import NotesApp from './Notes';
import Settings from './Settings';
import Axios from 'axios';

class Institute extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: "https://www.tibs.org.tw/images/default.jpg",
    };
  }
  componentDidMount() {
    const t = localStorage.getItem("token");
    Axios.get("http://localhost:3000/institute/meta", {
      headers: { Authorization: `Bearer ${t}` },
    }).then((resp) => {
      console.log(resp.data.logo)
      this.setState({ profile: resp.data.logo });
    }).catch(err => {
      console.log("err" + err)
    });
  }
  render() {
    return (
      <React.Fragment>
        <Helmet>
          <title>Classroom WebStack | Dashboard</title>
        </Helmet>

        <div className="dashboard">
          <div className="container-fluid">
            <Sidebar value="ins" />
            <div className="mainbar">
              <Topbar data={this.state.profile} />
              <div className="main_body">
                <div className="container">
                  <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12">
                      <Switch>
                        <Route exact path="/classroom" component={Classroom} />
                        <Route path="/home" component={Classroom} />
                        <Route path="/staff" component={Staff} />
                        <Route path="/staff/:id" />
                        <Route path="/student" component={Student} />
                        <Route path="/student/:id" />
                        <Route exact path="/pay" component={AllPayment} />
                        <Route path="/pay/:id" component={Payment} />
                        <Route path="/calendar" component={InstituteCalendar} />
                        <Route path="/files" component={Filemanager} />
                        <Route
                          exact
                          path="/classroom/:id"
                          component={ClassroomView}
                        />
                        <Route path="/note" component={NotesApp} />
                        <Route path="/settings" component={Settings} />
                        <Route component={NotFound} />
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