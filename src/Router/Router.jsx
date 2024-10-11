import {
    createBrowserRouter,
  } from "react-router-dom";
import Main from "../Layouts/Main/Main";
import Home from "../Pages/Home/Home";
import Tours from "../Pages/Tours/Tours";
import Blogs from "../Pages/Blogs/Blogs";
import Contacts from "../Pages/Contacts/Contacts";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import TourDetailsPage from "../Shared/TourCards/TourDetailsPage/TourDetailsPage";
import ErrorPage from "../Shared/ErrorPage/ErrorPage";


export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main/>,
      errorElement: <ErrorPage/>,
      children: [
        {
            path: "/",
            element: <Home/>,
        },
        {
          path: "/tours",
          element: <Tours/>,
        },
        {
          path: "/details/:id",
          element: <TourDetailsPage/>,
        },
        {
          path: "/blogs",
          element: <Blogs/>,
        },
        {
          path: "/contacts",
          element: <Contacts/>,
        },
        {
          path: "/login",
          element: <Login/>,
        },
        {
          path: "/registed",
          element: <Register/>,
        }
      ]
    },
  ]);