import { NavLink, useNavigate } from "react-router-dom";
import images from "../../../constants/images";
import { useDispatch } from "react-redux";
import { logoutAdmin } from "../../../api/auth.Api";
import { logout } from "../../../features/auth/adminAuthSlice";
import Spinner from "../../../components/Spinner";
import { useState } from "react";

const AdminSidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    const res = await logoutAdmin();
    console.log(res);
    dispatch(logout);
    setLoading(false);
    navigate("/admin/login");
    console.log("Admin logged out");
  };

  return (
    <aside className="h-screen bg-bg text-gray-800 shadow-md p-4 flex flex-col gap-6 md:w-[250px]">
      {/* Logo */}
      <div className="flex items-center gap-5">
        <img src={images.logo} alt="Logo" className="w-10 h-10" />
        <h1 className="text-3xl font-semibold text-primary">Salon Admin</h1>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-4 text-base">
        <NavItem
          to="/admin"
          label="Dashboard"
          icon={{ active: images.houseIcon, inactive: images.blackHouseIcon }}
        />
        <NavItem
          to="/admin/appointments"
          label="Appointments"
          icon={{
            active: images.calenderIcon,
            inactive: images.blackCalenderIcon,
          }}
        />
        <NavItem
          to="/admin/services"
          label="Services"
          icon={{
            active: images.scissorIcon,
            inactive: images.blackScissorIcon,
          }}
        />
        <NavItem
          to="/admin/specialists"
          label="Specialists"
          icon={{
            active: images.staffIcon,
            inactive: images.blackStaffIcon,
          }}
        />
        <NavItem
          to="/admin/reviews"
          label="Reviews"
          icon={{ active: images.starIcon, inactive: images.blackStarIcon }}
        />
        <NavItem
          to="/admin/discounts"
          label="Discounts"
          icon={{
            active: images.percentIcon,
            inactive: images.blackPercentIcon,
          }}
        />
        <NavItem
          to="/admin/settings"
          label="Settings"
          icon={{ active: images.gearIcon, inactive: images.blackGearIcon }}
        />
      </nav>
      <button
        onClick={() => {
          handleLogout();
        }}
        className="mt-auto mb-10 text-left flex gap-3 px-3 py-2 rounded-md font-medium transition-colors items-center cursor-pointer hover:bg-primary/20"
      >
        <img src={images.logoutIcon} className="h-5 w-5" alt={`icon`} />
        logout
        {loading ? (
          <span className="ml-auto">
            <Spinner />
          </span>
        ) : (
          ""
        )}
      </button>
    </aside>
  );
};

const NavItem = ({ to, label, icon }) => (
  <NavLink
    to={to}
    end
    className={({ isActive }) =>
      `flex items-center gap-3 px-3 py-2 rounded-md font-medium transition-colors ${
        isActive ? "bg-primary text-white" : "hover:bg-primary/20"
      }`
    }
  >
    {({ isActive }) => (
      <>
        <img
          src={isActive ? icon.active : icon.inactive}
          className="h-5 w-5"
          alt={`${label} icon`}
        />
        <span>{label}</span>
      </>
    )}
  </NavLink>
);

export default AdminSidebar;
