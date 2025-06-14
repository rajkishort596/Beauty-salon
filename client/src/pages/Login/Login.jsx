import React from "react";
import images from "../../constants/images";
import Input from "../../components/Form/Input/Input";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../api/auth";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../features/auth/authSlice";

const Login = () => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const res = await login(data);
      dispatch(setCredentials({ user: res.data.data.user }));
      // toast.success("Login successful!");
      navigate("/");
    } catch (err) {
      const message =
        err.response?.data?.message ||
        "Something went wrong. Please try again.";

      // toast.error(message);
      console.error("Login error:", message);
    }

    reset();
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
          <h2 className="text-3xl text-center md:text-4xl font-abhaya text-primary mb-2">
            Welcome Back
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
            <button
              type="submit"
              className="w-full btn-primary text-2xl rounded-md hover:shadow-md transition"
            >
              Login
            </button>
          </form>

          <p className="text-sm text-center text-gray-600 mt-4">
            Don't have an account?{" "}
            <Link to="/signup" className="text-primary font-medium">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login;
