import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { isLoggedInCheck } from "../user/isLoggedInCheck";

const UpdateFare = () => {
  const navigate = useNavigate();
  const [fare, setfare] = useState([]);
  const [fareCard, setfarecard] = useState([]);
  const [refresh, setRefresh] = useState(false);
  //console.log(fareCard);

  const twoWheeler = async () => {
    await axios
      .patch(`http://localhost:9095/parkingAdmin/updateTwowheelerFare/` + fare)
      .then((response) => {
        const result = response.data;
        //console.log(response.data);
        setRefresh(!refresh);
        if (result != null) {
          toast.success(result.data);
        } else {
          toast.error(result.data);
        }
      });
  };

  const fourWheeler = async () => {
    await axios
      .patch("http://localhost:9095/parkingAdmin/updateFourwheelerFare/" + fare)
      .then((response) => {
        const result = response.data;
        setRefresh(!refresh);
        // console.log(result);
        if (result != null) {
          toast.success(result.data);
        } else {
          toast.error(result.data);
        }
      });
  };

  const getfare = () => {
    axios
      .get("http://localhost:9095/parkingAdmin/getFareDetails")
      .then((response) => {
        const result = response.data;
        // console.log(result.data);
        const { twowheeler, fourwheeler } = response.data;

        sessionStorage["twowheeler"] = twowheeler;
        sessionStorage["fourwheeler"] = fourwheeler;

        setfarecard(result.data);
      });
  };
  useEffect(() => {
    getfare();
    isLoggedInCheck(navigate);
  }, [refresh]);

  return (
    <div>
      <div className="login">
        <table>
          <thead>
            <tr>
              <th>Vehicle Type</th>
              <th>Fare</th>
            </tr>
          </thead>
          <tbody>
            {fareCard.map((fares) => {
              return (
                <tr>
                  <td>{fares.vehicleType}</td>
                  <td>Rs.{fares.fare}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="login">
        <br></br>
        <div className="mb-3">
          <label>Update Two Wheeler Fare</label>
          <input
            onChange={(event) => {
              setfare(event.target.value);
            }}
            className="form-control"
            type="text"
          />
        </div>
        <div className="mb-3">
          <button onClick={twoWheeler}>Update</button>
        </div>
        <div className="mb-1">
          <label>Update Four Wheeler Fare</label>
          <input
            onChange={(event) => {
              setfare(event.target.value);
            }}
            className="form-control"
            type="text"
          />
        </div>
        <div className="mb-3">
          <button onClick={fourWheeler}>Update</button>
        </div>
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

export default UpdateFare;
