import React from "react";
import { Helmet } from "react-helmet";
import NotFound from "./NotFound";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";
import { Route, Switch } from "react-router-dom";
import { withRouter } from "react-router-dom";
import Payment from "./Payment";
import StudentClass from "./Classroom";
import StudentCalendar from "./StudentCalendar";
import AllPayment from "./AllPayment";
import ClassroomView from "./ClassroomView";
import NotesApp from "./Notes";
import Filemanager from "./FileManager";
import Staff from "./AllStaff";
import Axios from "axios";

class Students extends React.Component {
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
          <title>Classroom WebStack | Dashboard</title>
        </Helmet>

        <div className="dashboard">
          <div className="container-fluid">
            <Sidebar value="stud" />
            <div className="mainbar">
              <Topbar data={this.state.profile} />
              <div className="main_body">
                <div className="container">
                  <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12">
                      <Switch>
                        <Route exact path="/home" component={StudentClass} />
                        <Route
                          exact
                          path="/classroom"
                          component={StudentClass}
                        />
                        <Route exact path="/pay" component={AllPayment} />
                        <Route path="/pay/:id" component={Payment} />
                        <Route path="/note" component={NotesApp} />
                        <Route path="/calendar" component={StudentCalendar} />
                        <Route
                          path="/classroom/:id"
                          component={ClassroomView}
                        />
                        <Route path="/files" component={Filemanager} />
                        <Route path="/staff" component={Staff} />
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

export default withRouter(Students);
