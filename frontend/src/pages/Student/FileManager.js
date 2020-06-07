import React, { Component } from "react";
import axios from "axios";

class Filemanager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      success: false,
      url: "",
      error: false,
      errorMessage: "",
      data: [],
      progress: 0,
      toggle: false,
    };
  }

  open = () => {
    this.setState({ toggle: true });
  };
  close = () => {
    this.setState({ toggle: false });
  };

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
      .post(
        "http://localhost:3000/student/upload/",
        {
          fileName: fileName,
          fileType: fileType,
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
      .get("http://localhost:3000/student/files/", {
        headers: { Authorization: `Bearer ${t}` },
      })
      .then((result) => {
        this.setState({
          data: result.data,
        });
      })
      .catch((err) => {
        console.log(err.response);
      });
  }

  deleteFile = (id) => {
    const t = localStorage.getItem("token");
    axios
      .delete(`http://localhost:3000/student/file/${id}`, {
        headers: { Authorization: `Bearer ${t}` },
      })
      .then((result) => {
        axios
          .get("http://localhost:3000/student/files/", {
            headers: { Authorization: `Bearer ${t}` },
          })
          .then((result) => {
            this.setState({
              data: result.data,
            });
          })
          .catch((err) => {
            console.log(err.response);
          });
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  render() {
    const SuccessMessage = () => (
      <div style={{ padding: 20 }}>
        <h5 style={{ color: "green" }}>SUCCESSFUL UPLOAD</h5>
        {/* <a href={this.state.url}>Access the file here</a> */}
        <br />
      </div>
    );
    const ErrorMessage = () => (
      <div style={{ padding: 50 }}>
        <h3 style={{ color: "red" }}>FAILED UPLOAD</h3>
        <span style={{ color: "red", backgroundColor: "black" }}>ERROR: </span>
        <span>{this.state.errorMessage}</span>
        <br />
      </div>
    );

    const datas = this.state.data;
    const Modal = (
      <div className={this.state.toggle ? "m-menu -active" : "m-menu "}>
        <div className="modal_highlight">
          <div className="modal_main">
            <div className="modal_head">
              <div className="modal_title">
                <h2>Upload File</h2>
              </div>
              <div className="modal_btn">
                <button className="cross" onClick={this.close}>
                  ⓧ
                </button>
              </div>
            </div>
            <div className="modal_body">
              <center>
                <input
                  onChange={this.handleChange}
                  ref={(ref) => {
                    this.uploadInput = ref;
                  }}
                  type="file"
                  accept=".xls,.xlsx, image/gif, image/jpeg, image/png, audio/*, video/*, .docx, .doc"
                  required
                />
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
                <button
                  className="btn btn-primary pb-4"
                  onClick={this.handleUpload}
                >
                  UPLOAD
                </button>
                {this.state.success ? <SuccessMessage /> : null}
                {this.state.error ? <ErrorMessage /> : null}
              </center>
            </div>
            <div className="modal_footer">{this.props.footer}</div>
          </div>
        </div>
      </div>
    );
    return (
      <div className="container">
        <div className="btn_holder">
          <button className="btn--blue" onClick={this.open}>
            Upload a File
          </button>
        </div>

        {Modal}

        <div className="row">
          {datas &&
            datas.map((dt, index) => (
              <div className="col-lg-3 col-md-4 my-3" key={index}>
                <div className="card">
                  <img
                    src="/images/file-text.svg"
                    height="50px"
                    width="30px"
                    className="card-img-top mt-2"
                    alt="..."
                  />
                  <div className="card-body">
                    <h5 className="card-title">
                      {(dt.filename + "." + dt.filetype).substring(0, 10)}
                    </h5>
                    <button
                      type="button"
                      className="btn btn-dark btn-sm pb-4"
                      onClick={() => this.deleteFile(dt.uuid)}
                    >
                      Delete
                    </button>
                    <a
                      className="btn btn-info btn-sm ml-2"
                      target="_blank"
                      rel="noopener noreferrer"
                      href={dt.url}
                    >
                      View
                    </a>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    );
  }
}

export default Filemanager;
