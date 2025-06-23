import axios from "../utils/axious.js";

export const createReview = async (id, data) => {
  const res = await axios.post(`/reviews/${id}`, data);
  return res.data.data;
};

export const getAllReviews = async () => {
  const res = await axios.get("/reviews");
  return res.data.data;
};

export const approveReview = async (id) => {
  const res = await axios.patch(`/admin/reviews/${id}/approve`);
  return res.data.data;
};

export const deleteReview = async (id) => {
  const res = await axios.delete(`/reviews/${id}`);
  return res.data.data;
};
