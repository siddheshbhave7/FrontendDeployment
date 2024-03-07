import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { isLoggedInCheck } from "../user/isLoggedInCheck";

const GetAllUsers = () => {
  const [allUsers, setAllUser] = useState([]);

  const navigate = useNavigate();

  // console.log("it is state")
  useEffect(() => {
    getUser();
    isLoggedInCheck(navigate);
  }, []);
  const getUser = async () => {
    await axios
      .get("http://localhost:9095/parkingAdmin/getUserByRole/USER")
      .then((response) => {
        const result = response.data;
        //console.log("result")
        console.log(result.data);
        // console.log(typeof(result))
        //if (result['status'] == 'success') {
        setAllUser(result.data);
        if (result != null) {
          console.log(result.data);
          toast.success("success");
          setAllUser(result.data);
        } else {
          console.log(result.data);
          toast.error(result["error"]);
        }
      });
  };

  return (
    <div className="login">
      <h1>User List</h1>
      <div>
        <table className="table table-striped " style={styles.head}>
          <thead>
            <tr style={styles.head}>
              <th>UserID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Identity Card</th>
              <th>Email Id</th>
              <th>Mobile No</th>
              <th>Role</th>
              <th>cancel</th>
            </tr>
          </thead>
          <tbody>
            {allUsers.map((allUser) => {
              return (
                <tr>
                  <td>{allUser.userId}</td>
                  <td>{allUser.firstName}</td>
                  <td>{allUser.lastName}</td>
                  <td>{allUser.identityCard}</td>
                  <td>{allUser.email}</td>
                  <td>{allUser.mobileNo}</td>
                  <td>{allUser.userRole}</td>
                  <td>{}</td>
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
  );
};

const styles = {
  head: {
    color: "white",
  },
};

export default GetAllUsers;
