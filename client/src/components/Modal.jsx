import React from "react";

const Modal = ({ children, onClose }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
    <div className="bg-[#f3efea] shadow-lg rounded-md p-10 min-w-[320px] w-1/2 relative">
      <button
        className="absolute top-2 right-2 text-3xl font-bold cursor-pointer text-gray-500 hover:text-black"
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
