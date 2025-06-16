import { Route } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout";
import Admin from "../pages/Admin/Admin";

const AdminRoutes = (
  <Route path="/admin" element={<AdminLayout />}>
    <Route index element={<Admin />} />
    {/* <Route path="dashboard" element={<Dashboard />} /> */}
    {/* Add more admin routes here */}
  </Route>
);

export default AdminRoutes;
