import { Route } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout";
import AdminLogin from "../pages/Admin/AdminLogin";
import Dashboard from "../pages/Admin/Dashboard";
import Appointment from "../pages/Admin/Appointment";
import Service from "../pages/Admin/Service";
import Specialist from "../pages/Admin/Specialist";
import Reviews from "../pages/Admin/Review";
import Setting from "../pages/Admin/Setting";

const AdminRoutes = (
  <>
    <Route path="/admin/login" element={<AdminLogin />} />
    <Route path="/admin" element={<AdminLayout />}>
      <Route index element={<Dashboard />} />
      <Route path="appointments" element={<Appointment />} />
      <Route path="services" element={<Service />} />
      <Route path="specialists" element={<Specialist />} />
      <Route path="reviews" element={<Reviews />} />
      <Route path="settings" element={<Setting />} />
      {/* Other admin routes */}
    </Route>
  </>
);

export default AdminRoutes;
