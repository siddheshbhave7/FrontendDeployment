import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { isLoggedInCheck } from "./isLoggedInCheck";
import Cookies from "js-cookie";
import { getCookiesObject, getParkingCookie } from "./getCookieObject";

const Userhome = () => {
  const navigate = useNavigate();
  const [vehicleType, setvehicleType] = useState("");
  const [vehicleNo, setvehicle_no] = useState("");
  const [entry, setEntry] = useState("");
  const [exit, setExit] = useState("");
  const [pid, setPid] = useState("");
  const [slot, setSlot] = useState(0);
  const [cookie, setCookie] = useState(getCookiesObject());
  const [parkingCookie, setParkingCookie] = useState(getParkingCookie());

  const [getvehicleNo, setVehicleNo] = useState("");
  const [isValidVehicleNo, setIsValidVehicleNo] = useState(true);

  const handleVehicleNoChange = (event) => {
    const inputValue = event.target.value;

    const vehicleNoRegex = /^[A-Z]{2}\d{2}[A-Z]{1,4}\d{4}$/;

    const isValid = vehicleNoRegex.test(inputValue);

    setIsValidVehicleNo(isValid);
    setVehicleNo(inputValue);
  };

  const booking = async () => {
    try {
      await axios
        .post(`http://localhost:9095/parkingUser/addBookingBySlot/${slot}`, {
          pid,
          userId: cookie.userId,
          slots: Number(slot),
          vehicleNo,
          vehicleType,
          startTime: entry,
          exitTime: exit,
        })
        .then((response) => {
          console.log(response);

          //if(response.data.message==="success")
          const result = response.data;

          console.log(response.data);
          console.log(result.data);
          toast.success("Slot boooked successfully");

          Cookies.set(
            "vehicle",
            JSON.stringify({
              slots: Number(slot),
              vehicleNo,
              vehicleType,
              startTime: entry,
              exitTime: exit,
              bookingid: result.data,
            }),
            { expires: 1 }
          );

          navigate("/invoice");
        });
    } catch (e) {
      console.log(e.response.data.message);
      if (e.response.data.status === 500) toast.error("Slot not available");
    }
  };

  useEffect(() => {
    isLoggedInCheck(navigate);
    console.log(getParkingCookie());
    console.log(parkingCookie);
    console.log(getCookiesObject());
  }, []);

  return (
    <div className="login">
      <DropdownButton id="dropdown-item-button" title="Choose Parking Area">
        {parkingCookie.data.map((park) => {
          return (
            <Dropdown.Item
              as="button"
              onClick={(event) => {
                setPid(park.parkingId);
              }}
            >
              {park.parkingName}{" "}
            </Dropdown.Item>
          );
        })}
      </DropdownButton>

      <br></br>

      <DropdownButton id="dropdown-item-button" title="Available Slot">
        {parkingCookie.data.map((park) => {
          return (
            <Dropdown.Item
              value={park.availableSlot}
              as="button"
              onClick={(event) => {
                setSlot(event.target.value);
              }}
            >
              {park.availableSlot}
            </Dropdown.Item>
          );
        })}
      </DropdownButton>

      <br></br>
      <DropdownButton id="dropdown-item-button" title="Select Vehicle Type">
        <Dropdown.Item
          as="button"
          onClick={(event) => {
            setvehicleType("Bike");
          }}
        >
          TWO-WHEELER
        </Dropdown.Item>
        <Dropdown.Item
          as="button"
          onClick={(event) => {
            setvehicleType("Car");
          }}
        >
          FOUR-WHEELER
        </Dropdown.Item>
      </DropdownButton>
      <br />
      <input value={vehicleType} />

      {/* <div>
        <div className="mb-3">
          <input
            onChange={(event) => {
              setvehicle_no(event.target.value);
            }}
            className="form-control"
            type="text"
            placeholder="Vehicle Number"
          />
        </div> */}

      <div className="mb-3">
        <input
          onChange={
            ((event) => {
              setvehicle_no(event.target.value);
            },
            handleVehicleNoChange)
          }
          className={`form-control ${isValidVehicleNo ? "" : "is-invalid"}`}
          type="text"
          placeholder="Vehicle Number"
          value={getvehicleNo}
        />
        {!isValidVehicleNo && (
          <div className="invalid-feedback">
            Please enter a valid vehicle number.
          </div>
        )}
      </div>

      <div className="mb-3">
        <label>Entry </label>
        <input
          onChange={(event) => {
            setEntry(event.target.value);
          }}
          type="datetime-local"
          className="form-control"
        />
      </div>

      <div className="mb-3">
        <label>Exit</label>
        <input
          onChange={(event) => {
            setExit(event.target.value);
          }}
          type="datetime-local"
          className="form-control"
        />
      </div>
      <button onClick={booking} className="btn btn-primary">
        Book slot
      </button>
      <button
        onClick={() => {
          navigate("/myhome");
        }}
        className="btn btn-primary"
      >
        Back
      </button>
    </div>
  );
};

export default Userhome;
