import React, { useEffect, useState } from "react";
import Axios from "axios";

export default function Broadcast() {
  const [Message, setMessage] = useState("");
  const [Data, setData] = useState({
    message: "",
    type: 1,
  });
  const [Prog, setProg] = useState("");
  const onChange = (e) => {
    let newStudentData = Data;
    newStudentData[e.target.name] = e.target.value;
    setData({ ...Data, newStudentData });
  };
  useEffect(() => {
    const t = localStorage.getItem("token");
    Axios.get("http://localhost:3000/institute/broadcast", {
      headers: { Authorization: `Bearer ${t}` },
    }).then((resp) => {
      setMessage(resp.data);
    });
  }, [Prog]);

  const onClicked = () => {
    setProg("");
    setTimeout(() => {
      const t = localStorage.getItem("token");
      Axios.post("http://localhost:3000/institute/broadcast", Data, {
        headers: { Authorization: `Bearer ${t}` },
      })
        .then((resp) => {
          setProg("1");
          setData({
            message: "",
            type: 1,
          });
        })
        .catch((err) => {
          console.log("err" + err);
        });
    }, 1000);
  };

  return (
    <div>
      <div className="row mt-5">
        <div className="col-md-6">
          <div className="form-group">
            <label for="inputState">Message</label>
            <input
              className="form-control"
              type="text"
              name="message"
              id="message"
              placeholder="Message"
              onChange={onChange}
              value={Data.message || ""}
            />
          </div>
        </div>
        <div className="col-md-6">
          <div class="form-group col-md-12">
            <label for="inputState">State</label>
            <select
              id="inputState"
              name="type"
              onChange={onChange}
              class="form-control"
            >
              <option selected>Select</option>
              <option value="1">Success</option>
              <option value="2">Alert</option>
              <option value="3">Info</option>
            </select>
          </div>
        </div>
        <div className="col-md-12">
          <button className="btn btn-primary pb-4" onClick={() => onClicked()}>
            Send
          </button>
        </div>
      </div>

      {Message &&
        Message.map((msg) => {
          if (msg.type === 1) {
            return (
              <div class="alert my-3 alert-success" role="alert">
                {msg.message}
              </div>
            );
          } else if (msg.type === 2) {
            return (
              <div class="alert my-3 alert-danger" role="alert">
                {msg.message}
              </div>
            );
          } else if (msg.type === 3) {
            return (
              <div class="alert my-3 alert-warning" role="alert">
                {msg.message}
              </div>
            );
          }
        })}
    </div>
  );
}
