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
  const [SessionCheck, setSessionCheck] = useState(false);

  
  const handleSession = async () => {
    console.log("Session");
    const { data, error } = await supabase.auth.getSession();
    if (data) {
      try {
        setUser(data.session.user.id);
        setSessionCheck(true);
      } catch (error) {
        setSessionCheck(true);
      }
    }
  };

  const handleData = async () => {
    console.log("Data");
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
    if (User) handleData();
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
        SessionCheck,
        setSessionCheck,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export default DataProvider;
