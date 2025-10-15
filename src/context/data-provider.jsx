import { useState, useEffect, createContext } from "react";

export const DataContext = createContext();

const STORAGE_KEY = "showstopper:library:v1";

function loadInitial() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { watch_list: [], history: [] };
    const parsed = JSON.parse(raw);
    return {
      watch_list: Array.isArray(parsed.watch_list) ? parsed.watch_list : [],
      history: Array.isArray(parsed.history) ? parsed.history : [],
    };
  } catch {
    return { watch_list: [], history: [] };
  }
}

export function DataProvider({ children }) {
  const initial = loadInitial();
  const [WatchList, setWatchList] = useState(initial.watch_list);
  const [History, setHistory] = useState(initial.history);

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ watch_list: WatchList, history: History })
    );
  }, [WatchList, History]);

  return (
    <DataContext.Provider
      value={{ WatchList, setWatchList, History, setHistory }}
    >
      {children}
    </DataContext.Provider>
  );
}
