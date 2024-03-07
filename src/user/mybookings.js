import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { getCookiesObject } from "./getCookieObject";
import { isLoggedInCheck } from "./isLoggedInCheck";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

const Mybookings = () => {
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();
  const [cookie, setCookie] = useState(getCookiesObject());
  const [refresh, setRefresh] = useState(false);

  const cancelBooking = async (id) => {
    try {
      await axios
        .post(`http://localhost:9095/parkingUser/cancelBooking/${id}`)
        .then((response) => {
          setRefresh(!refresh);
          toast.success("Booking cancelled");
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  };
  const book = async () => {
    try {
      await axios
        .get(`http://localhost:9095/parkingUser/getBooking/${cookie.userId}`)
        .then((response) => {
          const result = response.data;
          Cookies.set("booking", JSON.stringify(result.data), { expires: 1 });
          setBookings(result.data);
        });
    } catch (err) {
      console.log(err.data);
    }
  };

  useEffect(() => {
    isLoggedInCheck(navigate);
  }, []);

  useEffect(() => {
    book();
  }, [refresh]);

  return (
    <div className="login">
      <h1> Booking Details</h1>
      <br></br>
      <br></br>
      <table>
        <thead>
          <tr>
            <td> bookingId </td>
            <td>exitTime</td>
            <td>pid</td>
            <td>slots</td>
            <td>startTime</td>
            <td>userId </td>
            <td>Cancel</td>
            <td>Status</td>
          </tr>
        </thead>

        <tbody>
          {bookings.map((book) => {
            return (
              <tr>
                <td> {book.bookingId} </td>
                <td>{book.startTime}</td>
                <td>{book.exitTime}</td>
                <td>{book.pid}</td>
                <td>{book.slots}</td>
                <td>{book.userId} </td>
                <td>
                  <button
                    onClick={async () => {
                      await cancelBooking(book.bookingId);
                    }}
                  >
                    {book.bookingId}
                  </button>
                </td>
                <td>{book.bookingStatus}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <br></br>

      <br></br>
      <div>
        <button
          className="btn btn-primary"
          onClick={() => {
            navigate("/myhome");
          }}
        >
          Back
        </button>
      </div>
      <br></br>
      <br></br>
    </div>
  );
};
const styles = {
  table: {
    width: 800,
    backgroundColor: "cyan",
    borderColor: "black",
    borderRadius: 10,
    broderWidth: 1,
    borderStyle: "solid",
    textAlign: "center",
    border: 5,
    marginLeft: 400,
  },
};
export default Mybookings;
