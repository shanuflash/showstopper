import { useState, useEffect, createContext, useContext } from "react";
import supabase from "../supabase";
import { Navigate } from "react-router-dom";

export const DataContext = createContext();
export function DataProvider({ children }) {
  const [User, setUser] = useState(null);
  const [Loading, setLoading] = useState(true);

  const [WatchList, setWatchList] = useState([]);
  const [History, setHistory] = useState([]);

  const handleSession = async () => {
    console.log("Session");
    const { data, error } = await supabase.auth.getSession();
    if (error) toast.error(error.message);
    setUser(data.session.user.id || null);
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
    setLoading(false);
  };

  useEffect(() => {
    handleSession();
  }, []);

  useEffect(() => {
    if (User) handleData();
    else {
      setLoading(false);
    }
  }, [User]);

  return (
    <DataContext.Provider
      value={{
        User,
        setUser,
        WatchList,
        setWatchList,
        History,
        setHistory,
        Loading,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}
export const RequireAuth = ({ children }) => {
  const { User, Loading } = useContext(DataContext);
  if (Loading) return <div>Loading...</div>;
  return User ? children : <Navigate to="/Login" />;
};
