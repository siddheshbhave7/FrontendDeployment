import React, { useEffect, useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import Cookies from "js-cookie";
import {
  getBookingCookie,
  getCookiesObject,
  getVehicleCookie,
} from "./getCookieObject";
import { useNavigate } from "react-router-dom";
import { isLoggedInCheck } from "./isLoggedInCheck";
import axios from "axios";
import { toast } from "react-toastify";
import "../user/mybooking.css";

const Receipt = () => {
  const navigate = useNavigate();
  const [getBookingId, setBookingId] = useState(0);
  const [getVehicleTypeId, setVehicleTypeId] = useState(0);
  const [cookie, setCookie] = useState(getCookiesObject());
  const [vcookie, setVcookie] = useState(getVehicleCookie());
  const [actualParking, setParking] = useState("");
  const [amount, setAmount] = useState(0);
  const [timestamp, setTimestamp] = useState(new Date());
  const [duration, setDuration] = useState(0);
  const [vehicleType, setvehicleType] = useState("");
  const [parkingName, setParkingName] = useState("");
  const [entryTime, setEntryTime] = useState("");
  const [exitTime, setExitTime] = useState("");
  const [login, setLogin] = useState(false);

  useEffect(() => {
    isLoggedInCheck(navigate);
    setVehicleTypeId(vcookie.vehicleTypeId);
  }, []);

  const intervalId = setInterval(() => {
    setTimestamp(new Date());
  }, 1000);

  const getData = async () => {
    try {
      await axios
        .get(
          `http://localhost:9095/ParkingPayment/booking/${vcookie.bookingid}`
        )
        .then((response) => {
          console.log(response.data);
          setParking(response.data.parking);
          setAmount(response.data.amount);
          setBookingId(response.data.bookingId);
          setVehicleTypeId(response.data.vehicleId);
          setDuration(response.data.parikingDuration);
          setvehicleType(response.data.vehicleType);
          setParkingName(response.data.parkingName);
          setEntryTime(response.data.startTime);
          setExitTime(response.data.exitTime);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const payMoney = async () => {
    await axios
      .post(
        `http://localhost:9095/ParkingPayment/getPayment/${cookie.userId}`,
        {
          bookingid: getBookingId,
          vehicletypeId: getVehicleTypeId,
        }
      )
      .then((response) => {
        console.log(response.data);
        toast.success("Payment successfully done");
        setLogin(true);
      })
      .catch((error) => {
        console.log(error.data);
        toast.success("Payment successfully done");
      });
  };

  const downloadPDF = () => {
    const input = document.getElementById("invoice");
    html2canvas(input, {
      scale: 5, // Increase scale for higher quality
      logging: false, // Disable logging (optional)
      useCORS: true, // Enable CORS for rendering external images
      width: 1400 /* specify width */, // Specify the desired width of the canvas
      height: 1400,
    }).then((canvas) => {
      const imgData = canvas.toDataURL("image/jpeg", 0.5); // Use JPEG format for better quality
      const pdf = new jsPDF("l", "mm", "A6");
      pdf.addImage(imgData, "JPEG", 5, 5, 300, 275); // Adjust width and height as needed
      pdf.save("invoice.pdf");
      navigate("/givefeedback");
    });
  };

  const handleLogOut = () => {
    Cookies.remove("user");
    navigate("/signin");
  };
  return (
    <div className="container mt-5  backgroundImg">
      <div className="row justify-content-center">
        <div className="col-md-6 login">
          <div
            className="invoice-header text-center "
            style={{ color: "#000000" }}
          >
            <h1>Park Safe</h1>
          </div>

          <div id="invoice">
            <table className="table">
              <thead style={{ color: "#000000" }}>
                <h2>Parking Invoice</h2>
                <tr>
                  <td colSpan={9} style={{ border: "1px solid #000" }}>
                    <h6>Date {timestamp.toLocaleString()}</h6>
                  </td>
                </tr>
                <td colSpan={9} style={{ border: "1px solid #000" }}>
                  <tr>Entry Time </tr>
                  <tr>{entryTime}</tr>
                  <tr>Exit Time</tr>
                  <tr>{exitTime}</tr>
                  <tr>Vehicle Type Id: {getVehicleTypeId} </tr>
                </td>
                <tr>
                  <td colSpan="9" style={{ border: "1px solid #000" }}>
                    <h3> Vehicle No : {vcookie.vehicleNo}</h3>
                    <h6>Slot Number : {vcookie.slots}</h6>
                    <h6>Vehicle : {vehicleType} </h6>
                    <h6>Parking :{parkingName} </h6>
                  </td>
                </tr>
                <tr>
                  <td className="col-6" style={{ border: "1px solid #000" }}>
                    <h2>Amount : {amount}</h2>
                  </td>
                </tr>
              </thead>
              <tbody></tbody>
            </table>

            <h1 style={{ color: "#000000" }}>Thank You ! Visit Again </h1>
          </div>
          <button
            className="btn btn-primary"
            onClick={payMoney}
            disabled={login}
          >
            {" "}
            Pay
          </button>

          <div>
            <button onClick={getData}> Generate Invoice</button>
          </div>
          <div className="text-center">
            <button className="btn btn-primary" onClick={downloadPDF}>
              Download Invoice
            </button>
          </div>
          <div className="text-center">
            <button className="btn btn-primary" onClick={handleLogOut}>
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Receipt;
