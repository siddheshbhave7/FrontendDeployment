//import Signin from './pages/user/signin'
import Signup from "./user/signup";
import Home from "./user/home";
import Signin from "./user/signin";
import Admin from "./admin/admin";

// this toastr container will be used to show the toast messages
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//import the required components from react-router-dom
// these are needed to configure client side routing
// Route: represents a route for a component
// Routes: collection of routes
// BrowserRouter: container for routes collection
// Link: used to jump to another component using its path
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import GetAllUsers from "./admin/getUser";
import GetAllStaff from "./admin/getStaff";
import SeeCollection from "./admin/getCollection";
import UpdateFare from "./admin/updateFare";
import AddParking from "./admin/addnewParking";
import Userhome from "./user/userhome";
import { CustomDropdown } from "./user/bookSlot";
import Myhome from "./user/myhome";
import Mybookings from "./user/mybookings";
import Receipt from "./user/Receipt";
import ViewFeedBack from "./admin/ViewFeedBack";
import FeedbackPage from "./user/feedbackPage";
import LandingPage from "./user/Landing";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/invoice" element={<Receipt />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/getuser" element={<GetAllUsers />} />
        <Route path="/getstaff" element={<GetAllStaff />} />
        <Route path="/getcollection" element={<SeeCollection />} />
        <Route path="/updateFare" element={<UpdateFare />} />
        <Route path="/addnewParking" element={<AddParking />} />
        <Route path="/userhome" element={<Userhome />} />
        <Route path="/bookslot" element={<CustomDropdown />} />
        <Route path="/myhome" element={<Myhome />} />
        <Route path="/mybookings" element={<Mybookings />} />
        <Route path="/givefeedback" element={<FeedbackPage />} />
        <Route path="/getfeedback" element={<ViewFeedBack />} />
        <Route path="/" element={<LandingPage />} />
      </Routes>

      {/* this container is used to show toast messages */}
      <ToastContainer position="top-left" autoClose={3000} />
    </BrowserRouter>
  );
}

export default App;
