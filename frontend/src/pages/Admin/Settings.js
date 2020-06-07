import React, { Component } from "react";
import axios from "axios";
import Axios from "axios";

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      success: false,
      url: "",
      error: false,
      errorMessage: "",
      progress: 0,
      data: "",
      name: "",
      email: "",
      password: "",
    };
  }
  handleChange = (ev) => {
    this.setState({ success: false, url: "", progress: 0 });
  };

  percentageBar = (d) => {
    this.setState({ progress: d });
  };
  handleUpload = (ev) => {
    const percentageBar = this.percentageBar;
    const t = localStorage.getItem("token");
    let file = this.uploadInput.files[0];
    // Split the filename to get the name and type
    let fileParts = this.uploadInput.files[0].name.split(".");
    let fileName = fileParts[0];
    let fileType = fileParts[1];
    console.log("Preparing the upload");
    axios
      .put(
        "http://localhost:3000/institute/",
        {
          fileName: fileName,
          fileType: fileType,
          type: "upload",
        },
        {
          headers: { Authorization: `Bearer ${t}` },
        }
      )
      .then((response) => {
        var returnData = response.data.data.returnData;
        var signedRequest = returnData.signedRequest;
        var url = returnData.url;
        this.setState({ url: url });
        console.log("Recieved a signed request " + signedRequest);
        const config = {
          headers: {
            "Content-Type": fileType,
          },
          onUploadProgress: function (progressEvent) {
            var percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            percentageBar(percentCompleted);
          },
        };

        axios
          .put(signedRequest, file, config)
          .then((result) => {
            console.log("Response from s3");
            this.setState({ success: true });
          })
          .catch((error) => {
            console.log("ERROR " + JSON.stringify(error));
          });
      })
      .catch((error) => {
        console.log(JSON.stringify(error));
      });
  };

  componentDidMount() {
    const t = localStorage.getItem("token");
    axios
      .get("http://localhost:3000/institute/meta/", {
        headers: { Authorization: `Bearer ${t}` },
      })
      .then((result) => {
        this.setState({
          data: result.data,
          name: result.data.name,
          email: result.data.email,
        });
      })
      .catch((err) => {
        console.log(err.response);
      });
  }
  onChange = (e) => {
    //  this.setState({newStudentData:{ [e.target.name]: e.target.value }});
    let newStudentData = this.state;
    newStudentData[e.target.name] = e.target.value;
    this.setState({ newStudentData });
  };

  onClickSubmit = (type) => {
    const t = localStorage.getItem("token");
    Axios.put(
      "http://localhost:3000/institute/",
      {
        email: this.state.email,
        password: this.state.password,
        name: this.state.name,
        type: type,
      },
      {
        headers: { Authorization: `Bearer ${t}` },
      }
    ).then((e) => {
        alert("Updated " + type);
        this.setState({password: ""})
    });
  };

  render() {
    const SuccessMessage = () => (
      <p style={{ color: "green", margin: 0 }}>Updated Succesfully!</p>
    );
    const ErrorMessage = () => (
      <div>
        <p style={{ color: "red", margin: 0 }}>FAILED UPLOAD</p>
        <span style={{ color: "red", backgroundColor: "black" }}>ERROR: </span>
        <span>{this.state.errorMessage}</span>
        <br />
      </div>
    );

    return (
      <div className="container">
        <div className="row">
          <div className="col-lg-4 col-md-6">
            <div className="cards">
              <h6>Upload Institution Logo</h6>
              <input
                onChange={this.handleChange}
                ref={(ref) => {
                  this.uploadInput = ref;
                }}
                style={{ fontSize: 10 }}
                type="file"
                accept=".xls,.xlsx, image/gif, image/jpeg, image/png, audio/*, video/*, .docx, .doc"
                required
              />
              <button
                className="btn btn-primary pb-4"
                onClick={this.handleUpload}
                style={{ fontSize: 14 }}
              >
                UPLOAD
              </button>
              <br />
              <br />
              <div className="progress" style={{ height: "20px" }}>
                <div
                  className="progress-bar"
                  role="progressbar"
                  style={{ width: `${this.state.progress}%` }}
                  aria-valuenow={this.state.progress}
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>
              <br />

              {this.state.success ? <SuccessMessage /> : null}
              {this.state.error ? <ErrorMessage /> : null}
            </div>
          </div>
          <div className="col-lg-4 col-md-6">
            <div className="cards">
              <h6>Update Institution Name:</h6>
              <div className="form-group">
                <input
                  className="form-control"
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Institute Name"
                  onChange={this.onChange}
                  value={this.state.name || ""}
                />
              </div>
              <button
                className="btn btn-primary pb-4"
                onClick={()=>this.onClickSubmit("name")}
                style={{ fontSize: 14 }}
              >
                UPDATE
              </button>
            </div>
          </div>
          <div className="col-lg-4 col-md-6">
            <div className="cards">
              <h6>Update Email:</h6>
              <div className="form-group">
                <input
                  className="form-control"
                  type="email"
                  name="email"
                  id="email"
                  placeholder="First Name"
                  onChange={this.onChange}
                  value={this.state.email || ""}
                />
              </div>
              <button
                className="btn btn-primary pb-4"
                onClick={() => this.onClickSubmit("email")}
                style={{ fontSize: 14 }}
              >
                UPDATE
              </button>
            </div>
          </div>
          <div className="col-lg-4 col-md-6">
            <div className="cards">
              <h6>Update Password:</h6>
              <div className="form-group">
                <input
                  className="form-control"
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                  onChange={this.onChange}
                  value={this.state.password || ""}
                />
              </div>
              <button
                className="btn btn-primary pb-4"
                onClick={() =>  this.onClickSubmit("password")}
                style={{ fontSize: 14 }}
              >
                UPDATE
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Settings;
