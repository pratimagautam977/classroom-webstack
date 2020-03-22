import React from "react";

export default function Assignment(props) {
  return (
    <div className="row">
      <div className="col-12">
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
