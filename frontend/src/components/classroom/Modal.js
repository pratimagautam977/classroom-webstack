import React, { useState } from "react";
import { AddClass } from "./ClassroomFunction";

export default function Modal(props) {
  const [isToggled, setToggled] = useState(true);
  //const [data, setData] = useState(props.data);

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
              {props.data &&
                props.data.map((info, i) => (
                  <div className="row" key={i}>
                    <div className="col-10">
                      <p>{info.name}</p>
                    </div>
                    <div className="col-2">
                      <button
                        className="btn btn-primary btn-sm pb-4"
                        style={{ display: "inline-block" }}
                        onClick={() => props.Add(info.uuid)}
                      >
                        <span className="icon-add-user"></span>
                      </button>
                    </div>
                  </div>
                ))}
            </div>
            <div className="modal_footer"></div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
