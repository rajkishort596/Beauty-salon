import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import images from "../../constants/images";

const Header = ({ isAuthenticated = false }) => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/service" },
    { name: "About Us", path: "/about" },
    { name: "Contact Us", path: "/contact" },
  ];

  return (
    <header className="overflow-x-hidden">
      <nav className="max-w-7xl mx-auto flex items-center justify-between py-6 px-5 md:px-18 md:py-8 ">
        {/* LOGO */}
        <div className="flex items-center cursor-pointer gap-4">
          <Link to="/">
            <img src={images.logo} alt="Logo" className="h-10 w-auto" />
          </Link>
        </div>

        {/* DESKTOP NAV LINKS */}
        <ul className="hidden md:flex gap-8">
          {navLinks.map((link) => (
            <li key={link.name}>
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  isActive
                    ? "font-semibold font-inter text-primary"
                    : "text-black font-inter text-[16px] transition"
                }
              >
                {link.name}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* RIGHT SIDE ICONS */}
        <div className="hidden md:flex items-center gap-4">
          {isAuthenticated ? (
            <div className="relative group cursor-pointer flex items-center">
              <img
                src={images.customer1}
                alt="Profile"
                className="h-8 w-8 rounded-full object-cover"
              />
              <img src={images.downIcon} alt="Down" className="h-4 w-4" />

              {/* Logout button */}
              <div className="absolute top-6 right-0 mt-2 hidden group-hover:block bg-white shadow-md rounded-md p-2 z-10">
                <button className="text-sm cursor-pointer text-primary hover:underline">
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <div className="flex gap-8">
              <Link
                to="/signup"
                className="text-black font-inter text-[16px] hover:font-semibold hover:text-primary hover:translate-y-0.5 transition duration-200"
              >
                Signup
              </Link>
              <Link
                to="/login"
                className="text-black font-inter text-[16px] hover:font-semibold hover:text-primary hover:translate-y-0.5 transition duration-200"
              >
                Login
              </Link>
            </div>
          )}
        </div>

        {/* MOBILE ICONS */}
        <div className="flex md:hidden items-center z-50 gap-4">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? (
              <img className="w-8 h-auto" src={images.closeIcon}></img>
            ) : (
              <img className="w-8 h-auto" src={images.hambergur}></img>
            )}
          </button>
        </div>
      </nav>
      {/* MOBILE MENU */}
      {isOpen && (
        <div
          className={`md:hidden px-4 py-8 w-3/4 bg-bg flex flex-col justify-between h-[100vh] absolute top-0 right-0 
                      transition-transform duration-300 ease-in-out z-40
                   `}
        >
          <ul className="flex flex-col items-center gap-8 mt-20">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  to={link.path}
                  className="block text-lg text-primary font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex flex-col items-center mb-20 gap-4 mt-auto">
            {isAuthenticated ? (
              <Link to="/logout" className="text-primary font-semibold">
                Logout
              </Link>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-primary font-semibold"
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="text-primary font-semibold"
                  onClick={() => setIsOpen(false)}
                >
                  Signup
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
