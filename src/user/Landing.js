import { Link } from "react-router-dom";
import "../user/Landing.css";
const LandingPage = () => {
  return (
    <div className="container-fluid p-0 text-center bg-dark text-light min-vh-100 d-flex flex-column justify-content-center">
      <h1 className="display-3 mb-4 ">
        <b>Book your parking space, Now!</b>
      </h1>
      <div className="col-md-6 mx-auto">
        <Link type="button" className="btn btn-primary btn-lg" to="/signin">
          Get Started
        </Link>
      </div>
    </div>
  );
};
export default LandingPage;
