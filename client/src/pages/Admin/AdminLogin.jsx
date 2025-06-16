import React from "react";
import images from "../../constants/images";
import Input from "../../components/Form/Input/Input";
import Spinner from "../../components/Spinner";
import { loginAdmin } from "../../api/auth.Api.js";
import { setCredentials } from "../../features/auth/authSlice.js";
import { toast } from "react-toastify";
import {
  startLoading,
  stopLoading,
} from "../../features/loading/loadingSlice.js";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.loading);
  const navigate = useNavigate();
  {
    /* Initialize form handling with react-hook-form */
  }
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  {
    /* Login Form Handler*/
  }
  const onSubmit = async (data) => {
    console.log("Login data:", data);
    dispatch(startLoading());
    try {
      const res = await loginAdmin(data);
      dispatch(setCredentials({ user: res.data.data.user }));
      toast.success(`Welcome back ${res.data.data.user.fullName || "user"}`);
      reset();
      navigate("/admin");
    } catch (err) {
      const errorMsg =
        err?.response?.data?.message || "Login failed. Please try again.";
      toast.error(errorMsg);
    } finally {
      dispatch(stopLoading());
    }
  };

  return (
    <section className="min-h-screen relative flex items-center justify-center bg-bg px-4">
      <div className="absolute bottom-0 -left-[217px] z-0">
        <img
          src={images.lotusBg}
          className="w-full h-full object-cover opacity-5"
        />
      </div>
      <div className="absolute top-0 -right-[217px] rotate-180 z-0">
        <img
          src={images.lotusBg}
          className="w-full h-full object-cover opacity-5"
        />
      </div>

      <div className="w-full max-w-4xl bg-white shadow-xl flex flex-col md:flex-row rounded-xl overflow-hidden">
        <div className="md:w-1/2 h-96 md:h-auto relative z-10">
          <img
            src={images.makeupImg}
            alt="Beauty Spa"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="md:w-1/2 relative z-10 p-8 flex flex-col justify-center">
          <div className="flex justify-center items-center p-4">
            <img
              src={images.logo}
              alt="Logo"
              className="opacity-25 h-12 w-12"
            />
          </div>
          <h2 className="text-3xl text-center md:text-4xl font-abhaya font-semibold text-primary mb-2">
            Welcome Admin
          </h2>
          <p className="text-gray-600 text-center mb-6">
            Log in to continue your journey
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
              type="email"
              label="Email"
              placeholder="you@example.com"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Enter a valid email",
                },
              })}
              error={errors.email?.message}
            />
            <Input
              type="password"
              label="Password"
              placeholder="Enter Password"
              {...register("password", { required: "Password is required" })}
              error={errors.password?.message}
            />
            {loading ? (
              <Spinner />
            ) : (
              <button
                type="submit"
                className="w-full btn-primary text-2xl rounded-md hover:shadow-md transition"
              >
                Login
              </button>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default AdminLogin;
