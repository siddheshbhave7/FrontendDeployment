import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { isLoggedInCheck } from "../user/isLoggedInCheck";

const AddParking = () => {
  const navigate = useNavigate();
  const [parkings, setParkings] = useState([]);

  const [refresh, setRefresh] = useState(false);

  const [city, setCity] = useState([]);

  const [location, setLocation] = useState([]);

  const [slots, setSlots] = useState([]);

  const [parkingName, setParkingName] = useState([]);

  const [parkingId, setParkingId] = useState([]);

  const [vehicleType, setVehicleType] = useState([]);

  useEffect(() => {
    getParkinglist();
    isLoggedInCheck(navigate);
  }, []);

  const add = () => {
    axios
      .post("http://localhost:9095/parkingAdmin/addNewParkingArea", {
        city,
        location,
        slots,
        parkingName,
        vehicletype: vehicleType,
      })
      .then((response) => {
        const result = response.data;
        if (result != null) {
          toast.success("Parking added successfully");
        }
      });
  };

  const getParkinglist = async () => {
    await axios
      .get("http://localhost:9095/parkingAdmin/getAllParkingAreaList")
      .then((response) => {
        const result = response.data;
        //console.log(result.data);
        setParkings(result.data);
        setParkingId(result.data.parkingId);
        setRefresh(!refresh);
      });
  };

  useEffect(() => {
    getParkinglist();
  }, [refresh]);

  return (
    <div>
      <table>
        <tr>
          <td>
            <div>
              <div className="login">
                <h1>Parking List</h1>
                <table>
                  <thead>
                    <tr>
                      <th> parking Id</th>
                      <th>city</th>
                      <th> location</th>
                      <th>slots</th>
                      <th>parkingName</th>
                      <th>vehicleType</th>
                    </tr>
                  </thead>
                  <tbody>
                    {parkings.map((park) => {
                      return (
                        <tr>
                          <td>{park.parkingId}</td>
                          <td>{park.city}</td>
                          <td>{park.location}</td>
                          <td>{park.slots}</td>
                          <td>{park.parkingName}</td>
                          <td>{park.vehicletype}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </td>
          <td></td>
          <td>
            <div className="login">
              <h1>Add New Parking Area</h1>
              <div>
                <div className="mb-3">
                  <label>City</label>
                  <input
                    onChange={(event) => {
                      setCity(event.target.value);
                    }}
                    className="form-control"
                    type="text"
                  />
                </div>

                <div className="mb-3">
                  <label>Location</label>
                  <input
                    onChange={(event) => {
                      setLocation(event.target.value);
                    }}
                    className="form-control"
                    type="text"
                  />
                </div>

                <div className="mb-3">
                  <label>Slots</label>
                  <input
                    onChange={(event) => {
                      setSlots(event.target.value);
                    }}
                    className="form-control"
                    type="text"
                  />
                </div>

                <div className="mb-3">
                  <label>Parking Name</label>
                  <input
                    onChange={(event) => {
                      setParkingName(event.target.value);
                    }}
                    className="form-control"
                    type="text"
                  />
                </div>

                <div className="mb-3">
                  <label>Vehicle Type</label>
                  <input
                    onChange={(event) => {
                      setVehicleType(event.target.value);
                    }}
                    className="form-control"
                    type="text"
                  />
                </div>

                <div className="mb-3">
                  <button onClick={add}>Add Parking</button>
                </div>
              </div>
            </div>
          </td>
        </tr>
      </table>
    </div>
  );
};
const styles = {
  container: {
    color: "black",
    backgroundColor: "grey",
    width: 400,
    height: 480,
    padding: 20,
    position: "relative",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    margin: "auto",
    borderColor: "black",
    borderRadius: 10,
    broderWidth: 1,
    borderStyle: "solid",
    boxShadow: "1px 1px 20px 5px #C9C9C9",
  },
  table: {
    color: "black",
    backgroundColor: "grey",
    borderColor: "black",
    borderRadius: 10,
    broderWidth: 1,
    borderStyle: "solid",
    textAlign: "center",
    border: 5,
    marginLeft: 570,
  },
  signinButton: {
    position: "relative",
    width: "100%",
    height: 40,
    backgroundColor: "green",
    color: "white",
    borderRadius: 5,
    border: "none",
    marginTop: 10,
  },
};

export default AddParking;
