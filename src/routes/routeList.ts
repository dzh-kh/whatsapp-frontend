import { FC } from "react";
import Main from "../pages/main/Main";
import Login from "../pages/login/Login";

interface IRoute {
  path: string;
  element: FC;
  isAuthRequired: boolean;
}
export const routeList: IRoute[] = [
  { path: "/", element: Main, isAuthRequired: true },
  { path: "/", element: Login, isAuthRequired: false },
];
