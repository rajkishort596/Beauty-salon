import { Navigate, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import Container from "../components/container/Container";
import AdminSidebar from "../sections/Admin/Dashboard/AdminSidebar";
import AdminHeader from "../components/Header/AdminHeader";
import AdminHeroImg from "../assets/images/Admin-Hero.png";
import Spinner from "../components/Spinner";
import images from "../constants/images";

import { fetchAdminProfile } from "../api/auth.Api";
import { setCredentials, logout } from "../features/auth/adminAuthSlice";
import { startLoading, stopLoading } from "../features/loading/loadingSlice";

const AdminLayout = () => {
  const dispatch = useDispatch();

  const admin = useSelector((state) => state.adminAuth.admin);
  const isAuthenticated = useSelector(
    (state) => state.adminAuth.isAuthenticated
  );
  const initialized = useSelector((state) => state.adminAuth.initialized);
  const loading = useSelector((state) => state.loading);

  useEffect(() => {
    const hydrateAdmin = async () => {
      dispatch(startLoading());
      try {
        const res = await fetchAdminProfile();
        dispatch(setCredentials({ admin: res.data.data, initialized: true }));
      } catch (err) {
        console.error("Admin hydration error:", err);
        dispatch(logout());
      } finally {
        dispatch(stopLoading());
      }
    };

    if (!initialized) {
      hydrateAdmin();
    }
  }, [dispatch, initialized]);

  if (!initialized || loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spinner />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <Container>
      <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] max-h-screen overflow-hidden">
        <AdminSidebar />
        <main className="relative p-4 bg-[#f3efea]">
          <AdminHeader
            isAuthenticated={isAuthenticated}
            user={admin}
            image={images.ProfileImg}
          />
          <div className="absolute bottom-0 right-0 z-0 w-1/2 h-2/3 flex items-end justify-center">
            <img src={AdminHeroImg} alt="Admin Illustration" />
          </div>

          {/* Render nested admin routes */}
          <Outlet />
        </main>
      </div>
    </Container>
  );
};

export default AdminLayout;
