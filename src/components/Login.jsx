import React, { useState, useContext } from "react";
import { DataContext } from "../context/DataProvider";
import { Link } from "react-router-dom";
import supabase from "../supabase";
import { toast } from "react-toastify";

function Login() {
  const { Email, setEmail, User, setUser } = useContext(DataContext);
  const [Password, setPassword] = useState(null);

  const handleSignin = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase.auth.signInWithPassword({
      email: Email,
      password: Password,
    });
    if (error) toast.error(error.message);
    else toast.info("Successfully logged in!");
    setUser(data.user.id);
    setPassword(null);
  };

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
              value={Password}
              onChange={(e) => setPassword((prev) => e.target.value)}
              placeholder="Enter password"
            />
          </div>
        </div>

        <div className="button-container">
          <button onClick={handleSignin} className="signup" type="submit">
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
