import axios from "../utils/axious.js";

export const fetchServices = async () => {
  const res = axios.get("/services");
  return res;
};
