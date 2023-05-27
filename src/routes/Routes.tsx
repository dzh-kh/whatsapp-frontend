import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/login/Login";
import Main from "../pages/main/Main";
import { Navigate } from "react-router-dom";
import { LOGIN_PAGE_ROUTE, MAIN_PAGE_ROUTE } from "../consts";
const router = createBrowserRouter([
  {
    path: LOGIN_PAGE_ROUTE,
    element: <Login />,
  },
  {
    path: MAIN_PAGE_ROUTE,
    element: <Main />,
  },
  {
    path: "*",
    element: <Navigate replace to={MAIN_PAGE_ROUTE} />,
  },
]);

export default router;
