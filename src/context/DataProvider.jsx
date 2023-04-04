import { useState, useEffect, createContext } from "react";
import supabase from "../supabase";

export const DataContext = createContext();
function DataProvider({ children }) {
  const [Email, setEmail] = useState(null);
  const [User, setUser] = useState(null);
  const [Name, setName] = useState(null);
  const [Phno, setPhno] = useState(null);
  const [Data, setData] = useState([]);
  const [SearchItem, setSearchItem] = useState(null);
  const [Result, setResult] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const handleMouseEnter = () => {
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    setIsOpen(false);
  };

  const handleSession = async (e) => {
    const { data, error } = await supabase.auth.getSession();
    if (error) toast.error(error.message);
    else {
      setUser(data.session.user.id);
      setEmail(data.session.user.email);
    }
  };

  useEffect(() => {
    handleSession();
  }, []);

  return (
    <DataContext.Provider
      value={{
        Email,
        setEmail,
        User,
        setUser,
        Name,
        setName,
        Phno,
        setPhno,
        Data,
        setData,
        Result,
        setResult,
        SearchItem,
        setSearchItem,
        isOpen,
        setIsOpen,
        handleMouseEnter,
        handleMouseLeave,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export default DataProvider;
