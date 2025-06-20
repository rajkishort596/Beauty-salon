import React from "react";
import { logoutAdmin } from "../../api/auth.Api";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout as logoutAction } from "../../features/auth/adminAuthSlice.js";

const AdminHeader = ({ isAuthenticated = false, user, image }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    const res = await logoutAdmin();
    console.log(res);
    dispatch(logoutAction());
    navigate("/admin/login");
    console.log("Admin logged out");
  };

  return (
    <div className="relative group cursor-pointer w-[200px] px-8 flex  ml-auto items-center">
      <p className="mr-5 text-primary font-imperial font-semibold text-2xl">
        {isAuthenticated ? user?.fullName : "Admin"}
      </p>
      <img
        src={isAuthenticated ? user?.avatar : image}
        alt="Profile"
        className="h-10 w-10 rounded-full object-cover"
      />

      {/* Logout button */}
      <div className="absolute top-8 right-8 mt-2 hidden group-hover:block  bg-white font-semibold text-sm shadow-md p-2 px-4 rounded-md z-10">
        <button
          onClick={() => {
            handleLogout();
          }}
          className="text-sm cursor-pointer text-primary hover:underline"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default AdminHeader;
