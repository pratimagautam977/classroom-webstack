import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import Helmet from "react-helmet";
import { useParams } from "react-router-dom";
import {v4 as uuidv4} from 'uuid'
import ReactEmoji from 'react-emoji'
 
let socket;

export default function StaffChat() {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const ENDPOINT = "http://localhost:3000/";
  // const ENDPOINT = 'https://reactjs-socketio-chat-app.herokuapp.com/'

  useEffect(() => {
    socket = io(ENDPOINT);

    const name = uuidv4();
    const room = id
    setName(name);
    setRoom(room);

    socket.emit("join", { name, room }, () => {});

    return () => {
      socket.emit("disconnect");

      socket.off();
    };
  }, [ENDPOINT]);

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages([...messages, message]);
    });
  }, [messages]);

  

  // function for sending messages
  const sendMessage = (event) => {
    event.preventDefault();

    if (message) {
      socket.emit("sendMessage", message, () => setMessage(""));
    }
  };

  console.log(message, messages);
  return (
    <>
      <Helmet>
        <style>{`
        /*---------chat window---------------*/
        .container{
            max-width:4920px;
        }
        .inbox_people {
            background: #fff;
            float: left;
            overflow: hidden;
            width: 30%;
            max-width: 300px;
            border-right: 1px solid #ddd;
        }
        
        .inbox_msg {
            clear: both;
            overflow: hidden;
            height: 90vh
        }
        
        .top_spac {
            margin: 20px 0 0;
        }
        
        .recent_heading {
            float: left;
            width: 40%;
        }
        
        .srch_bar {
            display: inline-block;
            text-align: right;
            width: 60%;
            padding:
        }
        
        .headind_srch {
            padding: 10px 29px 10px 20px;
            overflow: hidden;
            border-radius: 50px
            border: 1px solid #c4c4c4;
        }
        
        .recent_heading h4 {
            color: #0465ac;
            font-size: 16px;
            margin: auto;
            line-height: 29px;
        }
        
        .srch_bar input {
            outline: none;
            border: 1px solid #cdcdcd;
            border-width: 0 0 1px 0;
            width: 80%;
            padding: 2px 0 4px 6px;
            background: none;
        }
        
        .srch_bar .input-group-addon button {
            background: rgba(0, 0, 0, 0) none repeat scroll 0 0;
            border: medium none;
            padding: 0;
            color: #707070;
            font-size: 18px;
        }
        
        .srch_bar .input-group-addon {
            margin: 0 0 0 -27px;
        }
        
        .chat_ib h5 {
            font-size: 15px;
            color: #464646;
            margin: 0 0 8px 0;
        }
        
        .chat_ib h5 span {
            font-size: 13px;
            float: right;
        }
        
        .chat_ib p {
            font-size: 12px;
            color: #989898;
            margin: auto;
            display: inline-block;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        
        .chat_img {
            float: left;
            width: 11%;
        }
        
        .chat_img img {
            width: 100%
        }
        
        .chat_ib {
            float: left;
            padding: 0 0 0 15px;
            width: 88%;
        }
        
        .chat_people {
            overflow: hidden;
            clear: both;
        }
        
        .chat_list {
            border-bottom: 1px solid #ddd;
            margin: 0;
            padding: 18px 16px 10px;
        }
        
        .inbox_chat {
            height: 90vh;
            overflow-y: auto;
        }
        
        .active_chat {
            background: #e8f6ff;
        }
        
        .incoming_msg_img {
            display: inline-block;
            width: 30px;
        }
        
        .incoming_msg_img img {
            width: 100%;
        }
        
        .received_msg {
            display: inline-block;
            padding: 0 0 0 10px;
            vertical-align: top;
            width: 92%;
        }
        
        .received_withd_msg p {
            background: #ebebeb none repeat scroll 0 0;
            border-radius: 0 15px 15px 15px;
            color: #646464;
            font-size: 14px;
            margin: 0;
            padding: 5px 10px 5px 12px;
            width: 100%;
        }
        
        .time_date {
            color: #747474;
            display: block;
            font-size: 12px;
            margin: 8px 0 0;
        }
        
        .received_withd_msg {
            width: 57%;
        }
        
        .mesgs{
            float: left;
            padding: 30px 15px 0 25px;
            
            
        }
        
        .sent_msg p {
            background:#0465ac;
            border-radius: 12px 15px 15px 0;
            font-size: 14px;
            margin: 0;
            color: #fff;
            padding: 5px 10px 5px 12px;
            width: 100%;
        }
        
        .outgoing_msg {
            overflow: hidden;
            margin: 26px 0 26px;
        }
        
        .sent_msg {
            float: right;
            width: 46%;
        }
        
        .input_msg_write input {
            background: rgba(0, 0, 0, 0) none repeat scroll 0 0;
            border: medium none;
            color: #4c4c4c;
            font-size: 15px;
            min-height: 48px;
            width: 100%;
            outline:none;
        }
        
        .type_msg {
            border-top: 1px solid #c4c4c4;
            position: relative;
        }
        
        .msg_send_btn {
            background: #05728f none repeat scroll 0 0;
            border:none;
            border-radius: 50%;
            color: #fff;
            cursor: pointer;
            font-size: 15px;
            height: 33px;
            position: absolute;
            right: 0;
            top: 11px;
            width: 33px;
        }
        
        .messaging {
            padding: 0 0 50px 0;
            height: 93vh;
        }
        
        .msg_history {
            height: 82vh;
            overflow-y: auto;
        }
        .col{
        }
        `}</style>
      </Helmet>
      <div className="messaging">
        <div className="inbox_msg row">
          <div className="inbox_people">
            <div className="headind_srch">
              <div className="recent_heading">
                <h4>Recent</h4>
              </div>
              <div className="srch_bar">
                <div className="stylish-input-group">
                  <input
                    type="text"
                    className="search-bar"
                    placeholder="Search"
                  />
                </div>
              </div>
            </div>
            <div className="inbox_chat col scroll">
              <div className="chat_list active_chat">
                <div className="chat_people">
                  <div className="chat_img">
                    {" "}
                    <img
                      src="https://ptetutorials.com/images/user-profile.png"
                      alt="sunil"
                    />{" "}
                  </div>
                  <div className="chat_ib">
                    <h5>
                      Sunil Rajput <span className="chat_date">Dec 25</span>
                    </h5>
                    <p>
                      Test, which is a new approach to have all solutions
                      astrology under one roof.
                    </p>
                  </div>
                </div>
              </div>
              
              {/* <div className="chat_list">
                <div className="chat_people">
                  <div className="chat_img">
                    {" "}
                    <img
                      src="https://ptetutorials.com/images/user-profile.png"
                      alt="sunil"
                    />{" "}
                  </div>
                  <div className="chat_ib">
                    <h5>
                      Sunil Rajput <span className="chat_date">Dec 25</span>
                    </h5>
                    <p>
                      Test, which is a new approach to have all solutions
                      astrology under one roof.
                    </p>
                  </div>
                </div>
              </div>
              <div className="chat_list">
                <div className="chat_people">
                  <div className="chat_img">
                    {" "}
                    <img
                      src="https://ptetutorials.com/images/user-profile.png"
                      alt="sunil"
                    />{" "}
                  </div>
                  <div className="chat_ib">
                    <h5>
                      Sunil Rajput <span className="chat_date">Dec 25</span>
                    </h5>
                    <p>
                      Test, which is a new approach to have all solutions
                      astrology under one roof.
                    </p>
                  </div>
                </div>
              </div>
              <div className="chat_list">
                <div className="chat_people">
                  <div className="chat_img">
                    {" "}
                    <img
                      src="https://ptetutorials.com/images/user-profile.png"
                      alt="sunil"
                    />{" "}
                  </div>
                  <div className="chat_ib">
                    <h5>
                      Sunil Rajput <span className="chat_date">Dec 25</span>
                    </h5>
                    <p>
                      Test, which is a new approach to have all solutions
                      astrology under one roof.
                    </p>
                  </div>
                </div>
              </div>
              <div className="chat_list">
                <div className="chat_people">
                  <div className="chat_img">
                    {" "}
                    <img
                      src="https://ptetutorials.com/images/user-profile.png"
                      alt="sunil"
                    />{" "}
                  </div>
                  <div className="chat_ib">
                    <h5>
                      Sunil Rajput <span className="chat_date">Dec 25</span>
                    </h5>
                    <p>
                      Test, which is a new approach to have all solutiokk ns
                      astrology under one roof.
                    </p>
                  </div>
                </div>
              </div>
              <div className="chat_list">
                <div className="chat_people">
                  <div className="chat_img">
                    {" "}
                    <img
                      src="https://ptetutorials.com/images/user-profile.png"
                      alt="sunil"
                    />{" "}
                  </div>
                  <div className="chat_ib">
                    <h5>
                      Sunil Rajput <span className="chat_date">Dec 25</span>
                    </h5>
                    <p>
                      Test, which is a new approach to have all solutions
                      astrology under one roof.
                    </p>
                  </div>
                </div>
              </div>
              <div className="chat_list">
                <div className="chat_people">
                  <div className="chat_img">
                    {" "}
                    <img
                      src="https://ptetutorials.com/images/user-profile.png"
                      alt="sunil"
                    />{" "}
                  </div>
                  <div className="chat_ib">
                    <h5>
                      Sunil Rajput <span className="chat_date">Dec 25</span>
                    </h5>
                    <p>
                      Test, which is a new approach to have all solutions
                      astrology under one roof.
                    </p>
                  </div>
                </div>
              </div> */}
           
            </div>
          </div>
          <div className="mesgs col">
            <div className="msg_history">
              {messages.map((msg, i) => (
                msg.user === name ?
                <div className="outgoing_msg">
                <div className="sent_msg" key={i}>
                  <p>{ReactEmoji.emojify(msg.text)}</p>
                  <span className="time_date"> 11:01 AM | June 9</span>{" "}
                </div>
              </div>:
               <div className="incoming_msg" key={i}>
               <div className="incoming_msg_img">
                 {" "}
                 <img
                   src="https://ptetutorials.com/images/user-profile.png"
                   alt="user"
                 />{" "}
               </div>
               
               <div className="received_msg">
                 <div className="received_withd_msg">
                   <p>{ReactEmoji.emojify(msg.text)}</p>
                   <span className="time_date"> 11:01 AM | June 9</span>
                 </div>
               </div>
             </div>
              ))}

              
              {/* 
              <div className="incoming_msg">
                <div className="incoming_msg_img">
                  {" "}
                  <img
                    src="https://ptetutorials.com/images/user-profile.png"
                    alt="sunil"
                  />{" "}
                </div>
                
                <div className="received_msg">
                  <div className="received_withd_msg">
                    <p>Test which is a new approach to have all solutions</p>
                    <span className="time_date"> 11:01 AM | June 9</span>
                  </div>
                </div>
              </div>
              <div className="outgoing_msg">
                <div className="sent_msg">
                  <p>Test which is a new approach to have all solutions</p>
                  <span className="time_date"> 11:01 AM | June 9</span>{" "}
                </div>
              </div>
              <div className="incoming_msg">
                <div className="incoming_msg_img">
                  {" "}
                  <img
                    src="https://ptetutorials.com/images/user-profile.png"
                    alt="sunil"
                  />{" "}
                </div>
                
                <div className="received_msg">
                  <div className="received_withd_msg">
                    <p>Test, which is a new approach to have</p>
                    <span className="time_date"> 11:01 AM | Yesterday</span>
                  </div>
                </div>
              </div>
              <div className="outgoing_msg">
                <div className="sent_msg">
                  <p>Apollo University, Delhi, India Test</p>
                  <span className="time_date"> 11:01 AM | Today</span>{" "}
                </div>
              </div>
              <div className="incoming_msg">
                <div className="incoming_msg_img">
                  {" "}
                  <img
                    src="https://ptetutorials.com/images/user-profile.png"
                    alt="sunil"
                  />{" "}
                </div>
                <div className="received_msg">
                  <div className="received_withd_msg">
                    <p>
                      We work directly with our designers and suppliers, and
                      sell direct to you, which means quality, exclusive
                      products, at a price anyone can afford.
                    </p>
                    <span className="time_date"> 11:01 AM | Today</span>
                  </div>
                </div>
              </div>
             */}

            </div>
            <div className="type_msg">
              <div className="input_msg_write">
                <form className="form">
                  <input
                    type="text"
                    className="write_msg"
                    placeholder="Type a message"
                    value={message}
                    onChange={({ target: { value } }) => setMessage(value)}
                    onKeyPress={(event) =>
                      event.key === "Enter" ? sendMessage(event) : null
                    }
                  />
                  <button
                    className="msg_send_btn"
                    onClick={(e) => sendMessage(e)}
                    type="button"
                  >
                    <i className="fa fa-paper-plane" aria-hidden="true"></i>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
