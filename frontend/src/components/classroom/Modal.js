import React, { useState } from "react";

export default function Modal(props) {
  const [isToggled, setToggled] = useState(true);

  return (
    <React.Fragment>
      <div className={isToggled ? "m-menu -active" : "m-menu "}>
        <div className="modal_highlight">
          <div className="modal_main">
            <div className="modal_head">
              <div className="modal_title">
                <h2>{props.title}</h2>
              </div>
              <div className="modal_btn">
                <button className="cross" onClick={props.close}>
                  ⓧ
                </button>
              </div>
            </div>
            <div className="modal_body">
              {props.data && props.data.map(std => <p>{std.name}</p>)}
            </div>
            <div className="modal_footer"></div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
