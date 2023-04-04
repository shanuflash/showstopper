import React, { useContext } from "react";
import { DataContext } from "../context/DataProvider";
import { Link } from "react-router-dom";

function Login() {
  const { Email, setEmail, Pass, setPass } = useContext(DataContext);
  return (
    <div className="Login">
      <form className="left" data-aos="fade-right">
        <div className="info">
          <span style={{ fontWeight: "800" }}>Login</span> or Sign up to
          continue...
        </div>
        <div className="input-master">
          <div className="input-container">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              className="input input-misc"
              type="email"
              value={Email}
              onChange={(e) => setEmail((prev) => e.target.value)}
              placeholder="Enter email"
            />
          </div>
          <div className="input-container">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              className="input input-misc"
              type="password"
              value={Pass}
              onChange={(e) => setPass((prev) => e.target.value)}
              placeholder="Enter password"
            />
          </div>
        </div>

        <div className="button-container">
          <button className="signup" type="submit">
            Login
          </button>
          <div className="action">
            Don't have an account?
            <Link className="action-button" to="/Signup">
              Signup
            </Link>
          </div>
        </div>
      </form>
      <div className="right" data-aos="zoom-in" data-aos-duration="600">
        <div className="container">
          <div className="logo">ShowStopper</div>
          <div className="container-text">
            Unlimited movies, TV shows and more. <br />
            Watch anywhere. Cancel anytime.
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
