import React from "react";
import { Helmet } from "react-helmet";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";
import { Route, Switch, withRouter } from "react-router-dom";
import StaffClass from "./Classroom";
import NotFound from "../Admin/NotFound";
import StaffChat from "./StaffChat";
import StaffStudent from "./Student";
import StaffSetting from "./Setting";
import StudentView from "./StudentView";
import Staff from "./Staff";
import ClassroomView from "./ClassroomView";
import ChatJoin from "./ChatJoin";
import Filemanager from "./FileManager";
import StaffCalendar from "./StaffCalender";
import NotesApp from "./Notes";
import Axios from "axios";

class Staffs extends React.Component {
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
    })
      .then((resp) => {
        console.log(resp.data.logo);
        this.setState({ profile: resp.data.logo });
      })
      .catch((err) => {
        console.log("err" + err);
      });
  }

  render() {
    return (
      <React.Fragment>
        <Helmet>
          <title>Classroom WebStack | Staff</title>
        </Helmet>

        <div className="dashboard">
          <div className="container-fluid">
            <Sidebar value="staff" />
            <div className="mainbar">
              <Topbar data={this.state.profile} />
              <div className="main_body">
                <div className="container">
                  <div className="row">
                    <div className="col-12">
                      <Switch>
                        <Route exact path="/home" component={StaffClass} />
                        <Route exact path="/classroom" component={StaffClass} />
                        <Route path="/student" component={StaffStudent} />
                        <Route path="/student/:id" component={StudentView} />
                        <Route path="/staff" component={Staff} />
                        <Route
                          path="/classroom/:id"
                          component={ClassroomView}
                        />
                        <Route path="/calendar" component={StaffCalendar} />
                        <Route exact path="/chat" component={ChatJoin} />
                        <Route path="/chat/:id" component={StaffChat} />
                        <Route path="/files" component={Filemanager} />
                        <Route path="/settings" component={StaffSetting} />
                        <Route path="/note" component={NotesApp} />
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

export default withRouter(Staffs);
