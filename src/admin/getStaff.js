import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

const GetAllStaff = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [password, setPassword] = useState("");
  const [userRole, setUserRole] = useState("STAFF");
  const [identity, setIdentityCard] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [allStaff, setAllStaff] = useState([]);
  const navigate = useNavigate();

  // console.log("it is state")

  const getStaff = () => {
    axios
      .get("http://localhost:9095/parkingAdmin/getUserByRole/STAFF")
      .then((response) => {
        const result = response.data;
        //console.log("result")

        setAllStaff(result.data);
        // console.log(typeof(result))
        //if (result['status'] == 'success') {
        if (result != null) {
          // console.log(result);
          toast.success("Add Staff");
        } else {
          toast.error(result["error"]);
        }
      });
  };

  const addStaff = async () => {
    // check if user has really entered any value
    if (firstName.length === 0) {
      toast.error("please enter first name");
    } else if (lastName.length === 0) {
      toast.error("please enter last name");
    } else if (email.length === 0) {
      toast.error("please enter email");
    } else if (mobileNo.length === 0 || mobileNo.length >= 11) {
      toast.error("please enter phone number");
    } else if (password.length === 0) {
      toast.error("please enter password");
    } else if (identity.length === 0 || identity.length >= 12) {
      toast.error("Please Check Identity ");
    } else {
      // make the API call to check if user exists
      await axios
        .post("http://localhost:9095/parkingUser/signUp", {
          firstName,
          lastName,
          email,
          identityCard: identity,
          password,
          mobileNo,
          userRole,
        })
        .then((response) => {
          // get the data returned by server
          const result = response.data;
          setRefresh(!refresh);
          // check if user's authentication is successfull
          if (result["status"] === "error") {
            toast.error("invalid email or password");
          } else {
            toast.success("successfully registered a new user");
          }
        })
        .catch((error) => {
          console.log("error");
          console.log(error);
        });
    }
  };

  useEffect(() => {
    getStaff();
  }, [refresh]);

  return (
    <div>
      <div className="login col-6">
        <div>
          <div className="mb-3">
            <input
              onChange={(event) => {
                setFirstName(event.target.value);
              }}
              className="form-control"
              type="text"
              placeholder="First Name"
            />
          </div>

          <div className="mb-3">
            <input
              onChange={(event) => {
                setLastName(event.target.value);
              }}
              className="form-control"
              type="text"
              placeholder="last Name"
            />
          </div>

          <div className="mb-3">
            <input
              onChange={(event) => {
                setMobileNo(event.target.value);
              }}
              className="form-control"
              type="tel"
              placeholder="Mobile Number"
            />
          </div>
          <div className="mb-3">
            <input
              onChange={(event) => {
                setIdentityCard(event.target.value);
              }}
              className="form-control"
              type="identityCard"
              placeholder="Identity Card"
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
                setPassword(event.target.value);
              }}
              className="form-control"
              type="password"
              placeholder="password"
            />
          </div>

          <div className="mb-3">
            <button onClick={addStaff}>Add Staff</button>
          </div>
        </div>
      </div>
      <div className=" login col-6" style={styles.head}>
        <h1>Staff List</h1>
        <div>
          <table className="table table-striped" style={styles.head}>
            <thead>
              <tr>
                <th>UserID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email Id</th>
                <th>Mobile No</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              {allStaff.map((allUser) => {
                return (
                  <tr style={styles.head}>
                    <td>{allUser.userId}</td>
                    <td>{allUser.firstName}</td>
                    <td>{allUser.lasttName}</td>
                    <td>{allUser.email}</td>
                    <td>{allUser.mobileNo}</td>
                    <td>{allUser.userRole}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div>
          <button
            onClick={() => {
              navigate("/admin");
            }}
            className="btn btn-primary"
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  head: {
    color: "white",
  },
};

export default GetAllStaff;
