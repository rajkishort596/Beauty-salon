import axios from "../utils/axious.js";

export const fetchAllDiscounts = async () => {
  const res = await axios.get("/discounts");
  return res;
};
export const createDiscount = async (data) => {
  const res = await axios.post("/admin/discounts/", data);
  return res.data.data;
};
// Delete a discount by ID
export const deleteDiscount = async (id) => {
  const res = await axios.delete(`/admin/discounts/${id}`);
  return res.data.data;
};

// Update a discount by ID
export const updateDiscount = async (id, data) => {
  const res = await axios.patch(`/admin/discounts/${id}`, data);
  return res.data.data;
};
