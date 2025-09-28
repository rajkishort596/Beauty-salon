import React, { useEffect } from "react";
import { Outlet, ScrollRestoration, useNavigate } from "react-router-dom";
import Header from "../components/Header/Header";
import Container from "../components/Container/Container";
import Footer from "../components/Footer/Footer";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile } from "../api/auth.Api";
import {
  setCredentials,
  logout,
  setAuthStatus,
} from "../features/auth/userAuthSlice";
import Spinner from "../components/Spinner";
import AnnouncementBanner from "../components/AnnouncementBanner";
import { fetchAllDiscounts } from "../api/discount.Api";
import { setDiscount } from "../features/serviceDiscountSlice";
import { toast } from "react-toastify";

const RootLayout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isAuthenticated, status } = useSelector(
    (state) => state.userAuth
  );

  useEffect(() => {
    const loadDiscount = async () => {
      try {
        const discounts = await fetchAllDiscounts();
        console.log(discounts);
        dispatch(setDiscount({ discounts: discounts.data.data }));
      } catch (error) {
        const msg = error.response?.data.message;
        toast.error(msg);
        console.error("Failed to Fetch Disounts", msg);
      }
    };
    loadDiscount();
  }, []);

  useEffect(() => {
    const hydrateUser = async () => {
      dispatch(setAuthStatus("loading"));
      try {
        const res = await fetchUserProfile();
        dispatch(setCredentials({ user: res.data.data }));
        dispatch(setAuthStatus("succeeded"));
      } catch (err) {
        dispatch(logout());
        console.log(err);
        dispatch(setAuthStatus("failed"));
      } finally {
        localStorage.setItem("hasVisitedBefore", "true");
      }
    };

    if (status === "idle") {
      hydrateUser();
    }
  }, [dispatch, navigate, status]);

  // Loading screen
  if (status === "loading" || status === "idle") {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spinner />
      </div>
    );
  }

  return (
    <Container>
      <AnnouncementBanner />
      <Header isAuthenticated={isAuthenticated} userData={user} />
      <main className="min-h-screen overflow-x-hidden">
        <Outlet />
      </main>
      <Footer />
      <ScrollRestoration />
    </Container>
  );
};

export default RootLayout;
