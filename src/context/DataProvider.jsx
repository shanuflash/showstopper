import { useState, useEffect, createContext, useContext } from "react";
import supabase from "../supabase";
import { Navigate } from "react-router-dom";

export const DataContext = createContext();
export function DataProvider({ children }) {
  const [User, setUser] = useState(() => {
    console.log("userup");
    const localData = JSON.parse(localStorage.getItem("user"));
    return localData ? localData : null;
  });

  const [WatchList, setWatchList] = useState([]);
  const [History, setHistory] = useState([]);

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
    if (User) handleData();
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
      }}
    >
      {children}
    </DataContext.Provider>
  );
}
export const RequireAuth = ({ children }) => {
  const { User } = useContext(DataContext);
  return User ? children : <Navigate to="/Login" />;
  // const user = JSON.parse(
  //   localStorage.getItem("sb-jvnstfpaokvohgpmuewa-auth-token")
  // );
  // return user ? children : <Navigate to="/Login" />;
};
