import {
  createBrowserRouter,
  createRoutesFromChildren,
  Route,
  RouterProvider,
} from "react-router-dom";
import Service from "./pages/Service/Service";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";
import RootLayout from "./layouts/RootLayout";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
function App() {
  const router = createBrowserRouter(
    createRoutesFromChildren(
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path="service" element={<Service />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
      </Route>
    )
  );
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
