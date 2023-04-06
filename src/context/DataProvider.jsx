import { useState, useEffect, createContext } from "react";
import supabase from "../supabase";

export const DataContext = createContext();
function DataProvider({ children }) {
  const [Email, setEmail] = useState(null);
  const [User, setUser] = useState(null);
  const [Name, setName] = useState(null);
  const [Phno, setPhno] = useState(null);
  const [Data, setData] = useState([]);
  const [WatchList, setWatchList] = useState([]);
  const [History, setHistory] = useState([]);
  const [SearchItem, setSearchItem] = useState(null);
  const [Result, setResult] = useState([]);
  const [Toggle, setToggle] = useState("m");

  const handleSession = async (e) => {
    const { data, error } = await supabase.auth.getSession();
    if (error) toast.error(error.message);
    else {
      setUser(data.session.user.id);
      setEmail(data.session.user.email);
    }
  };

  const handleData = async (e) => {
    const { data, error } = await supabase
      .from("netflix")
      .select("watch_list,history")
      .eq("userid", User);
    if (error) console.log(error);
    else {
      setWatchList(data[0].watch_list);
      setHistory(data[0].history);
    }
  };

  useEffect(() => {
    handleSession();
  }, []);

  useEffect(() => {
    handleData();
  }, [User]);

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
        SearchItem,
        setSearchItem,
        Result,
        setResult,
        Toggle,
        setToggle,
        WatchList,
        setWatchList,
        History,
        setHistory,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export default DataProvider;
