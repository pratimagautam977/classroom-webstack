import React, { Component } from "react";
import Helmet from "react-helmet";
import Students from "../../components/student/allStudent";
import AddStudentModal from "../../components/student/addStudentModal";
import { AddStudent, GetStudents, DeleteStudent } from "../../components/student/StudentFunction";
import EditStudentModal from "../../components/student/editStudentModal";

export default class Student extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: "",
      persons: [],
      students: [],
      newStudentData: {
        fname: "",
        lname: "",
        email: "",
        address: "",
        phone: "",
        username: "",
        password: "",
        c_password: ""
      },
      isActiveEdit: false,
      EditValue: "",
      newStudentModal: false,
    };
  }
  
  onChange = e => {
    //  this.setState({newStudentData:{ [e.target.name]: e.target.value }});
    let newStudentData = this.state.newStudentData;
    newStudentData[e.target.name] = e.target.value;
    this.setState({newStudentData});
  };

  onSubmit = e => {
    e.preventDefault()
    const stud = this.state.newStudentData;
    AddStudent(stud).then(res=>{
      console.log(res)
      GetStudents().then(res =>{
        const students = res.data.student;
        this.setState({ students });
      })
      this.setState({newStudentData: {
        fname: "",
        lname: "",
        email: "",
        address: "",
        phone: "",
        username: "",
        password: "",
        c_password: ""
      }
      })
    })
  }

  UpdateStudent = (value) => {
    this.setState({isActiveEdit: true, EditValue: value})
  }
  CloseModal = () =>{
    this.setState({isActiveEdit: false, EditValue: ""})
  }
  onUpdateSucess = ()=>{
    GetStudents().then(res =>{
      const students = res.data.student;
      this.setState({ students });
    })
  }

  DeleteStudent = (id) => {
    DeleteStudent(id).then(res=>{
      console.log(res);
      const students = this.state.students.filter(student => student.studID !== id);
      this.setState({ students });
    }) 
  }

  componentDidMount() {
    GetStudents().then(res =>{
      const students = res.data.student;
      this.setState({ students });
    })
  }

  render() {
    const bodymsg = (
      <div>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label htmlFor="fname">First Name</label>
            <input
              className="form-control"
              type="text"
              name="fname"
              id="fname"
              placeholder="First Name"
              onChange={this.onChange}
              value={this.state.newStudentData.fname || ''}
            />
          </div>
          <div className="form-group">
            <label htmlFor="lname">Last Name</label>
            <input
              className="form-control"
              type="text"
              name="lname"
              id="lname"
              placeholder="Last Name"
              onChange={this.onChange}
              value={this.state.newStudentData.lname || ''}
            />
          </div>
          <div className="form-group">
            <label htmlFor="uname">Username</label>
            <input
              className="form-control"
              type="text"
              name="username"
              id="uname"
              placeholder="Username"
              onChange={this.onChange}
              value={this.state.newStudentData.username || ''}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              className="form-control"
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              onChange={this.onChange}
              value={this.state.newStudentData.email || ''}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              className="form-control"
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              onChange={this.onChange}
              value={this.state.newStudentData.password || ''}
            />
          </div>
          <div className="form-group">
            <label htmlFor="cPassword">Password</label>
            <input
              className="form-control"
              type="password"
              name="c_password"
              id="cPassword"
              placeholder="Confirm Password"
              onChange={this.onChange}
              value={this.state.newStudentData.c_password || ''}
            />
          </div>
          <div className="form-group">
            <label htmlFor="address">Address</label>
            <input
              className="form-control"
              type="text"
              name="address"
              id="address"
              placeholder="Address"
              onChange={this.onChange}
              value={this.state.newStudentData.address || ''}
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone</label>
            <input
              className="form-control"
              type="number"
              name="phone"
              id="phone"
              placeholder="Phone Number"
              onChange={this.onChange}
              value={this.state.newStudentData.phone || ''}
            />
          </div>
          <div className="form-group mb-0">
            <button type="submit" className="btn--blue">Add</button>            
          </div>
        </form>
      </div>
    );
    
    const isActiveEdit = this.state.isActiveEdit
    return (
      <React.Fragment>
        <Helmet>
          <title>Classroom WebStack | Student</title>
        </Helmet>
        { isActiveEdit ? <EditStudentModal toggle={this.CloseModal} OnUpdateSuccess={this.onUpdateSucess} id={this.state.EditValue}/> : ""}
        
        <AddStudentModal
          body={bodymsg}
          title={"Add Student"}
          btn={"+ Add Student"}
          
        />
        <Students onUpdate={this.UpdateStudent}  onDelete={this.DeleteStudent} data={this.state.students} />
      </React.Fragment>
    );
  }
}
