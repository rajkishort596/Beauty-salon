import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Container from "../components/container/Container";
import AdminSidebar from "../sections/Admin/Dashboard/AdminSidebar";
import images from "../constants/images";
import AdminHeader from "../components/Header/AdminHeader";
import AdminHeroImg from "../assets/images/Admin-Hero.png";
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
        <main className="relative p-4 bg-[#f3efea]">
          <AdminHeader user={user} image={images.ProfileImg} />
          {/* Render nested routes */}
          <div className="absolute bottom-0 right-0 z-0 w-1/2 h-2/3 flex items-end justify-center">
            <img src={AdminHeroImg} alt="" />
          </div>
          <Outlet />
        </main>
      </div>
    </Container>
  );
};

export default AdminLayout;
