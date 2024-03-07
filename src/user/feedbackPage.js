import axios from "axios";
import Cookies from "js-cookie";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const FeedbackPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const giveFeedBack = async () => {
    try {
      await axios
        .post(`http://localhost:9095/feedbacks/givefeedback`, {
          name,
          email,
          subject,
          feedbackText: message,
        })
        .then((response) => {
          console.log(response);
          toast.success("Your feedback is very valuable for us. THANK YOU!!");
          Cookies.remove("user");

          navigate("/");
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  };

  const clearFeedback = async () => {
    Cookies.remove("user");
    navigate("/");
  };

  return (
    <div className="login">
      <div className="mb-3">
        <input
          onChange={(event) => {
            setName(event.target.value);
          }}
          className="form-control"
          type="text"
          placeholder="name"
        />
      </div>

      <div className="mb-3">
        <input
          onChange={(event) => {
            setEmail(event.target.value);
          }}
          className="form-control"
          type="email"
          placeholder="email"
        />
      </div>

      <div className="mb-3">
        <input
          onChange={(event) => {
            setSubject(event.target.value);
          }}
          className="form-control"
          type="text"
          placeholder="subject"
        />
      </div>

      <div className="mb-3">
        <textarea
          rows="5"
          cols="60"
          name="description"
          placeholder="Your feedback goes here ..."
          onChange={(event) => {
            setMessage(event.target.value);
          }}
          className="form-control"
          type="text"
        />
      </div>
      <button onClick={giveFeedBack}> Submit</button>
      <button onClick={clearFeedback}>Cancel & Logout</button>
    </div>
  );
};

export default FeedbackPage;
