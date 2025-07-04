import React, { useId } from "react";

const Input = ({
  label,
  placeholder = "",
  type,
  className = "",
  readonly = false,
  error,
  ...props
}) => {
  const id = useId();

  return (
    <div className="flex flex-col gap-1 w-full">
      {label && (
        <label htmlFor={id} className="font-abhaya text-black text-xl mb-1">
          {label}
        </label>
      )}

      <input
        type={type}
        id={id}
        placeholder={placeholder}
        autoComplete="off"
        readOnly={readonly}
        className={`px-4 py-2 rounded-md border bg-white text-gray-800 transition-all duration-300 outline-none
        ${
          error
            ? "border-red-500 focus:ring-red-300 text-red-600"
            : "border-gray-300 focus:ring-primary"
        }
        ${
          readonly
            ? "bg-gray-100 cursor-not-allowed"
            : "focus:ring-2 focus:border-transparent shadow-sm hover:shadow-md"
        }
        ${className}`}
        {...props}
      />

      {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default Input;
