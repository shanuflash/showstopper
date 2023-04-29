import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import App from "./App";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Search from "./components/Search";
import Account from "./components/Account";
import Activity from "./components/Activity";
import Genre from "./components/Genre";
import MovieInfo from "./components/MovieInfo";
import Categories from "./components/Categories";
import { DataProvider, RequireAuth } from "./context/DataProvider";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "aos/dist/aos.css";
import AOS from "aos";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <RequireAuth>
        <App />
      </RequireAuth>
    ),
  },
  {
    path: "/Login",
    element: <Login />,
  },
  {
    path: "/Signup",
    element: <Signup />,
  },
  {
    path: "/Search",
    element: (
      <RequireAuth>
        <Search />
      </RequireAuth>
    ),
  },
  {
    path: "/Account",
    element: (
      <RequireAuth>
        <Account />
      </RequireAuth>
    ),
  },
  {
    path: "/Activity",
    element: (
      <RequireAuth>
        <Activity />
      </RequireAuth>
    ),
  },
  {
    path: "/Categories",
    element: (
      <RequireAuth>
        <Categories />
      </RequireAuth>
    ),
  },
  {
    path: "/:movieid",
    element: (
      <RequireAuth>
        <MovieInfo />
      </RequireAuth>
    ),
  },
  {
    path: "/genre/:genreid",
    element: (
      <RequireAuth>
        <Genre />
      </RequireAuth>
    ),
  },
]);
AOS.init();

ReactDOM.createRoot(document.getElementById("root")).render(
  <DataProvider>
    <RouterProvider router={router} />
    <ToastContainer
      position="bottom-left"
      autoClose={2000}
      hideProgressBar={false}
      newestOnTop
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="colored"
    />
  </DataProvider>
);
