import { createBrowserRouter, RouterProvider } from "react-router-dom";

//   import Root, { rootLoader } from "./routes/root";
//   import Team, { teamLoader } from "./routes/team";

import Login from "../pages/login/Login";
import Main from "../pages/main/Main";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
    //   loader: rootLoader,
  },
  {
    path: "/",
    element: <Main />,
    //   loader: rootLoader,
  },
]);

export default router;
