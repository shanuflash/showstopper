import React, { useState, useEffect, useMemo } from "react";
import Nav from "./Nav";
import supabase from "../supabase";
import { toast } from "react-toastify";

function Acount() {
  const [Email, setEmail] = useState(null);
  const [Name, setName] = useState(null);
  const [Phno, setPhno] = useState(null);
  const [UserData, setUserData] = useState({});
  const [NewPass, setNewPass] = useState(null);
  const [Loading, setLoading] = useState(true);

  var avatarUrl = useMemo(() => {
    return `https://ui-avatars.com/api/?name=${Name}&background=random&color=fff&rounded=true&size=150`;
  }, [Name]);

  const handleUserData = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    console.log(user);
    setUserData(user);
    setEmail(user.email);
    setName(user.user_metadata.name);
    setPhno(user.user_metadata.phone);
    setLoading(false);
  };

  const handlePassChange = async (e) => {
    e.preventDefault();
    const { error } = await supabase.auth.updateUser({
      password: NewPass,
    });
    setNewPass(null);
    if (error) toast.error(error.message);
    else toast.info("Password updated successfully");
  };

  const handleEmailChange = async (e) => {
    e.preventDefault();
    const { error } = await supabase.auth.updateUser({
      email: Email,
    });
    if (error) toast.error(error.message);
    else toast.info("Email updated successfully");
  };

  useEffect(() => {
    handleUserData();
  }, []);

  if (Loading) return <div>Loading...</div>;

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
