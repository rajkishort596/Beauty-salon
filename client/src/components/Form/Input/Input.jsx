import React, { useId } from "react";

const Input = ({
  label,
  placeholder = "",
  type,
  className = "",
  error,
  ...props
}) => {
  const id = useId();

  return (
    <div className="flex flex-col gap-1 w-full">
      {label && (
        <label htmlFor={id} className="font-abhaya text-black text-2xl">
          {label}
        </label>
      )}
      <input
        type={type}
        id={id}
        placeholder={placeholder}
        autoComplete="off"
        className={`p-2 border rounded-md outline-none ${
          error ? "border-red-500 focus:border-red-500 text-red-500" : ""
        } focus:ring-1 border-2 ${
          error ? "focus:ring-red-300" : "focus:ring-primary"
        } ${className}`}
        {...props}
      />
      {error && <p className="text-red-600 text-sm">{error}</p>}
    </div>
  );
};

export default Input;
