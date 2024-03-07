import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
//import config from '../../config'
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "../user/main.css";
// use the dispatch to update the redux store about the signin state
import { useDispatch } from "react-redux";
import { signin } from "../slices/authSlice";
import Cookies from "js-cookie";

const Signin = () => {
  // get user inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // get the dispatcher
  const dispatch = useDispatch();

  // get the navigate function reference
  const navigate = useNavigate();

  const signinUser = async () => {
    if (email.length === 0) {
      toast.error("please enter email");
    } else if (password.length === 0) {
      toast.error("please enter password");
    } else {
      await axios
        .post("http://localhost:9095/parkingUser/signIn", {
          email,
          password,
        })
        .then((response) => {
          // get the data returned by server
          //console.log(response.data)
          const result = response.data;
          //console.log(result.data)
          const { userId, firstName, lastName, role, email } = result["data"];

          // persist the logged in user's information for future use
          sessionStorage["userId"] = userId;
          sessionStorage["firstName"] = firstName;
          sessionStorage["lastName"] = lastName;
          sessionStorage["role"] = role;
          sessionStorage["email"] = email;

          Cookies.set("user", JSON.stringify(result.data), { expires: 1 });

          // check if user's authentication is successfull
          if (result["status"] === "error") {
            toast.error("invalid email or password");
          } else {
            // get the logged in user's info
            // const user= { userId, firstName, lastName , email,mobile, userRole} = result['data']

            // persist the logged in user's information for future use
            const user = result.data;
            // send the action
            // dispatch(signin(user))
            toast.success("Welcome " + (firstName + " " + lastName));
            if (user.userRole === "user") navigate("/myhome");
            if (user.userRole === "admin") navigate("/admin");
            if (user.userRole === "staff") navigate("/bookings");
          }
        })
        .catch((error) => {
          //if user not found then itwill through this error
          console.log(error.response.data.message);
          toast.error("Please check username and password");
        });
    }
  };

  return (
    <div>
      <div className="login">
        <div className="mb-3">
          <label>Email</label>
          <input
            onChange={(event) => {
              setEmail(event.target.value);
            }}
            className="form-control"
            type="email"
          />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input
            onChange={(event) => {
              setPassword(event.target.value);
            }}
            className="form-control"
            type="password"
          />
        </div>
        <div className="mb-3">
          <div>
            Dont have an account? <Link to="/signup">Signup here</Link>
          </div>
          <button onClick={signinUser}>Signin</button>
        </div>
      </div>
    </div>
  );
};

export default Signin;
