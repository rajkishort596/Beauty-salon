import React from "react";
import images from "../../constants/images";
import Input from "../../components/Form/Input/Input";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import ProfileUploader from "../../components/ProfileUploader";
import { signup } from "../../api/auth.Api.js";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../../components/Spinner";
import { startLoading, stopLoading } from "../../features/loading/loadingSlice";
import { toast } from "react-toastify";
const Signup = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.loading);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    dispatch(startLoading());

    const formData = new FormData();
    console.log(data.avatar?.[0]);
    formData.append("avatar", data.avatar?.[0]);

    formData.append("fullName", data.fullName);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("phone", data.phone);

    try {
      const res = await signup(formData);
      toast.success("Registration successful");
      reset();
      navigate("/login");
    } catch (err) {
      const errorMsg =
        err?.response?.data?.message ||
        "Registration failed. Please try again.";
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

      <div className="w-full max-w-4xl bg-white shadow-xl flex flex-col md:flex-row rounded-xl overflow-hidden z-20">
        <div className="md:w-1/2 h-64 md:h-auto">
          <img
            src={images.styleImg}
            alt="Beauty Signup"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="md:w-1/2 p-8 flex flex-col justify-center">
          <h2 className="text-3xl text-center md:text-4xl font-abhaya font-semibold text-primary mb-2">
            Create Your Account
          </h2>
          <p className="text-gray-600 text-center mb-6">
            Join us for exclusive beauty offers and tips
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <ProfileUploader
              register={register}
              errors={errors}
              control={control}
            />
            <Input
              type="text"
              label="Full Name"
              placeholder="Your Name"
              {...register("fullName", {
                required: "Name is required",
                minLength: { value: 3, message: "Name is too short" },
              })}
              error={errors.name?.message}
            />
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
              placeholder="Create Password"
              {...register("password", {
                required: "Password is required",
                minLength: { value: 6, message: "Minimum 6 characters" },
              })}
              error={errors.password?.message}
            />
            <Input
              type="number"
              label="Phone Number"
              placeholder="Eenter Phone Number"
              {...register("phone", {
                required: "Phone number is required",
                pattern: {
                  value: /^\d{10}$/,
                  message: "Enter a valid 10-digit phone number",
                },
              })}
              error={errors.phone?.message}
            />
            {loading ? (
              <Spinner />
            ) : (
              <button
                type="submit"
                className="w-full btn-primary text-2xl rounded-md hover:shadow-md transition"
              >
                Sign Up
              </button>
            )}
          </form>

          <p className="text-sm text-center text-gray-600 mt-4">
            Already have an account?{" "}
            <Link to="/login" className="text-primary font-medium">
              Log In
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Signup;
