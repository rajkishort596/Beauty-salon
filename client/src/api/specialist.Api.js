import axios from "../utils/axious.js";

export const fetchSpecialists = async () => {
  const res = axios.get("/specialists");
  return res;
};
