import React, { useState, useEffect } from "react";
import AddPayRequestModal from "../../components/classroom/AddPayRequestModal";
import axios from "axios";
import { Link } from "react-router-dom";
import { GetStudents } from "../../components/student/StudentFunction";

export default function AllPayment() {
  const [fees, setfees] = useState([]);
  const [student, setStudent] = useState([]);
  const [createFees, setCreateFees] = useState({
    amount: 0,
    uuid: ""
  });

  const onChange = e => {
    setCreateFees({ ...createFees, [e.target.name]: e.target.value });
  };

  const t = localStorage.getItem("token");
  useEffect(() => {
    GetStudents().then(res => {
      const students = res.data.student;
      setStudent(students);
    });

    axios
      .get("http://localhost:3000/pay", {
        headers: { Authorization: `Bearer ${t}` }
      })
      .then(res => {
        console.log(res.data.payment);
        setfees(res.data.payment);
      })
      .catch(err => {
        console.log(err.response);
      });
  }, [t]);

  const onSubmit = e => {
    const t = localStorage.getItem("token");
    e.preventDefault();

    axios.post("http://localhost:3000/pay/create", createFees, {
        headers: { Authorization: `Bearer ${t}` }
    
    })
    .then(result => {
        console.log(result.data);
    })
    .catch(err => {
        console.log(err.response);
    })
  };

  const bodymsg = (
    <form onSubmit={onSubmit}>
      <div className="form-group col-md-12">
        <label htmlFor="inputState">Students Name</label>
        <select
          name="uuid"
          id="inputState"
          className="form-control"
          onChange={onChange}
        >
          <option defaultValue="">Choose...</option>

          {student.map((stud, index) => (
            <option value={stud.studID} key={index}>
              {stud.fname + " " + stud.lname}
            </option>
          ))}
        </select>

        <br />
        <div className="form-group">
          <label htmlFor="amount">Amount</label>
          <input
            className="form-control"
            type="number"
            name="amount"
            id="amount"
            placeholder="Amount"
            onChange={onChange}
            value={createFees.amount || ""}
          />
        </div>

        <div className="form-group mb-0">
          <button type="submit" className="btn--blue">
            Create Request
          </button>
        </div>
      </div>
    </form>
  );

  return (
    <div>
      <AddPayRequestModal
        body={bodymsg}
        title={"Add Payment Request"}
        btn={"+ Add Request"}
      />
      <table className="table">
        <thead className="thead-dark">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Date Created</th>
            <th scope="col">Student Name</th>
            <th scope="col">Amount</th>
            <th scope="col"></th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody>
          {fees.map((fee, index) => (
            <tr key={index}>
              <th className="py-3" scope="row">
                {index + 1}
              </th>
              <td className="py-3">{fee.requestDate}</td>
              <th className="py-3" scope="row">
                {fee.student.fname + " " + fee.student.lname}
              </th>

              <td className="py-3">{fee.amount}</td>
              <td>
                {fee.status ? (
                  ""
                ) : (
                  <Link
                    to={`/pay/${fee.requestID}`}
                    className="btn btn-primary btn-sm"
                  >
                    Pay
                  </Link>
                )}
              </td>
              <td>
                {fee.status ? (
                  <h4>
                    <span className="badge badge-success">Paid</span>
                  </h4>
                ) : (
                  <h4>
                    <span className="badge badge-danger">Pending</span>
                  </h4>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
