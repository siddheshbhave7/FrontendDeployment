import { Link, useNavigate } from "react-router-dom";
import "../components/navbar.css";
// for getting the current state of signin status
import { useSelector, useDispatch } from "react-redux";
import imgLogo from "../Images/backgroundImg.jpg";
const Navbar = () => {
  // get the current status
  const signinStatus = useSelector((state) => state.authSlice.status);

  // get the dispatcher
  const dispatch = useDispatch();

  // used to navigate
  const navigate = useNavigate();

  return (
    <div className=" text-center bg-dark  flex-column ">
      <nav
        class="navbar navbar-expand-lg navbar-light bg-light"
        style={{ backgroundColor: "#9bb5b9" }}
      >
        <div class="container-fluid protest-riot-regular">
          <img src={imgLogo} className="logo" alt="Logo" />
          <Link class="navbar-brand nav-link:hover" to="/">
            Park Safe
          </Link>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div class="navbar-nav">
              <Link class="nav-link " aria-current="page" to="/">
                Home
              </Link>
              <Link class="nav-link" to="/signin">
                Login
              </Link>
              <Link class="nav-link" to="/signup">
                Signup
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
