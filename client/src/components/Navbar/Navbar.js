import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser, reset, userLogout } from "../../features/userSlice";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import "./Navbar.scss";
import { clear } from "../../features/placeSlice";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector(getUser);

  const handleLogout = () => {
    dispatch(clear());
    dispatch(userLogout());
    dispatch(reset());
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg ">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <div className="d-flex">
            <img src={logo} alt="logo" height="50px" />
            <span>
              <p>Travel</p>
              <p>Companion</p>
            </span>
          </div>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse justify-content-evenly"
          id="navbarNav"
        >
          <div className="navbar-nav first justify-content-center">
            <Link to="/" className="nav-item nav-link text-uppercase mx-1">
              HOME
            </Link>
            <Link to="/place" className="nav-item nav-link text-uppercase mx-1">
              Places
            </Link>
            {user && (
              <Link
                to="/profile"
                className="nav-item nav-link text-uppercase mx-1"
              >
                PROFILE
              </Link>
            )}
          </div>
          <div className="navbar-nav">
            {!user ? (
              <>
                <Link
                  to="/login"
                  className="nav-item nav-link text-uppercase mx-1"
                >
                  LOGIN
                </Link>
                <Link
                  to="/register"
                  className="nav-item nav-link text-uppercase mx-1"
                >
                  REGISTER
                </Link>
              </>
            ) : (
              <Link
                to="/"
                className="nav-item nav-link text-uppercase mx-1"
                onClick={handleLogout}
              >
                LOGOUT
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
