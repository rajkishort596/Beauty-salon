import React, { useRef } from "react";
import { Controller } from "react-hook-form";

const OtpInput = ({ control, errors, onVerify, otpVerified }) => {
  const otpLength = 4;
  const inputRefs = Array.from({ length: otpLength }, () => useRef());

  // Determine border and text color based on verification status
  let inputStatusClass = "border-gray-300";
  let textStatusClass = "text-gray-700";
  if (otpVerified === true) {
    inputStatusClass = "border-2 border-green-600";
    textStatusClass = "text-green-600";
  } else if (otpVerified === false || errors.otp) {
    inputStatusClass = "border-2 border-red-600";
    textStatusClass = "text-red-600";
  }

  return (
    <div>
      <label className={`block font-medium mb-1 ${textStatusClass}`}>OTP</label>
      <Controller
        control={control}
        name="otp"
        rules={{
          required: "OTP is required",
          minLength: {
            value: otpLength,
            message: `OTP must be ${otpLength} digits`,
          },
          maxLength: {
            value: otpLength,
            message: `OTP must be ${otpLength} digits`,
          },
          pattern: { value: /^\d+$/, message: "OTP must be numeric" },
        }}
        render={({ field: { onChange, value } }) => {
          const otpValue = (value || "").padEnd(otpLength, "");
          const handleOtpChange = (e, idx) => {
            let val = e.target.value.replace(/\D/g, "");
            if (val.length > 1) val = val.slice(-1);
            let otpArr = otpValue.split("");
            otpArr[idx] = val;
            const newOtp = otpArr.join("").slice(0, otpLength);
            onChange(newOtp.trim());
            if (val && idx < otpLength - 1) {
              inputRefs[idx + 1].current?.focus();
            }
          };
          const handleKeyDown = (e, idx) => {
            if (e.key === "Backspace" && !otpValue[idx] && idx > 0) {
              inputRefs[idx - 1].current?.focus();
            }
          };
          return (
            <div className="flex items-center gap-2">
              <div className="flex gap-2">
                {Array.from({ length: otpLength }).map((_, idx) => (
                  <input
                    key={idx}
                    ref={inputRefs[idx]}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    className={`w-10 h-10 text-center border rounded focus:outline-primary text-xl transition-colors ${inputStatusClass} ${textStatusClass}`}
                    value={otpValue[idx] || ""}
                    onChange={(e) => handleOtpChange(e, idx)}
                    onKeyDown={(e) => handleKeyDown(e, idx)}
                  />
                ))}
              </div>
              <button
                type="button"
                className={`ml-2 px-3 py-2 bg-primary text-white rounded hover:bg-primary-dark transition  ${
                  otpValue.length !== otpLength || !/^\d{4}$/.test(otpValue)
                    ? "opacity-50 cursor-not-allowed"
                    : "cursor-pointer"
                }`}
                onClick={() => onVerify(otpValue)}
                disabled={
                  otpValue.length !== otpLength || !/^\d{4}$/.test(otpValue)
                }
              >
                Verify
              </button>
            </div>
          );
        }}
      />
      {errors.otp && (
        <span className="text-red-500 text-xs">{errors.otp.message}</span>
      )}
    </div>
  );
};

export default OtpInput;
