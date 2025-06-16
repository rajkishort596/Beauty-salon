import { Route } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout";
import Admin from "../pages/Admin/Admin";
import AdminLogin from "../pages/Admin/AdminLogin";

const AdminRoutes = (
  <>
    <Route path="/admin/login" element={<AdminLogin />} />
    <Route path="/admin" element={<AdminLayout />}>
      <Route index element={<Admin />} />
      <Route path="appointments" element={<div>Appointments</div>} />
      <Route path="services" element={<div>Services</div>} />
      <Route path="reviews" element={<div>Reviews</div>} />
      <Route path="settings" element={<div>Settings</div>} />
      {/* Other admin routes */}
    </Route>
  </>
);

export default AdminRoutes;
