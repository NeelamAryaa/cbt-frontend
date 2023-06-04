import { useState } from "react";
import NavBar from "./navbar";
import "../App.css";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { base_api_url } from "../config";
// const base_api_url = "https://aryaa-cbt-backend.onrender.com";
import { notify } from "./toast";
import { Toaster } from "react-hot-toast";

const SignUpPage = (props) => {
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  // const [sqlerr, setSqlerr] = useState("");
  const [success, setSuccess] = useState("");
  const [errorMsg, setErrorMsg] = useState({ errMsg: "" });
  const [details, setDetails] = useState({
    username: null,
    email: null,
    password: null,
    confirm_password: null,
  });

  const onChangeHandle = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setDetails({ ...details, [name]: value });

    setErrorMsg({ errMsg: "" });
    // setSqlerr("");
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (details.confirm_password != details.password) {
      setErrorMsg({ errMsg: "Password does not match!!!" });
      return;
    }

    // console.log("Details============", details);

    axios
      .post(`${base_api_url}/auth/register`, { details })
      .then((response) => {
        setIsLoading(false);
        setSuccess(response.data.msg);

        setDetails({
          username: "",
          email: "",
          password: "",
          confirm_password: "",
        });

        // go to login page
        notify("Register Successfully !!!");
        // history.push("/auth/login");
      })
      .catch((err) => {
        if (!err.response) setErrorMsg({ errMsg: err.message });
        else {
          setErrorMsg({ errMsg: err.response.data.err.detail });
        }
        setIsLoading(false);
      });
  };

  return (
    <>
      <NavBar />
      <Toaster />
      <section class="vh-90 my-3">
        <div class="container-fluid h-custom">
          <div class="row d-flex justify-content-center align-items-center h-100">
            <div class="col-md-9 col-lg-6 col-xl-5">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                class="img-fluid"
                alt="image"
              />
            </div>
            <div class="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
              <form class="" onSubmit={onSubmitHandler}>
                <div class=" d-flex align-items-center justify-content-center my-4">
                  <p class="text-center fw-bold  fs-3 mb-0">Sign Up</p>
                </div>

                {errorMsg.errMsg ? (
                  <div class="alert alert-danger" role="alert">
                    {errorMsg.errMsg}
                  </div>
                ) : null}

                {success ? (
                  <div class="alert alert-success" role="alert">
                    {success}
                  </div>
                ) : null}

                <div class="form-outline mb-3">
                  <input
                    type="text"
                    name="username"
                    class="form-control form-control"
                    placeholder="Username"
                    onChange={onChangeHandle}
                    value={details.username}
                    required
                  />
                </div>

                <div class="form-outline mb-3">
                  <input
                    type="email"
                    name="email"
                    class="form-control form-control"
                    placeholder="Email address"
                    onChange={onChangeHandle}
                    value={details.email}
                    required
                  />
                </div>

                <div class="form-outline mb-3">
                  <input
                    type="password"
                    minlength="8"
                    name="password"
                    class="form-control form-control"
                    placeholder="Password"
                    value={details.password}
                    onChange={onChangeHandle}
                    required
                  />
                </div>

                <div class="form-outline mb-3">
                  <input
                    type="password"
                    minlength="8"
                    name="confirm_password"
                    class="form-control form-control"
                    placeholder="Confirm password"
                    value={details.confirm_password}
                    onChange={onChangeHandle}
                    required
                  />
                </div>

                <div class="text-center text-lg-start mt-4 pt-2">
                  <button type="submit" class="btn btn-primary btn">
                    {isLoading ? "Loading..." : "Sign Up"}
                  </button>
                  <p class="small fw-bold mt-2 pt-1 mb-0">
                    Do you have an account?{" "}
                    <div
                      style={{ cursor: "pointer" }}
                      class="d-inline link-danger"
                      onClick={() => history.push("/auth/login")}
                    >
                      Login
                    </div>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SignUpPage;
