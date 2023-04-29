import { useContext, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { DataContext } from "../context/DataProvider";
import supabase from "../supabase";
import { toast } from "react-toastify";
import { FaSearch } from "react-icons/fa";

function Nav({ loc }) {
  const [show, handleShow] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        handleShow(true);
      } else handleShow(false);
    });
    return () => {
      window.removeEventListener("scroll", () => {
        if (window.scrollY > 100) {
          handleShow(true);
        } else {
          handleShow(false);
        }
      });
    };
  }, []);

  const { User, setUser } = useContext(DataContext);
  const [isOpen, setIsOpen] = useState(false);

  const handleMouseEnter = () => {
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    setTimeout(() => {
      setIsOpen(false);
    }, 1500);
  };

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) toast.error(error.message);
    else {
      toast.info("Successfully logged out!");
      setUser(null);
      localStorage.removeItem("user");
      navigate("/");
    }
  };

  return (
    <div className={`nav ${show && "nav-scroll"}`}>
      <Link to="/" className="logo">
        ShowStopper
      </Link>
      <div className="user">
        <Link to="/Categories" className="nav-item">
          Categories
        </Link>
        |
        {loc !== "/Search" && (
          <Link to="/Search" className="nav-item">
            Search
            <FaSearch className="search-icon" />
          </Link>
        )}
        |
        <div
          className="user-info"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <img
            src="http://occ-0-2484-3662.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABdYJV5wt63AcxNaDoqDXUhqZb55oN5Dxt1m-Zdn_z5rn_hIq9m8dA8JB2xdcPmrY3yXnlVWYKPXnOrbv2QN4aEVU28dESJg.png?r=1d4"
            alt=""
          />
        </div>
        {isOpen && (
          <div
            className="test"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <Link to="/Account" className="menu-item">
              Account
            </Link>
            <Link to="/Activity" className="menu-item">
              Activity
            </Link>
            <div className="menu-item" onClick={handleLogout}>
              Logout
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Nav;
