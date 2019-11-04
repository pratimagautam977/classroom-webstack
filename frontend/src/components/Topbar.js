import React from "react";
import { NavLink } from "react-router-dom";

export default function Topbar (props) {
  return (
    <div className="topbar">

      <div className="profile">
          <img src={props.data} alt="profile"/>
      </div>

      <div className="item">
        <NavLink to="/settings" activeClassName="selected">
          <span className="icon-settings"></span>
        </NavLink>
      </div>
      
      <div className="item">
        <NavLink to="/notification" activeClassName="selected">
            <span className="icon-edit"></span>
        </NavLink>
      </div>

      <div className="item">
        <NavLink to="/notification" activeClassName="selected">
            <span className="icon-note"></span>
        </NavLink>
      </div>

    </div>
  );
}
