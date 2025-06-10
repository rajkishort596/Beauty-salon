import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";
import Container from "../components/container/Container";
import Footer from "../components/Footer/Footer";

const RootLayout = () => {
  return (
    <Container>
      <Header />
      <main className="min-h-screen">
        <Outlet />
      </main>
      <Footer />
    </Container>
  );
};

export default RootLayout;
