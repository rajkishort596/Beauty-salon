import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Container from "../components/container/Container";
import AdminSidebar from "../sections/Admin/Dashboard/AdminSidebar";

const AdminLayout = () => {
  // const { user } = useSelector((state) => state.auth.user);

  // if (!user || user.role !== "admin") {
  //   return <Navigate to="/" />;
  // }

  return (
    <Container>
      <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] min-h-screen">
        <AdminSidebar />
        <main className="p-4 bg-gray-100">
          <Outlet />
        </main>
      </div>
    </Container>
  );
};

export default AdminLayout;
