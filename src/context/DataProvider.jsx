import React, { useState, useEffect, createContext } from "react";

export const DataContext = createContext();
function DataProvider({ children }) {
  const [Email, setEmail] = useState(null);
  const [Pass, setPass] = useState(null);

  const [User, setUser] = useState(null);

  const [Name, setName] = useState(null);
  const [Phno, setPhno] = useState(null);
  const [Data, setData] = useState([]);
  return (
    <DataContext.Provider
      value={{
        Email,
        setEmail,
        Pass,
        setPass,
        User,
        setUser,
        Name,
        setName,
        Phno,
        setPhno,
        Data,
        setData,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export default DataProvider;
