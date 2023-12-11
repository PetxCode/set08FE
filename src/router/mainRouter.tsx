import { createBrowserRouter } from "react-router-dom";
import AuthLayout from "../components/authBlock/AuthLayout";
import Register from "../page/auth/Register";
import Login from "../page/auth/Login";
import Verify from "../page/auth/Verify";
import Congrate from "../page/auth/Congrate";
import PrivateRouter from "./PrivateRouter";

import DirectaryRoute from "./directaryRoute";

export const mainRouter = createBrowserRouter([
  {
    path: "/account",
    element: <AuthLayout />,
    children: [
      {
        path: "register",
        index: true,
        element: <Register />,
      },
      {
        path: "login",
        index: true,
        element: <Login />,
      },
      {
        path: "verify",
        index: true,
        element: <Verify />,
      },
      {
        path: "account-created",
        index: true,
        element: (
          <Congrate title="Your account has been created please to to your email for verification of your account" />
        ),
      },
      {
        path: "account-verified",
        index: true,
        element: (
          <Congrate title="Your account has been verified... you can now continue" />
        ),
      },
    ],
  },
  {
    path: "/",
    element: (
      <PrivateRouter>
        <DirectaryRoute />
      </PrivateRouter>
    ),
  },
]);
