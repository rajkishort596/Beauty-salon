import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Input from "../../components/Form/Input/Input";
import { FiUser, FiBell, FiSettings } from "react-icons/fi";
import { useForm } from "react-hook-form";
import { changePassword, updateAdminProfile } from "../../api/auth.Api";
import ProfileUploader from "../../components/ProfileUploader";
import Spinner from "../../components/Spinner";

const tabs = [
  { key: "account", label: "Account Setting", icon: <FiUser /> },
  { key: "notification", label: "Notification", icon: <FiBell /> },
  { key: "theme", label: "Theme Setting", icon: <FiSettings /> },
];

const Setting = () => {
  const admin = useSelector((state) => state.adminAuth.admin);
  const [activeTab, setActiveTab] = useState("account");
  const [loading, setLoading] = useState(false);

  // Profile form
  const {
    register: registerProfile,
    handleSubmit: handleProfileSubmit,
    reset: resetProfile,
    control: controlProfile,
    formState: { errors: profileErrors },
  } = useForm({
    defaultValues: {
      fullName: admin?.fullName || "",
      email: admin?.email || "",
      phone: admin?.phone || "",
    },
  });

  // Password form
  const {
    register: registerPassword,
    handleSubmit: handlePasswordSubmit,
    reset: resetPassword,
    formState: { errors: passwordErrors },
  } = useForm({
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  useEffect(() => {
    resetProfile({
      fullName: admin?.fullName || "",
      email: admin?.email || "",
      phone: admin?.phone || "",
    });
    resetPassword({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  }, [admin, resetProfile, resetPassword]);

  const onProfileUpdate = async (data) => {
    setLoading(true);
    const adminData = new FormData();
    if (data.avatar && data.avatar[0]) {
      adminData.append("avatar", data.avatar[0]);
    }
    adminData.append("fullName", data.fullName);
    adminData.append("email", data.email);
    adminData.append("phone", data.phone);
    // console.log(data);
    // console.log(adminData);
    try {
      await updateAdminProfile(adminData);
      toast.success("Profile updated!");
    } catch (error) {
      const errMsg = error.response?.data?.message || "An error occurred";
      toast.error(errMsg);
      console.error(errMsg);
    } finally {
      setLoading(false);
    }
  };

  const onPasswordChange = async (data) => {
    if (data.newPassword !== data.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    try {
      await changePassword({
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      });
      toast.success("Password changed!");
      resetPassword({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      const errMsg =
        error.response?.data?.message || "Failed to change password";
      toast.error(errMsg);
      console.error(errMsg);
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "account":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-end">
            {/* Profile Update Form */}
            <form
              className="flex flex-col gap-4 w-full"
              onSubmit={handleProfileSubmit(onProfileUpdate)}
              autoComplete="off"
            >
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                👤 Account Info
              </h2>
              <div className="">
                {/* Profile Fields (Left) */}
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col items-center gap-2 mb-2">
                    <ProfileUploader
                      register={registerProfile}
                      errors={profileErrors}
                      control={controlProfile}
                      admin={admin}
                    />
                  </div>
                  <Input
                    label="Full Name"
                    name="fullName"
                    {...registerProfile("fullName", {
                      required: "Name is required",
                      minLength: { value: 3, message: "Name is too short" },
                    })}
                    error={profileErrors.fullName?.message}
                  />
                  <Input
                    label="Email"
                    name="email"
                    readonly="readonly"
                    {...registerProfile("email")}
                    error={profileErrors.email?.message}
                  />
                  <Input
                    label="Phone"
                    name="phone"
                    {...registerProfile("phone", {
                      required: "Phone number is required",
                      pattern: {
                        value: /^\d{10}$/,
                        message: "Enter a valid 10-digit phone number",
                      },
                    })}
                    error={profileErrors.phone?.message}
                  />
                  {loading ? (
                    <Spinner />
                  ) : (
                    <button
                      type="submit"
                      className="px-4 py-2 bg-primary text-white rounded shadow cursor-pointer mt-2"
                    >
                      Save Changes
                    </button>
                  )}
                </div>
              </div>
            </form>

            {/* Password Update Form */}
            <form
              className="flex flex-col gap-4 w-full"
              onSubmit={handlePasswordSubmit(onPasswordChange)}
              autoComplete="off"
            >
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                🔐 Change Password
              </h2>
              <Input
                label="Current Password"
                name="currentPassword"
                type="password"
                {...registerPassword("currentPassword", {
                  required: "Current Password is required",
                })}
                error={passwordErrors.currentPassword?.message}
              />
              <Input
                label="New Password"
                name="newPassword"
                type="password"
                {...registerPassword("newPassword", {
                  required: "New Password is required",
                })}
                error={passwordErrors.newPassword?.message}
              />
              <Input
                label="Confirm New Password"
                name="confirmPassword"
                type="password"
                {...registerPassword("confirmPassword", {
                  required: "Confirm Password is required",
                })}
                error={passwordErrors.confirmPassword?.message}
              />
              <button
                type="submit"
                className="px-4 py-2 bg-primary text-white rounded shadow cursor-pointer mt-2"
              >
                Update Password
              </button>
            </form>
          </div>
        );

      case "notification":
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-800">
              Notification Settings
            </h2>
            <p className="text-gray-600">
              Enable or disable email or push notifications.
            </p>
            {/* Add toggles/switches here */}
          </div>
        );

      case "theme":
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-800">
              Theme Preferences
            </h2>
            <p className="text-gray-600">
              Choose light or dark mode and accent color.
            </p>
            {/* Add theme selector here */}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="p-6 flex flex-col md:flex-row relative z-5 gap-6 min-h-[85vh]">
      {/* Sidebar */}
      <div className="w-full md:w-1/4">
        <div className="bg-white rounded-xl shadow-md p-4 space-y-2">
          {tabs.map((tab) => (
            <div
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-2 cursor-pointer p-3 rounded-lg font-medium transition ${
                activeTab === tab.key
                  ? "bg-primary text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {tab.icon}
              {tab.label}
            </div>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 bg-white/90 rounded-xl shadow-md p-6">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default Setting;
