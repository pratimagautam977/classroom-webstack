import React, { Component } from "react";
import { GetTask, UpdateTask} from "./CalendarFunction";


import moment from "moment";


moment.locale("en-GB");

export default class EditTaskModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editData: {
        
      },
      toggle: false,
      load: true
    };
  }

  close = () => {
    this.setState({ toggle: true });
  };

  onChange = e => {
    let editData = this.state.editData;
    editData[e.target.name] = e.target.value;
    this.setState({ editData });
    
  };

  onSubmit = e => {
    e.preventDefault();
    const editData = this.state.editData;
    UpdateTask(editData, this.props.id, this.props.route).then((res) => {
      console.log(res);
      this.props.toggle(); //this ran
      this.props.update();
    });
  };

  componentDidMount() {
    const id = this.props.id;
    GetTask(id, this.props.route).then(res => {
      console.log(res);
      const editData = res.data;
      this.setState({ editData, load: false});
      console.log(moment(this.state.editData.start).format('YYYY-MM-DD kk:mm')) 
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
                  {
                    this.state.load ? 
                    <div style={{height: "200px", display: "flex", width: "100%", justifyContent: "center", alignItems: "center"}}>
                      <div className="loader" id="loader-1"></div>
                    </div> :
                  
                  <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                      <label htmlFor="title">Task Name</label>
                      <input
                        className="form-control"
                        type="text"
                        name="title"
                        id="title"
                        placeholder="Task Name"
                        onChange={this.onChange}
                        value={this.state.editData.title || ''}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="start">Start Date</label>
                      <input
                        className="form-control"
                        type="datetime-local"
                        name="start"
                        id="start"
                        placeholder="Start Date"
                        onChange={this.onChange}
                        value={moment(this.state.editData.start).format('YYYY-MM-DDTkk:mm') || ''}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="end">End Date</label>
                      <input
                        className="form-control"
                        type="datetime-local"
                        name="end"
                        id="end"
                        placeholder="End Date"
                        onChange={this.onChange}
                        value={moment(this.state.editData.end).format('YYYY-MM-DDTkk:mm') || ''}
                      />
                    </div>
                    
                    <div className="form-group mb-0">
                      <button type="submit" className="btn--blue">
                        Edit
                      </button>
                    </div>
                  </form>
                  }
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
