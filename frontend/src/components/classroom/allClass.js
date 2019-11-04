// sfc => for making functional component
import React from "react";

export default function AllClass(props) {
  return (
    <div className="row">
      {props.data.map(classes => (
      
      <div  key={classes.classID} className="col-3 pl-3 pr-2">
          <div className="cards">
              <div className="dp">
                  <h4>{classes.name}</h4>
              </div>
          </div>
      </div>))}
    </div>
  );
}
