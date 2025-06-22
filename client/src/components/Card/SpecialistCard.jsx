import React from "react";
import images from "../../constants/images";

const SpecialistCard = ({ name, role, image }) => {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="w-48 h-60 rounded overflow-hidden bg-gray-100 transition-transform duration-300 ease-in-out hover:scale-105">
        <img src={image} alt={name} className="w-full h-full object-cover " />
      </div>
      <h3 className="mt-3 text-xl font-semibold">{name}</h3>
      <p className="text-sm text-gray-600">{role}</p>
      <div className="flex gap-3 mt-2">
        <img
          src={images.fbIcon}
          alt="facebook"
          className="w-5 cursor-pointer"
        />
        <img
          src={images.instaIcon}
          alt="instagram"
          className="w-5 cursor-pointer"
        />
        <img
          src={images.instaIcon}
          alt="twitter"
          className="w-5 cursor-pointer"
        />
      </div>
    </div>
  );
};

export default SpecialistCard;
