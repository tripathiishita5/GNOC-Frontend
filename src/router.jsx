import { createBrowserRouter } from "react-router";
import Root from "./Layouts/root";
import Protected from "./Layouts/Protected";
import Dashboard from "./Pages/Dashboard";
import NonProtected from "./Layouts/NonProtected";
import Login from "./Pages/Login";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Protected />,
        children: [
          {
            path: "/",
            element: <Dashboard />,
          },
        ],
      },
      {
        path: "/auth",
        element: <NonProtected />,
        children: [
          {
            path: "/auth/login",
            element: <Login />,
          },
        ],
      },
    ],
  },
]);
