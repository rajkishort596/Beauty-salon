import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";
import Container from "../components/container/Container";
import Footer from "../components/Footer/Footer";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile } from "../api/auth.Api";
import { setCredentials, logout } from "../features/auth/userAuthSlice";
import { startLoading, stopLoading } from "../features/loading/loadingSlice";
import Spinner from "../components/Spinner";

const RootLayout = () => {
  const dispatch = useDispatch();

  const { user, isAuthenticated } = useSelector((state) => state.userAuth);
  const loading = useSelector((state) => state.loading);

  useEffect(() => {
    const hydrateUser = async () => {
      dispatch(startLoading());
      try {
        const res = await fetchUserProfile();
        dispatch(setCredentials({ user: res.data.data }));
      } catch {
        dispatch(logout());
      } finally {
        dispatch(stopLoading());
      }
    };

    hydrateUser();
  }, [dispatch]);

  // Optional loading screen during hydration
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spinner />
      </div>
    );
  }

  return (
    <Container>
      <Header isAuthenticated={isAuthenticated} userData={user} />
      <main className="min-h-screen overflow-x-hidden">
        <Outlet />
      </main>
      <Footer />
    </Container>
  );
};

export default RootLayout;
