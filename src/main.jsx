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
import DataProvider from "./context/DataProvider";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "aos/dist/aos.css";
import AOS from "aos";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
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
    element: <Search />,
  },
  {
    path: "/Account",
    element: <Account />,
  },
  {
    path: "/Activity",
    element: <Activity />,
  },
  {
    path: "/Categories",
    element: <Categories />,
  },
  {
    path: "/:movieid",
    element: <MovieInfo />,
  },
  {
    path: "/genre/:genreid",
    element: <Genre />,
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
