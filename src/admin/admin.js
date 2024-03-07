import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { isLoggedInCheck } from "../user/isLoggedInCheck";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { getCookiesObject } from "../user/getCookieObject";

const Admin = () => {
  const navigate = useNavigate();
  const [cookie, setCookie] = useState(getCookiesObject());
  useEffect(() => {
    isLoggedInCheck(navigate);
  });

  const logout = () => {
    Cookies.remove("user");
    toast.success(cookie.firstName + " " + cookie.lastName + " Logged Out");
    navigate("/signin");
  };

  return (
    <div className="login">
      <h1>Get All User Details</h1>
      <button
        className="btn btn-primary"
        onClick={() => {
          navigate("/getUser");
        }}
      >
        GetUser
      </button>

      <h1>Get All staff Details</h1>
      <button
        className="btn btn-primary"
        onClick={() => {
          navigate("/getStaff");
        }}
      >
        Staff
      </button>

      <h1>Update Fare</h1>
      <button
        className="btn btn-primary"
        onClick={() => {
          navigate("/updateFare");
        }}
      >
        Update Fare
      </button>

      <h1>Add new Parking Area</h1>
      <button
        className="btn btn-primary"
        onClick={() => {
          navigate("/addnewParking");
        }}
      >
        ADD
      </button>

      <h2>View Feedbacks</h2>
      <button
        className="btn btn-primary"
        onClick={() => {
          navigate("/getfeedback");
        }}
      >
        view Feedback
      </button>

      <button onClick={logout}> Logout</button>
    </div>
  );
};

export default Admin;
