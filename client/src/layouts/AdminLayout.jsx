import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Container from "../components/container/Container";
import AdminSidebar from "../sections/Admin/Dashboard/AdminSidebar";
import images from "../constants/images";
import AdminHeader from "../components/Header/AdminHeader";

const AdminLayout = () => {
  const user = useSelector((state) => state.auth.user);

  // console.log("Admin user:", user);

  if (!user || user.role !== "admin") {
    return <Navigate to="/admin/login" />;
  }

  return (
    <Container>
      <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] min-h-screen">
        <AdminSidebar />
        <main className="relative p-4 bg-gray-100">
          <AdminHeader user={user} image={images.ProfileImg} />
          {/* Render nested routes */}
          <Outlet />
        </main>
      </div>
    </Container>
  );
};

export default AdminLayout;
