import React from "react";
import Helmet from "react-helmet";
import Students from "../../components/student/allStudent";
import {
  GetStudents
} from "../../components/student/StudentFunction";

export default class StaffStudent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: "",
      students: [],
    };
  }
  componentDidMount() {
    GetStudents().then((res) => {
      const students = res.data.student;
      this.setState({ students });
    });
  }

  render() {
    return (
      <React.Fragment>
        <Helmet>
          <title>Classroom WebStack | Student</title>
        </Helmet>
        
        <Students data={this.state.students} hidden={true} />
      </React.Fragment>
    );
  }
}
