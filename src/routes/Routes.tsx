import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";
//   import Root, { rootLoader } from "./routes/root";
//   import Team, { teamLoader } from "./routes/team";
import Login from "../pages/login/Login";
import Main from "../pages/main/Main";
import { Navigate } from "react-router-dom";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { useAuth } from "../hooks";

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
  {
    path: "*",
    element: <Navigate replace to="/" />,
  },
]);

export default router;

// export const Router = () => {
//   const isAuth = useAuth();
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route
//           path="/"
//           // element={isAuth ? <Main /> : <Navigate to="/login" replace />}
//           element={<Main />}
//         />{" "}
//         <Route
//           path="/login"
//           // element={isAuth ? <Navigate to="/" replace /> : <Login />}
//           element={<Login />}
//         />
//         <Route path="*" element={<Navigate replace to="/" />} />
//       </Routes>
//     </BrowserRouter>
//   );
// };
