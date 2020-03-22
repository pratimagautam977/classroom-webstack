import React from 'react'
import { NavLink } from 'react-router-dom'
import { UncontrolledTooltip } from 'reactstrap';


export default function Sidebar(props) {
    if(props.value === 'ins'){
    
    return (
        <div className="sidebar">
            <div className="_logo" id="logo">
                <img src="./images/logo_m.png" alt="classroom"/>
                <UncontrolledTooltip placement="right" target="logo">
                    Classroom Webstack
                </UncontrolledTooltip>
            </div>
            <div className="item" id="student">
                <NavLink to="/student" activeClassName="selected" ><span className="icon-cap"></span></NavLink>
                <UncontrolledTooltip placement="right" target="student">
                    Students
                </UncontrolledTooltip>
            </div>
            <div className="item" id="staff">
                <NavLink to="/staff" activeClassName="selected"><span className="icon-hired"></span></NavLink>
                <UncontrolledTooltip placement="right" target="staff">
                    Staffs
                </UncontrolledTooltip>
            </div>
            <div className="item"  id="classroom">
                <NavLink to="/classroom" activeClassName="selected"><span className="icon-blackboard"></span></NavLink>                
                <UncontrolledTooltip placement="right" target="classroom">
                    Classrooms
                </UncontrolledTooltip>
            </div>
            <div className="item" id="calendar">
                <NavLink to="/calendar" activeClassName="selected"><span className="icon-calendar"></span></NavLink>
                <UncontrolledTooltip placement="right" target="calendar">
                    Calendar
                </UncontrolledTooltip>
            </div>
            <div className="item" id="idea">
                <NavLink to="/idea" activeClassName="selected"><span className="icon-idea"></span></NavLink>
                <UncontrolledTooltip placement="right" target="idea">
                    Ideas
                </UncontrolledTooltip>
            </div>
            <div className="item" id="news-broadcast">
                <NavLink to="/broadcast" activeClassName="selected"><span className="icon-promotion"></span></NavLink>
                <UncontrolledTooltip placement="right" target="news-broadcast">
                    News Broadcast
                </UncontrolledTooltip>
            </div>
            <div className="item" id="files">
                <NavLink to="/files" activeClassName="selected"><span className="icon-file"></span></NavLink>
                <UncontrolledTooltip placement="right" target="files">
                    Files
                </UncontrolledTooltip>
            </div>
            {/* <div className="item">
                <NavLink to="/messenger" activeClassName="selected"><span className="icon-conversation"></span></NavLink>
            </div> */}
            <div className="item" id="payment">
                <NavLink to="/pay" activeClassName="selected"><span><img src='./images/pay.png' alt="pay"/></span></NavLink>
                <UncontrolledTooltip placement="right" target="payment">
                    Payment
                </UncontrolledTooltip>
            </div>
        </div>
    )
    }
    else if(props.value === 'staff'){
        return (
            <div className="sidebar">
                <div className="_logo" id="logo">
                    <img src="./images/logo_m.png" alt="classroom"/>
                    <UncontrolledTooltip placement="right" target="logo">
                        Classroom Webstack
                    </UncontrolledTooltip>
                </div>
                <div className="item" id="classroom">
                    <NavLink to="/classroom" activeClassName="selected"><span className="icon-blackboard"></span></NavLink>
                    <UncontrolledTooltip placement="right" target="classroom">
                        Classroom
                    </UncontrolledTooltip>
                </div>
                <div className="item" id="student">
                    <NavLink to="/student" activeClassName="selected"><span className="icon-cap"></span></NavLink>
                    <UncontrolledTooltip placement="right" target="student">
                        Students
                    </UncontrolledTooltip>
                </div>
                <div className="item" id="staff">
                    <NavLink to="/staff" activeClassName="selected"><span className="icon-hired"></span></NavLink>
                    <UncontrolledTooltip placement="right" target="staff">
                        Staffs
                    </UncontrolledTooltip>
                </div>
                <div className="item" id="file">
                    <NavLink to="/file" activeClassName="selected"><span className="icon-file"></span></NavLink>
                    <UncontrolledTooltip placement="right" target="file">
                        Files
                    </UncontrolledTooltip>
                </div>
                <div className="item" id="chat">
                    <NavLink to="/chat" activeClassName="selected"><span className="icon-conversation"></span></NavLink>
                    <UncontrolledTooltip placement="right" target="chat">
                        Chat System
                    </UncontrolledTooltip>
                </div>
                <div className="item" id="calendar">
                    <NavLink to="/calendar" activeClassName="selected"><span className="icon-calendar"></span></NavLink>
                    <UncontrolledTooltip placement="right" target="calendar">
                        Calendar
                    </UncontrolledTooltip>
                </div>
            </div>
        )
    }

    else if(props.value === 'stud'){
        return(
            <div className="sidebar">
                <div className="_logo" id="logo">
                    <img src="./images/logo_m.png" alt="classroom"/>
                    <UncontrolledTooltip placement="right" target="logo">
                        Classroom Webstack
                    </UncontrolledTooltip>
                </div>
                <div className="item" id="classroom">
                    <NavLink to="/classroom" activeClassName="selected"><span className="icon-blackboard"></span></NavLink>
                    <UncontrolledTooltip placement="right" target="classroom">
                        Classroom
                    </UncontrolledTooltip>
                </div>
                <div className="item" id="student">
                    <NavLink to="/student" activeClassName="selected"><span className="icon-cap"></span></NavLink>
                    <UncontrolledTooltip placement="right" target="student">
                        Students
                    </UncontrolledTooltip>
                </div>
                <div className="item" id="staff">
                    <NavLink to="/staff" activeClassName="selected"><span className="icon-hired"></span></NavLink>
                    <UncontrolledTooltip placement="right" target="staff">
                        Staffs
                    </UncontrolledTooltip>
                </div>
                <div className="item" id="file">
                    <NavLink to="/file" activeClassName="selected"><span className="icon-file"></span></NavLink>
                    <UncontrolledTooltip placement="right" target="file">
                        Files
                    </UncontrolledTooltip>
                </div>
                <div className="item" id="chat">
                    <NavLink to="/chat" activeClassName="selected"><span className="icon-conversation"></span></NavLink>
                    <UncontrolledTooltip placement="right" target="chat">
                        Messages
                    </UncontrolledTooltip>
                </div>
                <div className="item" id="calendar">
                    <NavLink to="/calendar" activeClassName="selected"><span className="icon-calendar"></span></NavLink>
                    <UncontrolledTooltip placement="right" target="calendar">
                        Calendar
                    </UncontrolledTooltip>
                </div>
                <div className="item" id="pay">
                    <NavLink to="/pay" activeClassName="selected"><span><img src='./images/pay.png' alt="pay"/></span></NavLink>
                    <UncontrolledTooltip placement="right" target="pay">
                        Payment
                    </UncontrolledTooltip>
                </div>
            </div>
        )
    }
}

