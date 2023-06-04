import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

const NavBar = () => {
  const history = useHistory();

  const [logout, setLogout] = useState(false);

  const profile = () => {
    history.push("/profile");
  };

  const onLogout = () => {
    localStorage.removeItem("login");
    setLogout(true);
    history.push("/");
  };

  return (
    <nav className="navbar navbar-dark " style={{ backgroundColor: "#29385c" }}>
      <div className="container-fluid d-flex mw-100">
        <Link to="/" className="text-white fs-3 text-decoration-none">
          Computer Based Test
        </Link>

        {!localStorage.getItem("login") || logout ? (
          <div className="navbar-brand d-flex text-white justify-content-end">
            <div className="mx-3">
              <Link to="/auth/login" className="text-white">
                {" "}
                Login
              </Link>
            </div>
            <div className="mx-1">
              <Link to="/auth/register" className="text-white">
                Sign Up
              </Link>
            </div>
          </div>
        ) : (
          <div className="d-flex">
            <div
              role="button"
              className="text-white text-capitalize"
              onClick={profile}
            >{`Hi ${
              JSON.parse(localStorage.getItem("login")).username
            } !`}</div>
            <div
              className="text-white mx-3"
              style={{ cursor: "pointer" }}
              onClick={onLogout}
            >
              <u>Logout</u>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
