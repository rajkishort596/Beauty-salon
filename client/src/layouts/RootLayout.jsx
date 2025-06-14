import React, { use } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";
import Container from "../components/container/Container";
import Footer from "../components/Footer/Footer";
import { useSelector } from "react-redux";

const RootLayout = () => {
  const userData = useSelector((state) => state.auth.user);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  console.log("User Data:", userData);
  return (
    <Container>
      <Header isAuthenticated={isAuthenticated} userData={userData} />
      <main className="min-h-screen overflow-x-hidden">
        <Outlet />
      </main>
      <Footer />
    </Container>
  );
};

export default RootLayout;
