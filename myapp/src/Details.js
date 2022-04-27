import { Menu } from "antd";
import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Dropdown, Button, Space } from "antd";
import { NavLink } from "react-router-dom";

const Details = () => {
  const [details, setdetails] = useState();
  const [directmailStatus, setdirectmailStatus] = useState(false);
  const [emailtext, setemailtext] = useState();
  const { id } = useParams();
  const [skipstatus, setskipstatus] = useState(false);
  const [message, setmessage] = useState(false);
  const [othersstatus, setothersstatus] = useState(false);
  const [othermessage, setothermessage] = useState();
  const directMailHandler = () => {
    if (directmailStatus === true) {
      setdirectmailStatus(false);
      setmessage(false);
      setothersstatus(false);
    } else {
      setdirectmailStatus(true);
      setmessage(false);
      setothersstatus(false);
    }
  };
  const otherStatusHandler = () => {
    if (othersstatus === true) {
      setothersstatus(false);
      setdirectmailStatus(false);
      setmessage(false);
    } else {
      setothersstatus(true);
      setdirectmailStatus(false);
      setmessage(false);
    }
  };
  const sendEmail = () => {
    axios.post("http://localhost:9000/sendmail", {
      name: details.name,
      email: details.email,
      enteredtext: emailtext,
    });

    setemailtext("");
    setmessage(true);
  };
  const skipstatusHandler = () => {
    if (skipstatus === true) {
      setskipstatus(false);
    } else {
      setskipstatus(true);
    }
  };
  useEffect(() => {
    axios.get(`http://localhost:9000/getlist/${id}`).then((res) => {
      setdetails(res.data);
    });
  }, [id]);
  const menu = (
    <Menu
      items={[
        {
          label: <p onClick={directMailHandler}>Direct Mail</p>,
        },
        {
          label: (
            <NavLink to="/">
              <p onClick={skipstatusHandler}> Skip</p>
            </NavLink>
          ),
        },
        {
          label: <p onClick={otherStatusHandler}>Other</p>,
        },
      ]}
    />
  );
  const sendOthersHandler = () => {
    console.log(othermessage);
    axios.post("http://localhost:9000/getentredtedt", {
      name: details.name,
      message: othermessage,
    });
    setothermessage("");
  };
  return (
    <div className="details_main">
      <Space direction="vertical">
        <Space wrap>
          <Dropdown overlay={menu} placement="bottom">
            <Button>Budget : {details?.budget}</Button>
          </Dropdown>
        </Space>
      </Space>
      {directmailStatus && (
        <div>
          <h2>Enter message you want to send via email</h2>
          <input
            onChange={(e) => setemailtext(e.target.value)}
            type={"text"}
            value={emailtext}
            placeholder="Please Enter message you want to send via email"
          ></input>
          <button onClick={sendEmail}>Send </button>
          <button onClick={directMailHandler}>Cancel</button>
        </div>
      )}
      {message && (
        <div>
          <h2>Email Send Successful</h2>
        </div>
      )}
      {othersstatus && (
        <div>
          <h2>Enter Your message</h2>
          <input
            onChange={(e) => setothermessage(e.target.value)}
            type={"text"}
            placeholder="Please Enter your message"
            value={othermessage}
          ></input>
          <button onClick={sendOthersHandler}>Send</button>
          <button onClick={otherStatusHandler}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default Details;
