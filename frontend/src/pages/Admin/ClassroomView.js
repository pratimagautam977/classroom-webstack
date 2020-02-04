import React, { useState, useEffect } from "react";
//need state to store the JSON returns
import { useParams } from "react-router-dom";
import { GetClass, GetAssignment, GetExcludedStudent } from "../../components/classroom/ClassroomFunction";
import Modal from "../../components/classroom/Modal";

export default function ClassroomView() {

  const [isStaffModal, setStaffModal] = useState(false);
  const [isStudentModal, setStudentModal] = useState(false);

  const onStaffOpen =  () => {
    setStaffModal(true);
  }

  const onStaffClose = () => {
    setStaffModal(false);
  }

  const onStdOpen = () => {
    setStudentModal(true);
  }

  const onStdClose = () => {
    setStudentModal(false);
  }

  const feeds = () => {
    return (
      <div className="row">
        <div className="col-12 px-3">
            <form className="col-12 cards" >
              <p className="lead emoji-picker-container" style={{marginTop:"35px"}}>
                <textarea className=" col-12 form-control textarea-control" suppressContentEditableWarning={true} rows="2" placeholder="Share with your class" data-emojiable="true"></textarea>
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
    )
  }
  const people = () => {    
    return (
      <div className="row">
        <div className="col-lg-4 col-md-6 col-sm-12">
          <div className="cards p-3 hg-400">   
            <h5 style={{display: "inline-block", width: "calc(100% - 32px)"}}>Staffs</h5>
            <button className="btn btn-primary btn-sm pb-4" onClick={onStaffOpen} style={{display: "inline-block"}}><span className="icon-add-user"></span></button>

            {staff && staff.map(cl => (
              <div key={cl.staffID} className="dp m-0">
                <div className="round_img" >
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
              <button className="btn btn-primary btn-sm pb-4" onClick={onStdOpen} style={{display: "inline-block"}}><span className="icon-add-user"></span></button>
            {student && student.map((cl, index) => (
              <h6 key={index}>{cl.fname} {cl.lname}</h6>
            ))}
          </div>
        </div>

        <div className="col-lg-4 col-md-6 col-sm-12">
          <div className="cards p-3 hg-400">
            <h5>Upcoming Events</h5>
          </div>
        </div>
    
      </div>
    )
  }
  const assignments = () => {
    return (
    <div className="row">
      <div className="col-12">

        {AssignmentData.map(ass => (
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">{ass.name}</h5>
              <h6 className="card-subtitle mb-2 text-muted">{ass.staff_name}</h6>
              <small>{ass.assignedAt}</small>
              <p className="card-text">{ass.details}</p>
            </div>
          </div>
        ))} 
      </div>
    </div>
    )
  }

  const [ClassData, setClassData] = useState({});
  const [AssignmentData, setAssignmentData] = useState({});
  const [View, setView] = useState(feeds);
  const [Toggle, setToggle] = useState("feeds");
  let { id } = useParams();

  useEffect(() => {
    GetClass(id).then(res => {
      setClassData(res);
    });

    GetAssignment(id).then(res => {
      setAssignmentData(res);
    })
  }, [id]);

  let staff = ClassData.staffs;
  let student = ClassData.students;
  
  const changeView = (view) => {
    setView(view);
    setToggle(view);
  }

  console.log(<GetExcludedStudent ider={id}/>)
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

      <button className={`mr-2 mb-3 ${Toggle === "feeds" ? "disabled" : "btn-primary"} btn pb-4`}  onClick={() => changeView(feeds)}>Feeds</button>
      <button className={`mr-2 mb-3 ${Toggle === "people" ? "disabled" : "btn-primary"} btn pb-4`} onClick={() => changeView(people)}>People</button>
      <button className={`mr-2 mb-3 ${Toggle === "assignments" ? "disabled" : "btn-primary"} btn pb-4`} onClick={() => changeView(assignments)}>Assignments</button>
      {View}

      {isStaffModal ? <Modal title="Add Staff" close={onStaffClose} /> : ""}
      {isStudentModal ? <Modal title="Add Student" close={onStdClose} data={""}/>: ""}
      
    </div>
  );
}
