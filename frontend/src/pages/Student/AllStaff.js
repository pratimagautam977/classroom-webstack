import React, { Component } from "react";
import Helmet from "react-helmet";
import AllStaffs from "../../components/staff/allStaff";
import { GetStaffs } from "../../components/staff/StaffFunction";

export default class Staff extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: "",
      persons: [],
      staffs: [],
      load: false,
    };
  }

  componentDidMount() {
    GetStaffs().then((res) => {
      const staffs = res.data.staff;
      this.setState({ staffs, load: true });
    }, 5000);
  }

  render() {
    return (
      <React.Fragment>
        <Helmet>
          <title>Classroom WebStack | Staffs</title>
        </Helmet>
        {this.state.load ? (
          <AllStaffs data={this.state.staffs} hidden={true} />
        ) : (
          <div
            style={{
              height: "90vh",
              display: "flex",
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div className="loader" id="loader-1"></div>
          </div>
        )}
      </React.Fragment>
    );
  }
}
