import { createBrowserRouter } from "react-router";
import Root from "./Layouts/root";
import Protected from "./Layouts/Protected";
import Dashboard from "./Pages/Dashboard";
import NonProtected from "./Layouts/NonProtected";
import Login from "./Pages/Login";
//import Projects from "./Pages/Projects";
import Users from "./Pages/Users";
import Docs from "./Pages/Docs";
import Organogram from "./Pages/Organogram";
import AlertHandling from "./Pages/AlertHandling";
import MonitoringHealth from "./Pages/MonitoringHealth";

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
            path: "/organogram",
            element: <Organogram />,
          },
          {
            path: "/alertHandling",
            element: <AlertHandling />,
          },
          {
            path: "/users",
            element: <Users />,
          },
          {
            path: "/docs",
            element: <Docs />,
          },
          {
            path: "/monitoringHealth",
            element: <MonitoringHealth />,
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
