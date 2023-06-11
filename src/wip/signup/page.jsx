"use client";
import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { DataContext } from "../context/DataProvider";
import supabase from "../supabase";
import { toast } from "react-toastify";

function Signup() {
  const { User, setUser } = useContext(DataContext);
  const [Email, setEmail] = useState(null);
  const [Name, setName] = useState(null);
  const [Phno, setPhno] = useState(null);
  const [Password, setPassword] = useState(null);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase.auth.signUp({
      email: Email,
      password: Password,
      options: {
        data: {
          name: Name,
          phone: Phno,
        },
      },
    });
    if (error) toast.error(error.message, { position: "bottom-right" });
    else {
      const { error } = await supabase
        .from("netflix")
        .insert({ userid: data.user.id, history: [], watch_list: [] });
      console.error(error);
      localStorage.setItem("user", JSON.stringify(data.user.id));
      setUser(data.user.id);
      setPassword(null);
      toast.info("Successfully signed up!", { position: "bottom-right" });
    }
  };

  useEffect(() => {
    if (User) navigate("/");
  }, [User]);

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
            value={Password}
            onChange={(e) => setPassword((prev) => e.target.value)}
            placeholder="Enter password"
          />
        </div>
        <div className="button-container">
          <button onClick={handleSignup} className="signup" type="submit">
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
