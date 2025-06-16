import { Route } from "react-router-dom";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home";
import About from "../pages/About/About";
import Contact from "../pages/Contact/Contact";
import Service from "../pages/Service/Service";
import Login from "../pages/Login/Login";
import Signup from "../pages/Signup/Signup";

const PublicRoutes = (
  <Route path="/" element={<RootLayout />}>
    <Route index element={<Home />} />
    <Route path="about" element={<About />} />
    <Route path="contact" element={<Contact />} />
    <Route path="service" element={<Service />} />
    <Route path="login" element={<Login />} />
    <Route path="signup" element={<Signup />} />
  </Route>
);

export default PublicRoutes;
