// sfc => for making functional component
import React from "react";

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
        
        <div  key={classes.classID} className="col cd">
            <div className="cards_full">
                <div className="cards_header" style={{background: `url(${classes.img})`}}>
                    <h4>{classes.name}</h4>
                </div>
                <div className="card_body">
                    <p className="card-text">Admin</p>
                    
                </div>
                <div className="footer">
                  <div className="footer__btn">
                    <a href=" " className="footer_btn"><span className="icon-chat"></span></a>
                    <a href=" " className="footer_btn"><span className="icon-promotion"></span></a>
                    <a href=" " className="footer_btn"><span className="icon-assignment"></span></a>
                    <a href=" " className="footer_btn"><span className="icon-folder"></span></a>
                  </div>
                </div>
            </div>
        </div>))}
      </div>
    );
  }
}
