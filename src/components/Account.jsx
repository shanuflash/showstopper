import React, { useState, useEffect, useContext } from "react";
import Nav from "./Nav";
import supabase from "../supabase";
import { DataContext } from "../context/DataProvider";

function Acount() {
  const { User, Email, setEmail, Phno, setPhno, Name, setName, Session } =
    useContext(DataContext);
  const [UserData, setUserData] = useState({});
  const [NewPass, setNewPass] = useState(null);

  const avatarUrl = `https://ui-avatars.com/api/?name=${Name}&background=random&color=fff&rounded=true&size=150`;

  const handleUserData = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    console.log(user);
    setUserData(user);
    setEmail(user.email);
    setName(user.user_metadata.name);
    setPhno(user.user_metadata.phone);
  };

  const handlePassChange = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase.auth.updateUser({
      password: NewPass,
    });
    if (error) console.log(error);
    else console.log(data, "Password updated successfully");
  };

  useEffect(() => {
    if (Session) {
      if (User === null) navigate("/Login");
    }
  }, [User]);

  useEffect(() => {
    handleUserData();
  }, []);

  return (
    <div>
      <Nav />
      <div className="user-data">
        <div className="user-data-item">
          <div className="user-data-left">Personal Info</div>
          <div className="user-data-right">
            <div className="user-img-container">
              <img className="user-img" src={avatarUrl} alt="" />
              Profile Picture
            </div>
            <div className="user-info-item">
              <div className="user-info-item-title">Name:</div>
              {Name}
            </div>
            <div className="user-info-item">
              <div className="user-info-item-title">Email:</div>
              {Email}
            </div>
            <div className="user-info-item">
              <div className="user-info-item-title">Phone:</div>
              {Phno}
            </div>
          </div>
        </div>
        <div className="user-data-item">
          <div className="user-data-left">Membership & Billing</div>
          <div className="user-data-right">
            <div className="user-info-item">
              <div className="user-info-item-title">Plan:</div>
              Premium HD (Yearly)
            </div>
            <div className="user-info-item">
              <div className="user-info-item-title">Billing Email:</div>
              {Email} (PayPal)
            </div>
            <div className="user-info-item">
              <div className="user-info-item-title">Next Billing:</div>
              April 18, 2023.
            </div>
          </div>
        </div>
        <div className="user-data-item">
          <div className="user-data-left">Security & Password</div>
          <div className="user-data-right">
            <div className="user-info-item">
              <div className="user-info-item-title">User ID:</div>
              {UserData.id}
            </div>
            <div className="user-info-item">
              <div className="user-info-item-title">Last signin:</div>
              {Date(UserData.last_sign_in_at)}
            </div>
            <div className="user-info-item">
              <div className="user-info-item-title">Change Password:</div>
              <form className="password-reset" onSubmit={handlePassChange}>
                <input
                  type="password"
                  placeholder="New Password"
                  onChange={(e) => setNewPass(e.target.value)}
                />
                <button type="submit">Change Password</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Acount;
