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
import Dashboard from "../Layouts/Main/Dashboard/Dashboard";
import Profile from "../Dashboard/Profile/Profile";
import ProtectedRoutes from "./ProtectedRoutes/ProtectedRoutes";
import Wishlist from "../Dashboard/Wishlist/Wishlist";
import BookedTours from "../Dashboard/BookedTours/BookedTours";
import UserReviews from "../Dashboard/UserReviews/UserReviews";
import UserBlogs from "../Dashboard/UserBlogs/UserBlogs";
import BlogDetails from "../Pages/Blogs/BLogDetails";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/tours",
        element: <Tours />,
      },
      {
        path: "/details/:id",
        element: <TourDetailsPage />,
      },
      {
        path: "/blogs",
        element: <Blogs />,
      },
      {
        path: "/blogDetails/:id",
        element: <BlogDetails/>,
      },
      {
        path: "/contacts",
        element: <Contacts />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/registed",
        element: <Register />,
      }
    ]
  },

  {
    path: "dashboard",
    element: <ProtectedRoutes><Dashboard /></ProtectedRoutes>,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "profile",
        element: <Profile/>,
      },
      {
        path: "wishlist",
        element: <Wishlist/>,
      },
      {
        path: "bookedTours",
        element: <BookedTours/>,
      },
      {
        path: "user_reviews",
        element: <UserReviews/>,
      },
      {
        path: "user_blogs",
        element: <UserBlogs/>,
      }
    ]
  }
]);