import React from "react";
import { NavLink,withRouter } from "react-router-dom";

function Topbar (props) {
  let logout = () =>{
   localStorage.removeItem("token")
   props.history.push('/login')
  }
  return (
    <div className="topbar">

      <div className="profile">
          <img src={props.data} alt="profile"/>
      </div>

      <div className="item" onClick={logout}>
        <button style={{ fontSize: "22px"}}>
          <span className="icon-logout"></span>
        </button>
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
        <NavLink to="/note" activeClassName="selected">
            <span className="icon-note"></span>
        </NavLink>
      </div>
    </div>
  );
}
export default withRouter(Topbar);