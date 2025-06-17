import { Route } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout";
import AdminLogin from "../pages/Admin/AdminLogin";
import Dashboard from "../pages/Admin/Dashboard";

const AdminRoutes = (
  <>
    <Route path="/admin/login" element={<AdminLogin />} />
    <Route path="/admin" element={<AdminLayout />}>
      <Route index element={<Dashboard />} />
      <Route path="appointments" element={<div>Appointments</div>} />
      <Route path="services" element={<div>Services</div>} />
      <Route path="reviews" element={<div>Reviews</div>} />
      <Route path="settings" element={<div>Settings</div>} />
      {/* Other admin routes */}
    </Route>
  </>
);

export default AdminRoutes;
