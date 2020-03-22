import React, { useState } from "react";
import {
  PostAssignment,
  GetAssignment
} from "../../components/classroom/ClassroomFunction";

export default function Assignment(props) {
  const [assign, setAssign] = useState({
    names: "",
    details: ""
  });

  const onAssignChange = e => {
    setAssign({ ...assign, [e.target.name]: e.target.value });
  };

  const onAssignmentSubmit = e => {
    e.preventDefault();

    PostAssignment(props.id, assign.names, assign.details)
      .then(res => {
        setAssign({
          names: "",
          details: ""
        });
        GetAssignment(props.id).then(result => {
          props.setAssignmentData(result);
        });
      })
      .catch(err => {});
  };

  return (
    <div className="row">
      <div className="col-12">
        <div className="row">
          <div className="col-12 px-3">
            <form className="col-12 cards" onSubmit={onAssignmentSubmit}>
              <div
                className="lead emoji-picker-container"
                style={{ marginTop: "1px", marginRight: "5px" }}
              >
                <div className="row">
                  <div className="col-8">
                    <input
                      required
                      type="text"
                      className="col-12 form-control textarea-control"
                      placeholder="Assignment Title"
                      data-emojiable="true"
                      name="names"
                      onChange={onAssignChange}
                      value={assign.names}
                    ></input>
                  </div>
                  <div className="col-4">
                    <button
                      type="submit"
                      className="btn btn-primary pb-4"
                      aria-label="Left Align"
                    >
                      <span
                        className="glyphicon glyphicon-align-left"
                        aria-hidden="true"
                      >
                        Create an Assignment
                      </span>
                    </button>
                  </div>
                </div>

                <textarea
                  required
                  className="col-12 form-control textarea-control"
                  suppressContentEditableWarning={true}
                  rows="2"
                  placeholder="Share with your class"
                  data-emojiable="true"
                  name="details"
                  onChange={onAssignChange}
                  value={assign.details}
                ></textarea>
              </div>
              <div className="footer d-inline">
                <div className="footer__btn pr-2"></div>
              </div>
            </form>
          </div>
        </div>

        {props.AssignmentData &&
          props.AssignmentData.map(ass => (
            <div className="card" key={ass}>
              <div className="card-body">
                <h5 className="card-title">{ass.name}</h5>
                <h6 className="card-subtitle mb-2 text-muted">
                  {ass.staff_name}
                </h6>
                <small>{ass.assignedAt}</small>
                <p className="card-text">{ass.details}</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
