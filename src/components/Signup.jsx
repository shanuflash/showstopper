import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { DataContext } from "../context/DataProvider";

function Signup() {
  const {
    User,
    setUser,
    Email,
    setEmail,
    Pass,
    setPass,
    Name,
    setName,
    Phno,
    setPhno,
  } = useContext(DataContext);
  return (
    <div className="Login reg">
      <form className="left" data-aos="fade-left">
        <div className="info">
          Login or <span style={{ fontWeight: "800" }}>Sign up</span> to
          continue...
        </div>
        <div className="input-container">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            className="input input-misc"
            type="text"
            value={Name}
            onChange={(e) => setName((prev) => e.target.value)}
            placeholder="Enter name"
          />
        </div>
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
          <label htmlFor="phno">Phone Number</label>
          <input
            id="phno"
            className="input input-misc"
            type="number"
            value={Phno}
            onChange={(e) => setPhno((prev) => e.target.value)}
            placeholder="Enter phone number"
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
        <div className="button-container">
          <button className="signup" type="submit">
            Signup
          </button>
          <div className="action">
            Already have an account?
            <Link className="action-button" to="/Login">
              Login
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

export default Signup;
