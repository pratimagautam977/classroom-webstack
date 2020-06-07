import React from "react";
import { NavLink, withRouter } from "react-router-dom";
import { UncontrolledTooltip } from "reactstrap";

function Topbar(props) {
  let logout = () => {
    localStorage.removeItem("token");
    props.history.push("/login");
  };
  return (
    <div className="topbar">
      <div className="profile" id="profile">
        <img
          src={props.data}
          alt="profile"
          style={{ width: 40, height: 40, objectFit: "cover" }}
        />
        <UncontrolledTooltip placement="bottom" target="profile">
          Profile
        </UncontrolledTooltip>
      </div>

      <div className="item" id="logout" onClick={logout}>
        <button style={{ fontSize: "22px" }}>
          <span className="icon-logout"></span>
        </button>
        <UncontrolledTooltip placement="bottom" target="logout">
          Logout
        </UncontrolledTooltip>
      </div>

      <div className="item" id="setting">
        <NavLink to="/settings" activeClassName="selected">
          <span className="icon-settings"></span>
        </NavLink>
        <UncontrolledTooltip placement="bottom" target="setting">
          Settings
        </UncontrolledTooltip>
      </div>

      <div className="item" id="notification">
        <NavLink to="/note" activeClassName="selected">
          <span className="icon-edit"></span>
        </NavLink>
        <UncontrolledTooltip placement="bottom" target="notification">
          Notes
        </UncontrolledTooltip>
      </div>

      <div className="item" id="note">
        <NavLink to="/notification" activeClassName="selected">
          <span className="icon-note"></span>
        </NavLink>
        <UncontrolledTooltip placement="bottom" target="note">
          Notification
        </UncontrolledTooltip>
      </div>
    </div>
  );
}
export default withRouter(Topbar);
