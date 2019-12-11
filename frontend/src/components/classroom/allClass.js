// sfc => for making functional component
import React from "react";
import {Link} from 'react-router-dom'

export default function AllClass(props) {
  const items = props.data;
  if (items.length === 0){
    return <div className="empty">
      <img src="./images/null.png" alt="noclass"/>
      <h5 className="mt-3">No Classroom Yet!</h5>
    </div>
  }else{
    return (
      <div className="row">
        {props.data.map(classes => (
        <Link to={`/classroom/${classes.classID}`}  key={classes.classID}>          
          <div className="col cd">
              <div className="cards_full">
                  <div className="cards_header" style={{background: `url(${classes.img})`}}>
                      <h4>{classes.name}</h4>
                  </div>
                  <div className="card_body">
                      <p className="card-text">Admin</p>
                  </div>
                  <div className="footer">
                    <div className="footer__btn">
                      <button className="footer_btn"><span className="icon-chat"></span></button>
                      <button className="footer_btn"><span className="icon-promotion"></span></button>
                      <button className="footer_btn"><span className="icon-assignment"></span></button>
                      <button className="footer_btn"><span className="icon-folder"></span></button>
                    </div>
                  </div>
              </div>
          </div>
        </Link>))}
      </div>
    );
  }
}
