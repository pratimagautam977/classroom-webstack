import React, { useState, useEffect } from "react";
//u also need state dear to store the JSON returns
import { useParams } from "react-router-dom";
import { GetClass } from "../../components/classroom/ClassroomFunction";

export default function ClassroomView() {
  const [ClassData, setClassData] = useState({});
  let { id } = useParams();

  useEffect(() => {
    GetClass(id).then(res => {
      setClassData(res);
    });
  }, []);
  let staff = ClassData.staffs;
  let student = ClassData.students;
  
  return (
    <div>
      <div className="row">
        <div className="col-12">
          <div
            className="cards hg-100"
            style={{ background: `url(${ClassData.img})` }}
          >
            <div className="p-5 h-w-b">
              <h2>{ClassData.name}</h2>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
          <div className="col-12 px-3">
            <form className="col-12 cards" >
              <p className="lead emoji-picker-container" style={{marginTop:"35px"}}>
                <textarea className=" col-12 form-control textarea-control" contentEditable="true" rows="2" placeholder="Share with your class" data-emojiable="true"></textarea>
              </p>
              <div className="footer d-inline">
                <div className="footer__btn pr-2">
                  <button className="footer_btn mr-3"><span className="icon-chat"></span></button>
                  <button className="footer_btn mr-3"><span className="icon-promotion"></span></button>
                  <button className="footer_btn mr-3"><span className="icon-assignment"></span></button>
                  <button className="footer_btn mr-3"><span className="icon-folder"></span></button>
                </div>
              </div>

            </form> 
        </div>
      </div>

      <div className="row">
        <div className="col-lg-4 col-md-6 col-sm-12">
          <div className="cards p-3 hg-400">

            
            <h5 style={{display: "inline-block", width: "calc(100% - 32px)"}}>Staffs</h5>
            <button className="btn btn-primary btn-sm pb-4" style={{display: "inline-block"}}><span className="icon-add-user"></span></button>

            {staff && staff.map(cl => (
              <div key={cl.staffID} className="dp m-0">
                <div className="round_img">
                    <img  className="" alt="" src={cl.img} width="40px" />

                </div>
                <div className="name_area">
                    <li >{cl.fname} {cl.lname}</li>
                </div> 
              </div>             
            ))}
          </div>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-12">
          <div className="cards p-3 hg-400">
            <h5 style={{display: "inline-block", width: "calc(100% - 32px)"}}>Students</h5>
              <button className="btn btn-primary btn-sm pb-4" style={{display: "inline-block"}}><span className="icon-add-user"></span></button>
            {student && student.map(cl => (
              <h6>{cl.fname} {cl.lname}</h6>
            ))}
          </div>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-12">
          <div className="cards p-3 hg-400">
            <h5>Upcoming Events</h5>
          </div>
        </div>
      </div>
    </div>
  );
}
