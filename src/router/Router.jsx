import { createBrowserRouter } from "react-router-dom";
import Layout from "../layout/Layout";
import Home from "../pages/Home";
import Register from "../pages/Register";
import Chatbot from "../pages/Chatbot";
import Booking from "../pages/Booking";

export const router = createBrowserRouter([{
  path: '/',
  element: <Layout />,
  children: [
      {
          index: true,
          element: <Home />
      },
      {
          path:'register',
          element: <Register />
      },
      {
          path:'chatbot',
          element: <Chatbot />
      },
      {
          path:'booking',
          element: <Booking />
      }
]
}])
