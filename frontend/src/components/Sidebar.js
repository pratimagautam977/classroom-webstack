import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Sidebar(props) {
    if(props.value === 'ins'){
    
    return (
        <div className="sidebar">
            <div className="_logo">
                <img src="./images/logo_m.png" alt="classroom"/>
            </div>
            <div className="item">
                <NavLink to="/student" activeClassName="selected"><span className="icon-cap"></span></NavLink>
            </div>
            <div className="item">
                <NavLink to="/staff" activeClassName="selected"><span className="icon-hired"></span></NavLink>
            </div>
            <div className="item">
                <NavLink to="/classroom" activeClassName="selected"><span className="icon-blackboard"></span></NavLink>
            </div>
            <div className="item">
                <NavLink to="/idea" activeClassName="selected"><span className="icon-idea"></span></NavLink>
            </div>
            <div className="item">
                <NavLink to="/broadcast" activeClassName="selected"><span className="icon-promotion"></span></NavLink>
            </div>
            <div className="item">
                <NavLink to="/files" activeClassName="selected"><span className="icon-file"></span></NavLink>
            </div>
            <div className="item">
                <NavLink to="/messenger" activeClassName="selected"><span className="icon-conversation"></span></NavLink>
            </div>
            <div className="item">
                <NavLink to="/calendar" activeClassName="selected"><span className="icon-calendar"></span></NavLink>
            </div>
        </div>
    )
    }
    else if(props.value === 'staff'){
        return (
            <div className="sidebar">
                <div className="_logo">
                    <img src="./images/logo_m.png" alt="classroom"/>
                </div>
                <div className="item">
                    <NavLink to="/classroom" activeClassName="selected"><span className="icon-blackboard"></span></NavLink>
                </div>
                <div className="item">
                    <NavLink to="/student" activeClassName="selected"><span className="icon-cap"></span></NavLink>
                </div>
                <div className="item">
                    <NavLink to="/staff" activeClassName="selected"><span className="icon-hired"></span></NavLink>
                </div>
                <div className="item">
                    <NavLink to="/file" activeClassName="selected"><span className="icon-file"></span></NavLink>
                </div>
                <div className="item">
                    <NavLink to="/chat" activeClassName="selected"><span className="icon-conversation"></span></NavLink>
                </div>
                <div className="item">
                    <NavLink to="/calendar" activeClassName="selected"><span className="icon-calendar"></span></NavLink>
                </div>
            </div>
        )
    }

    else if(props.value === 'stud'){
        return(
            <div className="sidebar">
                <div className="_logo">
                    <img src="./images/logo_m.png" alt="classroom"/>
                </div>
                <div className="item">
                    <NavLink to="/classroom" activeClassName="selected"><span className="icon-blackboard"></span></NavLink>
                </div>
                <div className="item">
                    <NavLink to="/student" activeClassName="selected"><span className="icon-cap"></span></NavLink>
                </div>
                <div className="item">
                    <NavLink to="/staff" activeClassName="selected"><span className="icon-hired"></span></NavLink>
                </div>
                <div className="item">
                    <NavLink to="/file" activeClassName="selected"><span className="icon-file"></span></NavLink>
                </div>
                <div className="item">
                    <NavLink to="/chat" activeClassName="selected"><span className="icon-conversation"></span></NavLink>
                </div>
                <div className="item">
                    <NavLink to="/calendar" activeClassName="selected"><span className="icon-calendar"></span></NavLink>
                </div>
            </div>
        )
    }
}

