import React from "react";
import images from "../../constants/images";
import Input from "../../components/Form/Input/Input";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const Signup = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Form Data:", data);
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

      <div className="w-full max-w-4xl bg-white shadow-xl flex flex-col md:flex-row rounded-xl overflow-hidden z-20">
        <div className="md:w-1/2 h-64 md:h-auto">
          <img
            src={images.styleImg}
            alt="Beauty Signup"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="md:w-1/2 p-8 flex flex-col justify-center">
          <div className="flex justify-center items-center p-4">
            <img
              src={images.logo}
              alt="Logo"
              className="opacity-25 h-12 w-12"
            />
          </div>

          <h2 className="text-3xl text-center md:text-4xl font-abhaya text-primary mb-2">
            Create Your Account
          </h2>
          <p className="text-gray-600 text-center mb-6">
            Join us for exclusive beauty offers and tips
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
              type="text"
              label="Full Name"
              placeholder="Your Name"
              {...register("name", {
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
              type="password"
              label="Confirm Password"
              placeholder="Re-enter Password"
              {...register("confirmPassword", {
                required: "Please confirm your password",
              })}
              error={errors.confirmPassword?.message}
            />

            <button
              type="submit"
              className="w-full btn-primary text-2xl rounded-md hover:shadow-md transition"
            >
              Sign Up
            </button>
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
