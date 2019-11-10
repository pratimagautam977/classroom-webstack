import React, { Component } from "react";
import { GetStaff, UpdateStaff} from "./StaffFunction";

export default class EditStaffModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editData: {},
      toggle: false
    };
  }
  close = () => {
    this.setState({ toggle: true });
  };
  onChange = e => {
    //  this.setState({newStaffData:{ [e.target.name]: e.target.value }});
    let editData = this.state.editData;
    editData[e.target.name] = e.target.value;
    this.setState({ editData });
  };
  onSubmit = e => {
    e.preventDefault();
    const editData = this.state.editData;
    UpdateStaff(editData, this.props.id).then(res => {
      console.log(res);
      this.props.toggle()
      this.props.OnUpdateSuccess()
    });
  };

  componentDidMount() {
    const id = this.props.id;
    GetStaff(id).then(res => {
      console.log(res);
      const editData = res.data.staff;
      this.setState({ editData });
    });
  }

  render() {
    return (
      <React.Fragment>
        <div className={this.state.toggle ? "m-menu" : "m-menu  -active"}>
          <div className="modal_highlight">
            <div className="modal_main">
              <div className="modal_head">
                <div className="modal_title">
                  <h2>Edit Staff</h2>
                </div>
                <div className="modal_btn">
                  <button className="cross" onClick={() => this.props.toggle()}>
                    ⓧ
                  </button>
                </div>
              </div>
              <div className="modal_body">
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
                        value={this.state.editData.fname || ""}
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
                        value={this.state.editData.lname || ""}
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
                        value={this.state.editData.email || ""}
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
                        value={this.state.editData.password || ""}
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
                        value={this.state.editData.address || ""}
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
                        value={this.state.editData.phone || ""}
                      />
                    </div>
                    <div className="form-group mb-0">
                      <button type="submit" className="btn--blue">
                        Edit
                      </button>
                    </div>
                  </form>
                </div>
              </div>
              <div className="modal_footer">{this.props.footer}</div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
