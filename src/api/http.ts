import { API_URL_BASE } from "../consts/index";
import axios from "axios";

export const $api = axios.create({
  withCredentials: true,
  baseURL: API_URL_BASE,
});