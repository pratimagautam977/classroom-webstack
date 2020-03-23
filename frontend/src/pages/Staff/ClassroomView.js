import React, { useState, useEffect } from "react";
//need state to store the JSON returns
import { useParams } from "react-router-dom";
import {
  GetClass,
  GetAssignment,
  DeleteAssignment
} from "../../components/classroom/ClassroomFunction";
import Assignment from "./Assignment";

export default function ClassroomView() {
  let { id } = useParams();

  const feeds = () => {
    return (
      <div className="row">
        <div className="col-12 px-3">
          <form className="col-12 cards">
            <p
              className="lead emoji-picker-container"
              style={{ marginTop: "35px" }}
            >
              <textarea
                className=" col-12 form-control textarea-control"
                suppressContentEditableWarning={true}
                rows="2"
                placeholder="Share with your class"
                data-emojiable="true"
              ></textarea>
            </p>
            <div className="footer d-inline">
              <div className="footer__btn pr-2">
                <button type="submit" className="btn btn-primary  pb-4">
                  Send
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  };

  const people = () => {
    return (
      <div className="row">
        <div className="col-lg-4 col-md-6 col-sm-12">
          <div className="cards p-3 hg-400">
            <h5 style={{ display: "inline-block", width: "calc(100% - 32px)" }}>
              Staffs
            </h5>

            {staff &&
              staff.map(cl => (
                <div key={cl.staffID} className="dp m-0">
                  <div className="round_img">
                    <img className="" alt="" src={cl.img} width="40px" />
                  </div>
                  <div className="name_area f-14">
                    <li>
                      {cl.fname} {cl.lname}
                    </li>
                  </div>
                </div>
              ))}
          </div>
        </div>

        <div className="col-lg-4 col-md-6 col-sm-12">
          <div className="cards p-3 hg-400">
            <h5 style={{ display: "inline-block", width: "calc(100% - 32px)" }}>
              Students
            </h5>

            {student &&
              student.map(cl => (
                <div key={cl.studID} className="dp m-0">
                  <div className="round_img">
                    <img className="" alt="" src={cl.img} width="40px" />
                  </div>
                  <div className="name_area f-14">
                    <li>
                      {cl.fname} {cl.lname}
                    </li>
                  </div>
                </div>
              ))}
          </div>
        </div>

        <div className="col-lg-4 col-md-6 col-sm-12">
          <div className="cards p-3 hg-400">
            <h5>Upcoming Events</h5>
          </div>
        </div>
      </div>
    );
  };

  const [AssignmentData, setAssignmentData] = useState([]);
  const [ClassData, setClassData] = useState({});
  const [View, setView] = useState(feeds);
  const [Toggle, setToggle] = useState("feeds");

  useEffect(() => {
    GetClass(id).then(res => {
      setClassData(res);
    });

    GetAssignment(id).then(res => {
      setAssignmentData(res);
    });
  }, [id]);

  let staff = ClassData.staffs;
  let student = ClassData.students;

  const changeView = view => {
    setView(view);
    if (view === feeds) {
      return setToggle("feeds");
    } else if (view === people) {
      return setToggle("people");
    } else if (view === "") {
      return setToggle("assignments");
    }
  };
  const onDeleteAssignment = (assID) => {
    DeleteAssignment(assID).then(res =>{
      GetAssignment(id).then(resi => {
        setAssignmentData(resi);
      });
    })
  }
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

      <button
        className={`mr-2 mb-3 ${
          Toggle === "feeds" ? "disabled" : "btn-primary"
        } btn pb-4`}
        onClick={() => changeView(feeds)}
      >
        Feeds
      </button>
      <button
        className={`mr-2 mb-3 ${
          Toggle === "people" ? "disabled" : "btn-primary"
        } btn pb-4`}
        onClick={() => changeView(people)}
      >
        People
      </button>
      <button
        className={`mr-2 mb-3 ${
          Toggle === "assignments" ? "disabled" : "btn-primary"
        } btn pb-4`}
        onClick={() => changeView("")}
      >
        Assignments
      </button>
      {View}
      {Toggle === "assignments" ? (
        <Assignment AssignmentData={AssignmentData} setAssignmentData={setAssignmentData} id={id} onDeleteAssignment={onDeleteAssignment}/>
      ) : (
        ""
      )}
    </div>
  );
}
