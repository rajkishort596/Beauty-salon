import React from "react";

const Modal = ({ children, onClose }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center  backdrop-blur-sm">
    <div className="bg-white/60 backdrop-blur-2xl shadow-2xl rounded-xl p-10 min-w-[320px] w-11/12 sm:w-2/3 md:w-1/2 relative border border-white/20">
      <button
        className="absolute top-2 right-4 text-3xl font-bold cursor-pointer text-gray-300 hover:text-black transition"
        onClick={onClose}
        aria-label="Close"
      >
        ×
      </button>
      {children}
    </div>
  </div>
);

export default Modal;
