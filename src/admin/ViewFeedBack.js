import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ViewFeedBack = () => {
  const navigate = useNavigate();
  const [feedback, setFeedback] = useState([]);

  const getFeedback = async () => {
    try {
      await axios
        .get("http://localhost:9095/feedbacks/getfeedback")
        .then((response) => {
          console.log(response.data);
          setFeedback(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="login">
      <button onClick={getFeedback}>View</button>
      <button
        onClick={() => {
          navigate("/admin");
        }}
      >
        Back
      </button>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Subject</th>
            <th>Email</th>
            <th>Feedback</th>
          </tr>
        </thead>

        <tbody>
          {feedback.map((feed) => {
            return (
              <tr>
                <td>{feed.name}</td>
                <td>{feed.subject}</td>
                <td>{feed.email}</td>
                <td>{feed.feedbackText}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
export default ViewFeedBack;
