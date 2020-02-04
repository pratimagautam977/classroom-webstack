import React, { Component } from 'react'
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import axios from 'axios';
import {Helmet} from 'react-helmet';
import AddTaskModal from '../../components/calendar/AddTask';
import {AddTask, GetTasks, DeleteTask} from '../../components/calendar/CalendarFunction';
import EditTaskModal from "../../components/calendar/EditTask";

moment.locale("en-GB");
const localizer = momentLocalizer(moment);

export default class CalendarInstitute extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          cal_events: [
            //State is updated via componentDidMount
          ],
          newCalendarData: {
            title: "",
            start: "",
            end:""
          },
          isActiveEdit: false,
          EditValue: ""
        }
      }

      onChange= e => {
        let newCalendarData= this.state.newCalendarData;
        newCalendarData[e.target.name] = e.target.value;
        this.setState({newCalendarData});
      }

      onSubmit = e => {
        e.preventDefault()
        const task = this.state.newCalendarData;
        AddTask(task).then(res => {
          console.log(res)
          GetTasks().then(res => {
            const cal_events = res.data;
            this.setState({cal_events});
          })
          this.setState({newCalendarData:{
            title: "",
            start: "",
            end: ""
          }})
        })
      }

      UpdateTask = (value) => {
        this.setState({isActiveEdit: true, EditValue: value})
      }

      CloseModal = () => {
        this.setState({isActiveEdit: false, EditValue: ""})
      }

      onUpdateedit = () => {
        GetTasks().then(res => {
          const cal_events = res.data;
          this.setState({ cal_events });
        })
    
      }

      DeleteTask = (id) => {
        DeleteTask(id).then(res => {
          console.log(res);
          const cal_events = this.state.cal_events.filter(task => task.id !== id);
          this.setState({cal_events});
        })
      }

    
      convertDate = (date) => {
        return moment.utc(date).toDate()
      }
    
      componentDidMount() {

        GetTasks().then(res => {
          const cal_events = res.data; 
          this.setState({cal_events});
        })

        const t = localStorage.getItem('token');
        axios
          .get("http://localhost:3000/institute/calendar", {
            headers: {'Authorization': `Bearer ${t}`}
            })
          .then(response => {
            console.log(response.data);
            let appointments = response.data;
    
            for (let i = 0; i < appointments.length; i++) {
              appointments[i].start = this.convertDate(appointments[i].start)
              appointments[i].end = this.convertDate(appointments[i].end)
            }
    
            this.setState({
              cal_events:appointments
            })
          })
          .catch(function(error) {
            console.log(error);
          });
      }
    
      render() {
    
        const {cal_events} = this.state;

        const bodymsg = (
          <div>
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
                  value={this.state.newCalendarData.title || ''}
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
                  value={this.state.newCalendarData.start || ''}
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
                  value={this.state.newCalendarData.end || ''}
                />
              </div>
              <div className="form-group mb-0">
                <button type="submit" className="btn--blue">Add</button>            
              </div>
            </form>
          </div>
        )

        const isActiveEdit = this.state.isActiveEdit

        return (
          
          <React.Fragment>
            <Helmet>
            <title>Classroom WebStack | Calendar</title>
            </Helmet>

            { isActiveEdit ? <EditTaskModal toggle={this.CloseModal} update={this.onUpdateedit} id={this.state.EditValue} /> : ""}

            <AddTaskModal
              body={bodymsg}
              title={"Add Task"}
              btn={"+ Add Task"}
            />
            
            <div className="row" style={{width: "100%", margin: "0"}}>
              <div className="col-lg-8 col-md-6 col-sm-12">
                <div className="cards" style={{height: "80vh"}}>
                  <Calendar
                    localizer={localizer}
                    events={cal_events}
                    step={30}
                    defaultView='month'
                    views={['month','week','day']}
                    defaultDate={new Date()}
                />
                </div>
              </div>
              <div className="col-lg-4 col-md-6 col-sm-12">
                <div className="cards" style={{height: "80vh"}}>
                  <div className="row">
            
                    {this.state.cal_events.map(task => (
                      <div className="col-12" key={task.id}>
                        <div className="row">
                          <div className="col-8">
                            <p className="f-16">{task.title}</p>
                            <p className="f-12">{"Start On: " + moment(task.start).format('YYYY-MM-DD kk:mm')}</p>
                            <p className="f-12">{"End At: " + moment(task.end).format('YYYY-MM-DD kk:mm')}</p>
                            <p></p>
                          </div>
                          <div className="col-4">
                            <button className="button_table" style={{fontSize: "15px"}} onClick={() => this.UpdateTask(task.id)}><span className="icon-pencil"/></button>
                            <button className="button_table" style={{fontSize: "15px"}} onClick={() => this.DeleteTask(task.id)}><span className="icon-delete" /></button>
                          </div>
                        </div>
                      </div>  
                    ))}
                  </div>

                </div>
              </div>
            </div>
            
          </React.Fragment>
        );
      }    
}
