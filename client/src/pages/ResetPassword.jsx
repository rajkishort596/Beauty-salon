import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { resetPassword } from "../api/auth.Api";
import Input from "../components/Form/Input/Input";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await resetPassword({ token, password: data.password });
      toast.success("Password reset successful! Please login.");
      navigate("/login");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Reset failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 max-w-md mx-auto px-5 py-10 md:p-10"
    >
      <h2 className="text-2xl font-bold mb-4">Reset Password</h2>
      <Input
        label="Password"
        type="password"
        placeholder="New Password"
        {...register("password", { required: "Password is required" })}
        error={errors.password?.message}
      />
      <Input
        label="Confirm Password"
        type="password"
        placeholder="Confirm Password"
        {...register("confirmPassword", {
          required: "Please confirm your password",
          validate: (value, formValues) =>
            value === formValues.password || "Passwords do not match",
        })}
        error={errors.confirmPassword?.message}
      />
      <button
        type="submit"
        className="btn btn-primary w-full"
        disabled={loading}
      >
        {loading ? "Resetting..." : "Reset Password"}
      </button>
    </form>
  );
};

export default ResetPassword;
