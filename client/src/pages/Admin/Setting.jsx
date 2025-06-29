import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Input from "../../components/Form/Input/Input";
import { FiUser, FiPercent, FiLock } from "react-icons/fi";
import { useForm } from "react-hook-form";
import { changePassword, updateAdminProfile } from "../../api/auth.Api";
import ProfileUploader from "../../components/ProfileUploader";
import Spinner from "../../components/Spinner";

const tabs = [
  { key: "account", label: "Account Setting", icon: <FiUser /> },
  { key: "password", label: "Change Password", icon: <FiLock /> },
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
      secondaryPhone: admin?.secondaryPhone || "",
      address: admin?.address || "",
      latitude: admin?.location.lat || "",
      longitude: admin?.location.lng || "",
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
    adminData.append("secondaryPhone", data.secondaryPhone);
    adminData.append("address", data.address);
    adminData.append("latitude", data.latitude);
    adminData.append("longitude", data.longitude);
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
    setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "account":
        return (
          <div className="w-full items-center lg:items-start flex flex-col gap-4">
            {/* Profile Update Form */}
            <form
              className="w-full"
              onSubmit={handleProfileSubmit(onProfileUpdate)}
              autoComplete="off"
            >
              {/* <h2 className="text-2xl text-center font-semibold text-gray-800 mb-4">
                👤 Account Info
              </h2> */}
              <div className="">
                {/* Profile Fields (Left) */}
                <div className="grid grid-cols-2 gap-5">
                  <div className="flex flex-col items-center gap-2 mb-2 col-span-2">
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
                  <Input
                    label="Secondary Phone"
                    name="secondaryPhone"
                    placeholder="Optional"
                    {...registerProfile("secondaryPhone", {
                      pattern: {
                        value: /^\d{10}$/,
                        message: "Enter a valid 10-digit phone number",
                      },
                    })}
                    error={profileErrors.secondaryPhone?.message}
                  />
                  <div className="col-span-2">
                    <Input
                      label="Address"
                      name="address"
                      {...registerProfile("address", {
                        required: "Address is required",
                      })}
                      error={profileErrors.address?.message}
                    />
                  </div>

                  <div className="col-span-2 grid grid-cols-2 gap-x-5 gap-y-0.5">
                    <p className="col-span-2 font-abhaya text-black text-xl">
                      Location
                    </p>
                    <Input
                      placeholder="Latitude"
                      name="latitude"
                      {...registerProfile("latitude", {
                        required: "Latitude is required",
                      })}
                      error={profileErrors.latitude?.message}
                    />
                    <Input
                      placeholder="Longitude"
                      name="longitude"
                      {...registerProfile("longitude", {
                        required: "Longitude is required",
                      })}
                      error={profileErrors.longitude?.message}
                    />
                  </div>
                  {loading ? (
                    <div className="col-span-2">
                      <Spinner />
                    </div>
                  ) : (
                    <button
                      type="submit"
                      className="px-4 py-2 col-span-2 bg-primary text-white rounded shadow cursor-pointer mt-2"
                    >
                      Save Changes
                    </button>
                  )}
                </div>
              </div>
            </form>
          </div>
        );

      case "password":
        return (
          <div className="space-y-4">
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
              {loading ? (
                <Spinner />
              ) : (
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary text-white rounded shadow cursor-pointer mt-2"
                >
                  Update Password
                </button>
              )}
            </form>
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
        <div className=" bg-white/60 backdrop-blur-lg rounded-xl shadow-lg p-4 space-y-2">
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
      <div className="flex-1 bg-white/60 backdrop-blur-lg rounded-xl shadow-lg p-10 space-y-2">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default Setting;
