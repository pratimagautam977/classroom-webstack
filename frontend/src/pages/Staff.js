import React, { Component } from "react";
import Helmet from "react-helmet";
import AllStaffs from "../components/staff/allStaff";
import AddStaffModal from "../components/staff/addStaffModal";
import { AddStaff, GetStaffs, DeleteStaff } from "../components/staff/StaffFunction";
import EditStaffModal from "../components/staff/editStaffModal";

export default class Staff extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: "",
      persons: [],
      staffs: [],
      newStaffData: {
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
    };
  }
  
  onChange = e => {
    //  this.setState({newStaffData:{ [e.target.name]: e.target.value }});
    let newStaffData = this.state.newStaffData;
    newStaffData[e.target.name] = e.target.value;
    this.setState({newStaffData});
  };

  onSubmit = e => {
    e.preventDefault()
    const staff = this.state.newStaffData;
    AddStaff(staff).then(res=>{
      console.log(res)
      GetStaffs().then(res =>{
        const staffs = res.data.staff;
        this.setState({ staffs });
      })
      this.setState({newStaffData: {
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

  UpdateStaff = (value) => {
    this.setState({isActiveEdit: true, EditValue: value})

  }
  CloseModal = () =>{
    this.setState({isActiveEdit: false, EditValue: ""})
  }
  onUpdateSucess = ()=>{
    GetStaffs().then(res =>{
      const staffs = res.data.staff;
      this.setState({ staffs });
    })
  }

  DeleteStaff = (id) => {
    DeleteStaff(id).then(res=>{
      console.log(res);
      const staffs = this.state.staffs.filter(staff => staff.staffID !== id);
      this.setState({ staffs });
    }) 
  }

  componentDidMount() {
    GetStaffs().then(res =>{
      const staffs = res.data.staff;
      this.setState({ staffs });
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
              value={this.state.newStaffData.fname || ''}
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
              value={this.state.newStaffData.lname || ''}
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
              value={this.state.newStaffData.username || ''}
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
              value={this.state.newStaffData.email || ''}
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
              value={this.state.newStaffData.password || ''}
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
              value={this.state.newStaffData.c_password || ''}
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
              value={this.state.newStaffData.address || ''}
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
              value={this.state.newStaffData.phone || ''}
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
          <title>Classroom WebStack | Staffs</title>
        </Helmet>
        { isActiveEdit ? <EditStaffModal toggle={this.CloseModal} OnUpdateSuccess={this.onUpdateSucess} id={this.state.EditValue}/> : ""}
        
        <AddStaffModal
          body={bodymsg}
          title={"Add Staff"}
          btn={"+ Add Staff"}
        />
        <AllStaffs onUpdate={this.UpdateStaff}  onDelete={this.DeleteStaff} data={this.state.staffs} />
      </React.Fragment>
    );
  }
}
