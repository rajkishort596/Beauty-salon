import axios from "../utils/axious.js";

export const getContactInfo = async () => {
  const res = await axios.get("/contact-info");
  return res.data.data;
};
