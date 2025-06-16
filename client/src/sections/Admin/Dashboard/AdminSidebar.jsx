import { NavLink } from "react-router-dom";
import images from "../../../constants/images";
const AdminSidebar = () => {
  return (
    <aside className="h-screen bg-bg text-gray-800 shadow-md p-4 flex flex-col gap-6 md:w-[250px]">
      {/* Logo */}
      <div className="flex items-center gap-5">
        <img src={images.logo} alt="Logo" className="w-10 h-10" />
        <h1 className="text-3xl font-semibold text-primary">Salon Admin</h1>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-4 text-base">
        <NavItem to="/admin" label="Dashboard" icon={images.houseIcon} />
        <NavItem
          to="/admin/appointments"
          label="Appointments"
          icon={images.calenderIcon}
        />
        <NavItem
          to="/admin/services"
          label="Services"
          icon={images.scissorIcon}
        />
        <NavItem to="/admin/reviews" label="Reviews" icon={images.starIcon} />
        <NavItem to="/admin/settings" label="Settings" icon={images.gearIcon} />
      </nav>
    </aside>
  );
};

const NavItem = ({ to, label, icon }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex items-center gap-3 px-3 py-2 rounded-md font-medium transition-colors ${
        isActive ? "bg-primary text-white" : "hover:bg-primary/20"
      }`
    }
  >
    <span className="text-lg">
      <img src={icon} className="h-5 w-5 fill-black" />
    </span>
    {label}
  </NavLink>
);

export default AdminSidebar;
