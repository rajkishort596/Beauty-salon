import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { startLoading, stopLoading } from "../features/loading/loadingSlice";
import images from "../constants/images";
import Input from "../components/Form/Input/Input";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { forgotPassword } from "../api/auth.Api";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.loading);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    dispatch(startLoading());
    try {
      const res = await forgotPassword(data.email);
      toast.success("Password reset link sent! Please check your email.");
      reset();
    } catch (err) {
      const errorMsg =
        err?.response?.data?.message ||
        "Failed to send reset link. Please try again.";
      toast.error(errorMsg);
    } finally {
      dispatch(stopLoading());
    }
  };

  return (
    <section className="min-h-screen relative z-5 flex items-center justify-center bg-bg px-4">
      <div className="absolute bottom-0 -left-[217px] z-0">
        <img
          src={images.lotusBg}
          className="w-full h-full object-cover opacity-5"
          alt=""
        />
      </div>
      <div className="absolute top-0 -right-[217px] rotate-180 z-0">
        <img
          src={images.lotusBg}
          className="w-full h-full object-cover opacity-5"
          alt=""
        />
      </div>

      <div className="w-full max-w-2xl bg-white shadow-xl flex flex-col rounded-xl overflow-hidden">
        <div className="relative z-10 p-8 flex flex-col justify-center">
          <div className="flex justify-center items-center p-4">
            <img
              src={images.logo}
              alt="Logo"
              className="opacity-25 h-12 w-12"
            />
          </div>
          <h2 className="text-3xl text-center font-abhaya font-semibold text-primary mb-2">
            Forgot Password
          </h2>
          <p className="text-gray-600 text-center mb-6">
            Enter your email address and we'll send you a link to reset your
            password.
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
            {loading ? (
              <Spinner />
            ) : (
              <button
                type="submit"
                className="w-full btn-primary text-2xl rounded-md hover:shadow-md transition"
              >
                Send Reset Link
              </button>
            )}
          </form>

          <p className="text-sm text-center text-gray-600 mt-4">
            Remember your password?{" "}
            <Link to="/login" className="text-primary font-medium">
              Login
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default ForgotPassword;
