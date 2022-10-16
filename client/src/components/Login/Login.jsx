import React, { useEffect, useState } from "react";
// import AuthContext from "../context/AuthContext";
import API from "../utils/UserAPI";
// import AuthForm from "../AuthForm/AuthForm";
import { Link, useHistory } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const history = useHistory();
  const [state, setState] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    const id = sessionStorage.getItem("currentUsers");
    if (id) {
      history.push("/");
    }
  }, [history]);

  const handleInputChange = (event) => {
    // Getting the value and name of the input which triggered the change
    let value = event.target.value;
    const name = event.target.name;
    // Updating the input's state
    setState({ ...state, [name]: value });
  };

  const handleSubmit = (event) => {
    // Preventing the default behavior of the form submit (which is to refresh the page)
    event.preventDefault();
    API.login({
      email: state.email,
      password: state.password,
    })
      .then((response) => {
        sessionStorage.setItem(
          "currentUsers",
          response.data.foundUser
        );
        // sessionStorage.setItem("userToken", response.data.data.token);
        history.push("/NewChild");
      })
      .catch((err) => {
        throw err;
      });
    setState({
      email: "",
      password: "",
    });
  };

  return (
    <div className="container login-form">
      <div className="row form-margin">
      </div>
      <div className="jumbotron">
        <div className="row">
          <div className="col text-center">
            <h2 className="welcome-back">Hello Woody!</h2>
            <h3>Check In Now </h3>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-3"></div>
          <div className="col-sm-6 login-signup">
            <div className="form-group">
              <input
                value={state.email}
                name="email"
                onChange={handleInputChange}
                type="email"
                className="form-control sign-in-input"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Email"
              />
            </div>
            <div className="form-group">
              <input
                value={state.password}
                name="password"
                onChange={handleInputChange}
                type="password"
                className="form-control sign-in-input"
                id="exampleInputPassword1"
                aria-describedby="passwordHelp"
                placeholder="Password"
              />
            </div>
            <div className="row d-flex" id="sign-in-btns">
              <div className="col-sm-3 text-center">
                {/* <Link
                  type="submit"
                  className="btn btn-light button  sign-in-btn"
                  to="/NewChild"
                >
                  LOGIN
              </Link> */}
                <button
                  type="submit"
                  className="btn btn-light button text-center sign-in-btn"
                  onClick={handleSubmit}
                >
                  LOGIN
                </button>
              </div>
              <div className="col-sm-3"></div>
              <div className="col-sm-2 text-center">
                <Link
                  type="submit"
                  className="btn btn-light button   text-center sign-in-btn"
                  to="/signup"
                >
                  SIGN UP
                </Link>
              </div>
            </div>
          </div>
          <div className="col-sm-12">
            <hr className="my-4" />
            
            <hr />
          
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
