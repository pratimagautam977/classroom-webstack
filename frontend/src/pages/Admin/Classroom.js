//rcc => for class-based component
import React, { Component } from "react";
import axios from "axios";
import { Helmet } from "react-helmet";
import AllClass from "../../components/classroom/allClass";
import AddClassModal from "../../components/classroom/AddClassModal";
import {
  AddClass,
  GetClasses
} from "../../components/classroom/ClassroomFunction";

export default class Classroom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: "",
      classes: [],
      newClassData: {
        classroomName: ""
      },
      load: false
    };
  }

  onChange = e => {
    //  this.setState({newStaffData:{ [e.target.name]: e.target.value }});
    let newClassData = this.state.newClassData;
    newClassData[e.target.name] = e.target.value;
    this.setState({ newClassData });
  };

  componentDidMount() {
    const t = localStorage.getItem("token");
    setTimeout(
      function() {
        axios
          .get(`http://localhost:3000/classroom`, {
            headers: { Authorization: `Bearer ${t}` }
          })
          .then(res => {
            if (res.status === 200) {
              const classes = res.data.classroom;
              this.setState({ classes, load: true });
            } else {
              this.setState({ error: res.data.error });
              this.props.history.push("/login");
            }
          })
          .catch(err => {
            this.setState({ error: err.response.data.error, load: true });
          });
      }.bind(this),
      1000
    );
  }
  
  onSubmit = e => {
    e.preventDefault();

    const classroom = this.state.newClassData;
    AddClass(classroom).then(res => {
      console.log(res);
      GetClasses().then(res => {
        
        const classes = res.data.classroom;
        this.setState({ classes });
      });
      this.setState({
        newClassData: {
          classroomName: ""
        }
      });
    });
  };

  render() {
    const bodymsg = (
      <div>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label htmlFor="classroomName">Classroom Name</label>
            <input
              className="form-control"
              type="text"
              name="classroomName"
              id="classroomName"
              placeholder="Classroom Name"
              onChange={this.onChange}
              value={this.state.newClassData.classroomName || ""}
            />
          </div>

          <div className="form-group mb-0">
            <button type="submit" className="btn--blue">
              Add Classroom
            </button>
          </div>
        </form>
      </div>
    );
    return (
      <React.Fragment>
        <Helmet>
          <title>Classroom WebStack | Classroom</title>
        </Helmet>

        <AddClassModal
          body={bodymsg}
          title={"Add Classroom"}
          btn={"+ Add Classroom"}
        />
        {this.state.load ? (
          <AllClass data={this.state.classes} />
        ) : (
          <div
            style={{
              height: "90vh",
              display: "flex",
              width: "100%",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <div className="loader" id="loader-1"></div>
          </div>
        )}
      </React.Fragment>
    );
  }
}
