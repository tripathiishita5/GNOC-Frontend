import { createBrowserRouter } from "react-router";
import Root from "./Layouts/root";
import Protected from "./Layouts/Protected";
import Dashboard from "./Pages/Dashboard";
import NonProtected from "./Layouts/NonProtected";
import Login from "./Pages/Login";
import Projects from "./Pages/Projects";
import Users from "./Pages/Users";

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
          {
            path: "/projects",
            element: <Projects />,
          },
          {
            path: "/users",
            element: <Users />,
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
