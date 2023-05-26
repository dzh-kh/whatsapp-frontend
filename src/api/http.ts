import { API_URL_BASE } from "../consts/index";
import axios from "axios";

export const $api = axios.create({
  // withCredentials: true,
  baseURL: API_URL_BASE,
  headers: {
    "Access-Control-Allow-Credentials": true,
    "Content-Type": "application/json",
  },
});

$api.interceptors.response.use((response) => response, manageErrorConnection);

function manageErrorConnection(err: any) {
  if (
    err.response &&
    err.response.status >= 400 &&
    err.response.status <= 500
  ) {
    return Promise.reject({
      message: `${err.response.statusText} ${err.response.status}`,
    });
  } else if (err.code === "ECONNREFUSED") {
    return "nevermind";
  } else {
    console.log(err);
    return Promise.reject({ message: err.message });
  }
}
