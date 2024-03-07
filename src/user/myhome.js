import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { isLoggedInCheck } from "./isLoggedInCheck";



const Myhome = ()=>{
  const navigate = useNavigate();

    useEffect(() => {
        getfare();
        isLoggedInCheck(navigate);
      }, []);   
    
      const [fareCard, setfarecard] = useState([]);
    

      const getParking=()=>{
        try{
        axios.get(`http://localhost:9095/parkingAdmin/getAllParkingAreaList`)
        .then((response)=>{
          console.log(response.data)
          Cookies.set('parking' , JSON.stringify(response.data));
          navigate("/userhome");
        })
      }catch(err){
console.log(err);
      }
    }

    const getfare = () => {
        axios
          .get("http://localhost:9095/parkingAdmin/getFareDetails")
          .then((response) => {
            const result = response.data;
            console.log(result.data);
            const {twowheeler,fourwheeler}=response.data
    
            sessionStorage['twowheeler'] = twowheeler
            sessionStorage['fourwheeler'] = fourwheeler
    
            setfarecard(result.data);
          });
      };

      const handleLogout=()=>{
        Cookies.remove('user');
        toast.success("Logged Out");
        navigate("/signin");
      }
     
  return (
    <div className="login">
         <div >
          <table >
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
                    <td>Rs. {fares.fare}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      <h1 >Book your slot</h1>
      <button
        className="btn btn-primary"
        onClick={getParking}
      >
        Book Slot
      </button>

      <h1 >view my Bookings</h1>
      <button
        className="btn btn-primary"
        onClick={() => {
          navigate("/mybookings");
        }}
      >
        view
      </button>
      <br></br>
      <br></br>
      <br></br>
      <button onClick={handleLogout}>
      Logout
    </button>
    </div>
  );
};


export default Myhome