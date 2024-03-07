//@import url("https://cdn.syncfusion.com/ej2/material.css")
import { DateTimePickerComponent } from "@syncfusion/ej2-react-calendars";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const SeeCollection = () => {
  const [initialDate, setStartDate] = useState([]);
  const [endDate, setEndDate] = useState([]);
  const [amount, setAmount] = useState([]);

  const navigate = useNavigate();

  console.log(initialDate);
  console.log(endDate);
  const totalcollection = (props) => {
    axios
      .post("http://localhost:9095/parkingAdmin/getCollection", {
        initialDate,
        endDate,
      })
      .then((response) => {
        const result = response.data;

        if (result != null) {
          toast.success(
            "Total collection for given date is fetched successfully"
          );
          console.log(result.data);
          setAmount(result.data);
        }
      })
      .catch((error) => {
        console.log(error.response.data);
        console.log("error");
      });
    return (
      <div className="mb-2">
        <h1>props.value</h1>
      </div>
    );
  };

  return (
    <div className="container bg-light  vh-50 login">
      <div className="mb-3">
        <label htmlFor="" className="label-control">
          startDate
        </label>
        <input
          onChange={(e) => {
            setStartDate(e.target.value);
          }}
          type="datetime-local"
          className="form-control"
        />
      </div>

      <div className="mb-3">
        <label htmlFor="" className="label-control">
          EndDate
        </label>
        <input
          onChange={(e) => {
            setEndDate(e.target.value);
          }}
          type="datetime-local"
          className="form-control"
        />
      </div>
      <div style={{ paddingTop: "1rem" }}>
        <button
          id="genetate-slot"
          onClick={totalcollection}
          className="btn btn-primary"
        >
          Submit
        </button>
        <br></br>
        <br></br>
      </div>
      <div>
        <button
          style={styles.button}
          onClick={() => {
            navigate("/admin");
          }}
          className="btn btn-primary"
        >
          Back
        </button>
      </div>
      <br></br>
      <br></br>
      <br></br>
      <div>
        <h1 style={styles.h1}>
          <p>Total collection for given date Period is = Rs. {amount} </p>
        </h1>
      </div>
    </div>
  );
};
const styles = {
  h1: {
    textAlign: "center",
    margin: 20,
    color: "red",
  },
  button: {
    marginLeft: 10,
  },
};

export default SeeCollection;
